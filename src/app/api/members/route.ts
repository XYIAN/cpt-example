import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const MemberInput = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional().nullable(),
  homePhone: z.string().optional().nullable(),
  mobilePhone: z.string().optional().nullable(),
  address1: z.string().optional().nullable(),
  address2: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  zip4: z.string().optional().nullable(),
  productName: z.string().optional().nullable(),
  datePurchased: z.string().optional().nullable(),
  paidAmount: z.number().optional().nullable(),
  coveredWeeks: z.number().optional().nullable(),
  lastStateWorked: z.string().optional().nullable()
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');
    const mobilePhone = searchParams.get('mobilePhone');

    // If no search parameters are provided, return all members
    if (!lastName && !email && !mobilePhone) {
      const members = await prisma.member.findMany({
        orderBy: {
          lastName: 'asc',
        },
      });
      return NextResponse.json(members);
    }

    // Build search conditions
    const searchConditions = [];
    
    if (lastName) {
      searchConditions.push({
        lastName: {
          contains: lastName,
        },
      });
    }
    
    if (email) {
      searchConditions.push({
        email: {
          contains: email,
        },
      });
    }
    
    if (mobilePhone) {
      searchConditions.push({
        mobilePhone: {
          contains: mobilePhone,
        },
      });
    }

    const members = await prisma.member.findMany({
      where: {
        OR: searchConditions,
      },
      orderBy: {
        lastName: 'asc',
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = MemberInput.parse(body);

    const member = await prisma.member.create({
      data: {
        ...validatedData,
        datePurchased: validatedData.datePurchased ? new Date(validatedData.datePurchased) : null,
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { error: 'Failed to create member' },
      { status: 500 }
    );
  }
} 