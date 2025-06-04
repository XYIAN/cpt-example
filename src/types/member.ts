import { Member as PrismaMember } from '@prisma/client';

export type Member = PrismaMember;

export type MemberFormData = Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'isLocked' | 'lastModifiedBy'>;

export interface MemberSearchFilters {
  firstName?: string;
  lastName?: string;
  email?: string;
  state?: string;
  productName?: string;
}

export interface MemberTableColumn {
  id: keyof Member;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: string | number | Date | null) => string;
} 