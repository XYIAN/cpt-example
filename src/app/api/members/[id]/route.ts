import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

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
  lastStateWorked: z.string().optional().nullable(),
  version: z.number(), // Required for optimistic locking
});

export async function PUT(request: Request) {
  try {
    const id = parseInt(request.url.split('/').pop() || '');
    const body = await request.json();
    const validatedData = MemberInput.parse(body);

    // First, check if the record is locked
    const currentMember = await prisma.member.findUnique({
      where: { id },
      select: { version: true, isLocked: true }
    });

    if (!currentMember) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    if (currentMember.isLocked) {
      return NextResponse.json(
        { error: 'Member record is currently locked by another user' },
        { status: 409 }
      );
    }

    // Check version for optimistic locking
    if (currentMember.version !== validatedData.version) {
      return NextResponse.json(
        { 
          error: 'Record has been modified by another user',
          currentVersion: currentMember.version,
          yourVersion: validatedData.version
        },
        { status: 409 }
      );
    }

    // Lock the record
    await prisma.member.update({
      where: { id },
      data: { isLocked: true }
    });

    try {
      // Perform the update with version increment
      const member = await prisma.member.update({
        where: { 
          id,
          version: validatedData.version // Extra check to ensure version hasn't changed
        },
        data: {
          ...validatedData,
          datePurchased: validatedData.datePurchased ? new Date(validatedData.datePurchased) : null,
          version: { increment: 1 }, // Increment version
          isLocked: false // Release the lock
        },
      });

      return NextResponse.json(member);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Record was modified while we held the lock
          return NextResponse.json(
            { error: 'Record was modified by another user during update' },
            { status: 409 }
          );
        }
      }
      throw error;
    } finally {
      // Always release the lock in case of error
      await prisma.member.update({
        where: { id },
        data: { isLocked: false }
      }).catch(console.error); // Log but don't throw if unlock fails
    }
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
      where: { id },
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

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
    
    // Check if the record is locked
    const member = await prisma.member.findUnique({
      where: { id },
      select: { isLocked: true }
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    if (member.isLocked) {
      return NextResponse.json(
        { error: 'Member record is currently locked by another user' },
        { status: 409 }
      );
    }

    await prisma.member.delete({
      where: { id },
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