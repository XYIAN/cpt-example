/*
  Warnings:

  - You are about to drop the column `address` on the `Member` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "homePhone" TEXT,
    "mobilePhone" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "zip4" TEXT,
    "productName" TEXT,
    "datePurchased" DATETIME,
    "paidAmount" REAL,
    "coveredWeeks" REAL,
    "lastStateWorked" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Member" ("createdAt", "email", "firstName", "id", "lastName", "mobilePhone", "updatedAt") SELECT "createdAt", "email", "firstName", "id", "lastName", "mobilePhone", "updatedAt" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE INDEX "Member_lastName_idx" ON "Member"("lastName");
CREATE INDEX "Member_email_idx" ON "Member"("email");
CREATE INDEX "Member_mobilePhone_idx" ON "Member"("mobilePhone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
