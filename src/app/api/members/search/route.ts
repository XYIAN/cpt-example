import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');
    const mobilePhone = searchParams.get('mobilePhone');

    const conditions: Prisma.MemberWhereInput[] = [];

    if (lastName) {
      conditions.push({ lastName: { contains: lastName } });
    }
    
    if (email) {
      conditions.push({ email: { contains: email } });
    }
    
    if (mobilePhone) {
      conditions.push({ mobilePhone: { contains: mobilePhone } });
    }

    const members = await prisma.member.findMany({
      where: conditions.length > 0 ? { OR: conditions } : {},
      orderBy: {
        lastName: 'asc'
      }
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error('Error searching members:', error);
    return NextResponse.json(
      { error: 'Failed to search members' },
      { status: 500 }
    );
  }
} 