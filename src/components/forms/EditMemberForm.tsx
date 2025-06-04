import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Member } from '@prisma/client';
import { MemberFormBase, MemberFormData } from './MemberFormBase';

interface EditMemberFormProps {
  member: Member;
  onSubmit: (data: MemberFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  visible: boolean;
}

export const EditMemberForm: React.FC<EditMemberFormProps> = ({
  member,
  onSubmit,
  onCancel,
  isSubmitting,
  visible
}) => {
  const initialData: Partial<MemberFormData> = {
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    homePhone: member.homePhone,
    mobilePhone: member.mobilePhone,
    address1: member.address1,
    address2: member.address2,
    city: member.city,
    state: member.state,
    zip: member.zip,
    zip4: member.zip4,
    productName: member.productName,
    datePurchased: member.datePurchased,
    paidAmount: member.paidAmount,
    coveredWeeks: member.coveredWeeks,
    lastStateWorked: member.lastStateWorked,
    version: member.version
  };

  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={onCancel}
        className="p-button-text"
        disabled={isSubmitting}
      />
      <Button
        form="editMemberForm"
        type="submit"
        label="Save Changes"
        icon="pi pi-check"
        disabled={isSubmitting}
      />
    </div>
  );

  return (
    <Dialog
      header="Edit Member"
      visible={visible}
      onHide={onCancel}
      style={{ width: '90vw', maxWidth: '800px' }}
      modal
      footer={footer}
    >
      <MemberFormBase
        formId="editMemberForm"
        initialData={initialData}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </Dialog>
  );
}; 