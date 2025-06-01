-- CreateTable
CREATE TABLE "Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "mobilePhone" TEXT,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Member_lastName_idx" ON "Member"("lastName");

-- CreateIndex
CREATE INDEX "Member_email_idx" ON "Member"("email");

-- CreateIndex
CREATE INDEX "Member_mobilePhone_idx" ON "Member"("mobilePhone");
