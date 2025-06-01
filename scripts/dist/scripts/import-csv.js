"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parse_1 = require("csv-parse");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../src/lib/prisma");
function cleanRequiredString(value) {
    if (!value)
        return '';
    const trimmed = value.trim();
    return trimmed === '' ? '' : trimmed;
}
function cleanOptionalString(value) {
    if (!value)
        return null;
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
}
function cleanNumber(value) {
    if (!value)
        return null;
    const trimmed = value.trim();
    if (trimmed === '')
        return null;
    const num = parseFloat(trimmed);
    return isNaN(num) ? null : num;
}
function cleanDate(value) {
    if (!value)
        return null;
    const trimmed = value.trim();
    if (trimmed === '')
        return null;
    const date = new Date(trimmed);
    return isNaN(date.getTime()) ? null : date;
}
async function importCsvFile(filePath) {
    const records = [];
    const parser = fs_1.default
        .createReadStream(filePath)
        .pipe((0, csv_parse_1.parse)({
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
        const members1 = await importCsvFile(path_1.default.join(__dirname, '../data/Members1.csv'));
        console.log('Importing Members2.csv...');
        const members2 = await importCsvFile(path_1.default.join(__dirname, '../data/Members2.csv'));
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
        await prisma_1.prisma.member.deleteMany();
        // Insert all members
        console.log('Inserting new members...');
        let count = 0;
        for (const member of allMembers) {
            await prisma_1.prisma.member.create({
                data: member
            });
            count++;
            if (count % 100 === 0) {
                console.log(`Imported ${count} of ${allMembers.length} members...`);
            }
        }
        console.log(`\nSuccessfully imported ${allMembers.length} members`);
    }
    catch (error) {
        console.error('Error importing CSV data:', error);
        process.exit(1);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
}
main();
