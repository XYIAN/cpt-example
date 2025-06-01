'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useState } from 'react';
import type { Member } from '@/types/member';

interface MemberTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (memberId: number) => void;
}

export default function MemberTable({ members, onEdit, onDelete }: MemberTableProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  const handleDeleteClick = (member: Member) => {
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

  const nameBodyTemplate = (rowData: Member) => {
    return `${rowData.firstName} ${rowData.lastName}`;
  };

  const contactBodyTemplate = (rowData: Member) => {
    return (
      <div>
        <div>{rowData.email}</div>
        {rowData.mobilePhone && <div className="text-sm text-gray-500">M: {rowData.mobilePhone}</div>}
        {rowData.homePhone && <div className="text-sm text-gray-500">H: {rowData.homePhone}</div>}
      </div>
    );
  };

  const addressBodyTemplate = (rowData: Member) => {
    return (
      <div>
        <div>{rowData.address1}</div>
        {rowData.address2 && <div>{rowData.address2}</div>}
        <div className="text-sm text-gray-500">
          {rowData.city}, {rowData.state} {rowData.zip}{rowData.zip4 && `-${rowData.zip4}`}
        </div>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: Member) => {
    return (
      <div className="flex gap-2 justify-end">
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
      </div>
    );
  };

  return (
    <>
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
          alignHeader="center"
        />
      </DataTable>

      <ConfirmDialog
        visible={deleteConfirmOpen}
        onHide={() => setDeleteConfirmOpen(false)}
        message={`Are you sure you want to delete ${memberToDelete?.firstName} ${memberToDelete?.lastName}?`}
        header="Confirm Delete"
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteConfirm}
        reject={() => setDeleteConfirmOpen(false)}
      />
    </>
  );
} 