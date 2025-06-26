import { Member as PrismaMember } from '@prisma/client';

// Base type from Prisma
export type Member = PrismaMember;

// Type for serialized member from API
export type SerializedMember = Omit<Member, 'datePurchased' | 'createdAt' | 'updatedAt'> & {
  datePurchased: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MemberFormData = Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'isLocked' | 'lastModifiedBy' | 'datePurchased'> & {
  datePurchased: string | null;
};

export interface MemberSearchFilters {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
  productName?: string;
} 