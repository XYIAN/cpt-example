import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { prisma } from '../src/lib/prisma.js';
import {
  cleanRequiredString,
  cleanOptionalString,
  cleanNumber,
  cleanDate
} from '../src/utils/dataCleaners.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function importCsvFile(filePath) {
  const records = [];
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
      lastStateWorked: null,
      version: 1,
      isLocked: false,
      lastModifiedBy: null
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
      lastStateWorked: cleanOptionalString(record.LastStateWorked),
      version: 1,
      isLocked: false,
      lastModifiedBy: null
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
        data: member
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