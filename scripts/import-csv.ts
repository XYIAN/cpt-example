import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma';

type CsvRecord = {
  LastName: string;
  FirstName: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  Zip: string;
  Zip4: string;
  Email: string;
  HomePhone: string;
  MobilePhone: string;
  ProductName?: string;
  DatePurchased?: string;
  PaidAmount?: string;
  CoveredWeeks?: string;
  LastStateWorked?: string;
};

function cleanRequiredString(value: string | undefined | null): string {
  if (!value) return '';
  const trimmed = value.trim();
  return trimmed === '' ? '' : trimmed;
}

function cleanOptionalString(value: string | undefined | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function cleanNumber(value: string | undefined | null): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const num = parseFloat(trimmed);
  return isNaN(num) ? null : num;
}

function cleanDate(value: string | undefined | null): Date | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const date = new Date(trimmed);
  return isNaN(date.getTime()) ? null : date;
}

async function importCsvFile(filePath: string) {
  const records: CsvRecord[] = [];
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({
      columns: true,
      skip_empty_lines: true,
      trim: true
    }));

  for await (const record of parser) {
    records.push(record);
  }

  return records;
}

async function main() {
  try {
    // Import data from both CSV files
    console.log('Importing Members1.csv...');
    const members1 = await importCsvFile(path.join(__dirname, '../data/Members1.csv'));
    console.log('Importing Members2.csv...');
    const members2 = await importCsvFile(path.join(__dirname, '../data/Members2.csv'));

    // Process and insert Members1 data
    const members1Data = members1.map(record => ({
      firstName: cleanRequiredString(record.FirstName),
      lastName: cleanRequiredString(record.LastName),
      email: cleanOptionalString(record.Email),
      homePhone: cleanOptionalString(record.HomePhone),
      mobilePhone: cleanOptionalString(record.MobilePhone),
      address1: cleanOptionalString(record.Address1),
      address2: cleanOptionalString(record.Address2),
      city: cleanOptionalString(record.City),
      state: cleanOptionalString(record.State),
      zip: cleanOptionalString(record.Zip),
      zip4: cleanOptionalString(record.Zip4),
      productName: cleanOptionalString(record.ProductName),
      datePurchased: cleanDate(record.DatePurchased),
      paidAmount: cleanNumber(record.PaidAmount),
      coveredWeeks: null,
      lastStateWorked: null
    }));

    // Process and insert Members2 data
    const members2Data = members2.map(record => ({
      firstName: cleanRequiredString(record.FirstName),
      lastName: cleanRequiredString(record.LastName),
      email: cleanOptionalString(record.Email),
      homePhone: cleanOptionalString(record.HomePhone),
      mobilePhone: cleanOptionalString(record.MobilePhone),
      address1: cleanOptionalString(record.Address1),
      address2: cleanOptionalString(record.Address2),
      city: cleanOptionalString(record.City),
      state: cleanOptionalString(record.State),
      zip: cleanOptionalString(record.Zip),
      zip4: cleanOptionalString(record.Zip4),
      productName: null,
      datePurchased: null,
      paidAmount: null,
      coveredWeeks: cleanNumber(record.CoveredWeeks),
      lastStateWorked: cleanOptionalString(record.LastStateWorked)
    }));

    // Combine all members
    const allMembers = [...members1Data, ...members2Data];

    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.member.deleteMany();

    // Insert all members
    console.log('Inserting new members...');
    let count = 0;
    for (const member of allMembers) {
      await prisma.member.create({
        data: {
          ...member,
          version: 1,
          isLocked: false,
          lastModifiedBy: null
        }
      });
      count++;
      if (count % 100 === 0) {
        console.log(`Imported ${count} of ${allMembers.length} members...`);
      }
    }

    console.log(`\nSuccessfully imported ${allMembers.length} members`);
  } catch (error) {
    console.error('Error importing CSV data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 