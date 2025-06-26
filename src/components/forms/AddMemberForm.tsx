import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
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
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const handleSubmit = async (data: MemberFormData) => {
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
        header="Add New Member"
        visible={visible}
        onHide={handleCancel}
        style={{ width: '90vw', maxWidth: '800px' }}
        modal
        closable={!isSubmitting}
        closeOnEscape={!isSubmitting}
      >
        <div className="p-fluid">
          <MemberFormBase
            formId="addMemberForm"
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            initialData={{ version: 1 }}
            onFormChange={() => setFormTouched(true)}
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
              form="addMemberForm"
              type="submit"
              label="Add Member"
              icon="pi pi-plus"
              disabled={isSubmitting}
              severity="success"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}; 