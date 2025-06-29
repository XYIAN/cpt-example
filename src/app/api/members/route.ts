import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

// Schema for creating new members (without version control fields)
const MemberInput = z.object({
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
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

export async function GET() {
  try {
    console.log('Fetching all members...');
    const members = await prisma.member.findMany({
      orderBy: {
        lastName: 'asc',
      },
    });
    console.log(`Successfully fetched ${members.length} members`);
    
    if (!members || members.length === 0) {
      console.log('No members found in database');
      return NextResponse.json([]);
    }
    
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error instanceof Error && 'code' in error) {
        console.error('Error code:', (error as { code: string }).code);
      }
    }
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
        version: 1,
        isLocked: false,
        lastModifiedBy: null
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