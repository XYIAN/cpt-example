'use client';

import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { BlockUI } from 'primereact/blockui';
import type { SerializedMember } from '@/types/member';

interface MemberTableProps {
  members: SerializedMember[];
  onEdit: (member: SerializedMember) => void;
  onDelete: (memberId: number) => void;
  deletingMemberId: number | null;
}

export default function MemberTable({ members, onEdit, onDelete, deletingMemberId }: MemberTableProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<SerializedMember | null>(null);

  const handleDeleteClick = (member: SerializedMember) => {
    setMemberToDelete(member);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      onDelete(memberToDelete.id);
      setDeleteConfirmOpen(false);
      setMemberToDelete(null);
    }
  };

  const nameBodyTemplate = (rowData: SerializedMember) => {
    return `${rowData.firstName} ${rowData.lastName}`;
  };

  const contactBodyTemplate = (rowData: SerializedMember) => {
    return (
      <div>
        <div>{rowData.email}</div>
        {rowData.mobilePhone && <div className="text-sm">M: {rowData.mobilePhone}</div>}
        {rowData.homePhone && <div className="text-sm">H: {rowData.homePhone}</div>}
      </div>
    );
  };

  const addressBodyTemplate = (rowData: SerializedMember) => {
    return (
      <div>
        <div>{rowData.address1}</div>
        {rowData.address2 && <div>{rowData.address2}</div>}
        <div className="text-sm">
          {rowData.city}, {rowData.state} {rowData.zip}{rowData.zip4 && `-${rowData.zip4}`}
        </div>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: SerializedMember) => {
    const isDeleting = deletingMemberId === rowData.id;

    return (
      <div className="flex gap-2 justify-end items-center">
        {isDeleting ? (
          <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" />
        ) : (
          <>
            <Button
              icon="pi pi-pencil"
              rounded
              text
              severity="info"
              onClick={() => onEdit(rowData)}
              tooltip="Edit Member"
            />
            <Button
              icon="pi pi-trash"
              rounded
              text
              severity="danger"
              onClick={() => handleDeleteClick(rowData)}
              tooltip="Delete Member"
            />
          </>
        )}
      </div>
    );
  };

  const LoadingOverlay = () => (
    <div className="flex justify-center items-center p-4">
      <ProgressSpinner strokeWidth="4" style={{ width: '50px', height: '50px' }} />
    </div>
  );

  return (
    <BlockUI blocked={!!deletingMemberId} template={<LoadingOverlay />}>
      <ConfirmDialog
        visible={deleteConfirmOpen}
        onHide={() => setDeleteConfirmOpen(false)}
        message={memberToDelete ? `Are you sure you want to delete ${memberToDelete.firstName} ${memberToDelete.lastName}? This action cannot be undone.` : ''}
        header="Confirm Delete"
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteConfirm}
        reject={() => setDeleteConfirmOpen(false)}
        acceptLabel="Yes, Delete"
        rejectLabel="No, Cancel"
        acceptIcon="pi pi-trash"
        rejectIcon="pi pi-times"
        acceptClassName="p-button-danger"
      />
      <DataTable
        value={members}
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage="No members found."
        className="p-datatable-sm"
      >
        <Column field="name" header="Name" body={nameBodyTemplate} sortable />
        <Column field="contact" header="Contact" body={contactBodyTemplate} />
        <Column field="address" header="Address" body={addressBodyTemplate} />
        <Column
          field="actions"
          header="Actions"
          body={actionsBodyTemplate}
          style={{ width: '100px' }}
        />
      </DataTable>
    </BlockUI>
  );
} 