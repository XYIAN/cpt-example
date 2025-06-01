import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log('Search params:', Object.fromEntries(searchParams.entries()));
    
    // Basic search params
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');
    const mobilePhone = searchParams.get('mobilePhone');

    // Advanced search params
    const firstName = searchParams.get('firstName');
    const homePhone = searchParams.get('homePhone');
    const address = searchParams.get('address');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const zip = searchParams.get('zip');
    const productName = searchParams.get('productName');
    const datePurchased = searchParams.get('datePurchased');
    const paidAmountMin = searchParams.get('paidAmountMin');
    const paidAmountMax = searchParams.get('paidAmountMax');
    const hasCoveredWeeks = searchParams.get('hasCoveredWeeks');

    const conditions: Prisma.MemberWhereInput[] = [];

    // Basic search conditions
    if (lastName?.trim()) {
      conditions.push({ lastName: { contains: lastName.trim(), mode: 'insensitive' } });
    }
    if (email?.trim()) {
      conditions.push({ email: { contains: email.trim(), mode: 'insensitive' } });
    }
    if (mobilePhone?.trim()) {
      conditions.push({ mobilePhone: { contains: mobilePhone.trim() } });
    }

    // Advanced search conditions
    if (firstName?.trim()) {
      conditions.push({ firstName: { contains: firstName.trim(), mode: 'insensitive' } });
    }
    if (homePhone?.trim()) {
      conditions.push({ homePhone: { contains: homePhone.trim() } });
    }
    if (address?.trim()) {
      conditions.push({ 
        OR: [
          { address1: { contains: address.trim(), mode: 'insensitive' } },
          { address2: { contains: address.trim(), mode: 'insensitive' } }
        ] 
      });
    }
    if (city?.trim()) {
      conditions.push({ city: { contains: city.trim(), mode: 'insensitive' } });
    }
    if (state?.trim()) {
      conditions.push({ state: { contains: state.trim(), mode: 'insensitive' } });
    }
    if (zip?.trim()) {
      conditions.push({ 
        OR: [
          { zip: { contains: zip.trim() } },
          { zip4: { contains: zip.trim() } }
        ] 
      });
    }
    if (productName?.trim()) {
      conditions.push({ productName: { contains: productName.trim(), mode: 'insensitive' } });
    }
    if (datePurchased) {
      conditions.push({ datePurchased });
    }
    if (paidAmountMin) {
      conditions.push({ paidAmount: { gte: parseFloat(paidAmountMin) } });
    }
    if (paidAmountMax) {
      conditions.push({ paidAmount: { lte: parseFloat(paidAmountMax) } });
    }
    if (hasCoveredWeeks === 'true') {
      conditions.push({ coveredWeeks: { gt: 0 } });
    }

    console.log('Search conditions:', JSON.stringify(conditions, null, 2));

    const members = await prisma.member.findMany({
      where: conditions.length > 0 ? { AND: conditions } : {},
      orderBy: {
        lastName: 'asc'
      }
    });

    console.log(`Found ${members.length} members`);
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error searching members:', error);
    return NextResponse.json(
      { error: 'Failed to search members' },
      { status: 500 }
    );
  }
} 