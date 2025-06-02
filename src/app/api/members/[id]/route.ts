import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';
import type { Member } from '@prisma/client';

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
  lastStateWorked: z.string().optional().nullable(),
  version: z.number(), // Required for version control
  isLocked: z.boolean().optional(), // Optional as it's managed by the server
  lastModifiedBy: z.string().optional().nullable() // Optional user tracking
});

export async function PUT(request: Request) {
  try {
    const id = parseInt(request.url.split('/').pop() || '');
    const body = await request.json();
    console.log('Received data:', body);
    const validatedData = MemberInput.parse(body);

    // First, check if the record is locked
    const currentMember = await prisma.member.findUnique({
      where: { id }
    });

    if (!currentMember) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    console.log('Current member from DB:', currentMember);
    console.log('Validated data:', validatedData);

    if (currentMember.isLocked) {
      return NextResponse.json(
        { error: 'Record is locked for editing' },
        { status: 409 }
      );
    }

    // Check version for optimistic locking
    if (currentMember.version !== validatedData.version) {
      console.log('Version mismatch:', { 
        current: currentMember.version, 
        received: validatedData.version 
      });
      return NextResponse.json(
        { 
          error: 'Version conflict', 
          currentVersion: currentMember.version 
        },
        { status: 409 }
      );
    }

    // Prepare update data
    const updateData: Partial<Member> = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      homePhone: validatedData.homePhone,
      mobilePhone: validatedData.mobilePhone,
      address1: validatedData.address1,
      address2: validatedData.address2,
      city: validatedData.city,
      state: validatedData.state,
      zip: validatedData.zip,
      zip4: validatedData.zip4,
      productName: validatedData.productName,
      datePurchased: validatedData.datePurchased ? new Date(validatedData.datePurchased) : null,
      paidAmount: validatedData.paidAmount,
      coveredWeeks: validatedData.coveredWeeks,
      lastStateWorked: validatedData.lastStateWorked,
      version: currentMember.version + 1,
      lastModifiedBy: validatedData.lastModifiedBy
    };

    // Update the member with incremented version
    const updatedMember = await prisma.member.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json(
      { error: 'Failed to update member' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const id = parseInt(request.url.split('/').pop() || '');
    const member = await prisma.member.findUnique({
      where: { id }
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    console.log('Fetched member:', member);
    return NextResponse.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const id = parseInt(request.url.split('/').pop() || '');
    
    // Check if the record exists and is not locked
    const member = await prisma.member.findUnique({
      where: { id }
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    if (member.isLocked) {
      return NextResponse.json(
        { error: 'Record is locked and cannot be deleted' },
        { status: 409 }
      );
    }

    await prisma.member.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json(
      { error: 'Failed to delete member' },
      { status: 500 }
    );
  }
} 