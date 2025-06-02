export interface Member {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string | null;
  homePhone: string | null;
  mobilePhone: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  zip4: string | null;
  productName: string | null;
  datePurchased: string | null;
  paidAmount: number | null;
  coveredWeeks: number | null;
  lastStateWorked: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
  lastModifiedBy: string | null;
  isLocked: boolean;
} 