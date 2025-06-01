'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';

interface Member {
  id: number;
  firstName: string;
  lastName: string;
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
}

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

  const productDetailsBodyTemplate = (rowData: Member) => {
    return (
      <div>
        <div>{rowData.productName}</div>
        {rowData.datePurchased && (
          <div className="text-sm text-gray-500">
            Purchased: {new Date(rowData.datePurchased).toLocaleDateString()}
          </div>
        )}
        {rowData.paidAmount && (
          <div className="text-sm text-gray-500">
            Amount: ${rowData.paidAmount.toFixed(2)}
          </div>
        )}
        {rowData.coveredWeeks && (
          <div className="text-sm text-gray-500">
            Covered Weeks: {rowData.coveredWeeks}
          </div>
        )}
        {rowData.lastStateWorked && (
          <div className="text-sm text-gray-500">
            Last State: {rowData.lastStateWorked}
          </div>
        )}
      </div>
    );
  };

  const actionBodyTemplate = (rowData: Member) => {
    return (
      <div className="flex gap-2 justify-end">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          severity="info"
          onClick={() => onEdit(rowData)}
          tooltip="Edit"
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleDeleteClick(rowData)}
          tooltip="Delete"
        />
      </div>
    );
  };

  const header = (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold m-0">Members</h2>
    </div>
  );

  return (
    <Card>
      <DataTable
        value={members}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
        header={header}
        emptyMessage="No members found."
        className="p-datatable-sm"
        sortField="lastName"
        sortOrder={1}
      >
        <Column field="name" header="Name" body={nameBodyTemplate} sortable sortField="lastName" />
        <Column field="contact" header="Contact" body={contactBodyTemplate} />
        <Column field="address" header="Address" body={addressBodyTemplate} />
        <Column field="productDetails" header="Product Details" body={productDetailsBodyTemplate} />
        <Column body={actionBodyTemplate} style={{ width: '8rem' }} />
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
    </Card>
  );
} 