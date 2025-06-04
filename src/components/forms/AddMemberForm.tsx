import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MemberFormBase, MemberFormData } from './MemberFormBase';

interface AddMemberFormProps {
  onSubmit: (data: MemberFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  visible: boolean;
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ 
  onSubmit, 
  onCancel,
  isSubmitting,
  visible 
}) => {
  const handleSubmit = async (data: MemberFormData) => {
    await onSubmit(data);
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
        form="addMemberForm"
        type="submit"
        label="Add Member"
        icon="pi pi-plus"
        disabled={isSubmitting}
      />
    </div>
  );

  return (
    <Dialog
      header="Add New Member"
      visible={visible}
      onHide={onCancel}
      style={{ width: '90vw', maxWidth: '800px' }}
      modal
      footer={footer}
    >
      <MemberFormBase
        formId="addMemberForm"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        initialData={{ version: 1 }}
      />
    </Dialog>
  );
}; 