import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { MemberFormBase, MemberFormData, MemberFormBaseRef } from './MemberFormBase';
import { SerializedMember } from '@/types/member';

interface EditMemberFormProps {
  member: SerializedMember;
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
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const formRef = useRef<MemberFormBaseRef>(null);

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
    datePurchased: member.datePurchased ? member.datePurchased.split('T')[0] : null,
    paidAmount: member.paidAmount,
    coveredWeeks: member.coveredWeeks,
    lastStateWorked: member.lastStateWorked,
    version: member.version
  };

  const handleSubmit = async (data: MemberFormData) => {
    console.log('EditMemberForm handleSubmit called with data:', data);
    await onSubmit(data);
    setFormTouched(false);
  };

  const handleCancel = () => {
    if (formTouched) {
      setShowCancelConfirm(true);
    } else {
      onCancel();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    setFormTouched(false);
    onCancel();
  };

  const handleSaveClick = async () => {
    console.log('Save button clicked');
    if (formRef.current) {
      console.log('Form ref exists, submitting form');
      try {
        await formRef.current.submitForm();
        console.log('Form submission completed');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <>
      <ConfirmDialog
        visible={showCancelConfirm}
        onHide={() => setShowCancelConfirm(false)}
        message="You have unsaved changes. Are you sure you want to cancel?"
        header="Confirm Cancel"
        icon="pi pi-exclamation-triangle"
        accept={handleConfirmCancel}
        reject={() => setShowCancelConfirm(false)}
        acceptLabel="Yes, Cancel"
        rejectLabel="No, Continue Editing"
        acceptIcon="pi pi-times"
        rejectIcon="pi pi-pencil"
      />
      <Dialog
        header="Edit Member"
        visible={visible}
        onHide={handleCancel}
        style={{ width: '90vw', maxWidth: '800px' }}
        modal
        closable={!isSubmitting}
        closeOnEscape={!isSubmitting}
      >
        <div className="p-fluid">
          <MemberFormBase
            formId="edit-member-form"
            initialData={initialData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onFormChange={() => setFormTouched(true)}
            ref={formRef}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={handleCancel}
              className="p-button-text"
              disabled={isSubmitting}
              type="button"
            />
            <Button
              onClick={handleSaveClick}
              type="button"
              label="Save Changes"
              icon="pi pi-check"
              disabled={isSubmitting}
              severity="success"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}; 