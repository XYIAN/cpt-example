'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import type { Member } from '@/types/member';

interface EditMemberFormProps {
  member: Member;
  onSave: (member: Member) => void;
  onCancel: () => void;
  visible: boolean;
}

export default function EditMemberForm({ member, onSave, onCancel, visible }: EditMemberFormProps) {
  console.log('Member prop received:', member);
  
  const [formData, setFormData] = useState<Member>({
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email ?? '',
    homePhone: member.homePhone ?? '',
    mobilePhone: member.mobilePhone ?? '',
    address1: member.address1 ?? '',
    address2: member.address2 ?? '',
    city: member.city ?? '',
    state: member.state ?? '',
    zip: member.zip ?? '',
    zip4: member.zip4 ?? '',
    productName: member.productName ?? '',
    datePurchased: member.datePurchased ?? '',
    paidAmount: member.paidAmount,
    coveredWeeks: member.coveredWeeks,
    lastStateWorked: member.lastStateWorked ?? '',
    // System fields
    id: member.id,
    version: member.version,
    isLocked: member.isLocked,
    lastModifiedBy: member.lastModifiedBy,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt
  });

  console.log('Initial form data:', formData);

  // Add effect to update form data when member changes
  useEffect(() => {
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email ?? '',
      homePhone: member.homePhone ?? '',
      mobilePhone: member.mobilePhone ?? '',
      address1: member.address1 ?? '',
      address2: member.address2 ?? '',
      city: member.city ?? '',
      state: member.state ?? '',
      zip: member.zip ?? '',
      zip4: member.zip4 ?? '',
      productName: member.productName ?? '',
      datePurchased: member.datePurchased ?? '',
      paidAmount: member.paidAmount,
      coveredWeeks: member.coveredWeeks,
      lastStateWorked: member.lastStateWorked ?? '',
      // System fields
      id: member.id,
      version: member.version,
      isLocked: member.isLocked,
      lastModifiedBy: member.lastModifiedBy,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    });
  }, [member]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const submissionData: Member = {
      id: member.id,
      version: member.version,
      isLocked: member.isLocked,
      lastModifiedBy: member.lastModifiedBy,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      firstName: formData.firstName,
      lastName: formData.lastName || null,
      email: formData.email || null,
      homePhone: formData.homePhone || null,
      mobilePhone: formData.mobilePhone || null,
      address1: formData.address1 || null,
      address2: formData.address2 || null,
      city: formData.city || null,
      state: formData.state || null,
      zip: formData.zip || null,
      zip4: formData.zip4 || null,
      productName: formData.productName || null,
      datePurchased: formData.datePurchased || null,
      paidAmount: formData.paidAmount || null,
      coveredWeeks: formData.coveredWeeks || null,
      lastStateWorked: formData.lastStateWorked || null
    };

    console.log('Original member:', member);
    console.log('Form data:', formData);
    console.log('Submission data:', submissionData);

    onSave(submissionData);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || null
    }));
  };

  const handleNumberChange = (name: string, e: InputNumberValueChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      [name]: e.value ?? null
    }));
  };

  const handleDateChange = (value: Date | null) => {
    setFormData(prev => ({
      ...prev,
      datePurchased: value ? value.toISOString().split('T')[0] : null
    }));
  };

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={onCancel} className="p-button-text" />
      <Button label="Save" icon="pi pi-check" onClick={handleSubmit} autoFocus />
    </div>
  );

  return (
    <Dialog
      header="Edit Member"
      visible={visible}
      style={{ width: '90vw', maxWidth: '800px' }}
      onHide={onCancel}
      footer={footerContent}
      modal
      className="p-fluid"
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="field">
          <span className="p-float-label">
            <InputText
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleTextChange}
              required
            />
            <label htmlFor="firstName">First Name</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="lastName">Last Name</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleTextChange}
              type="email"
            />
            <label htmlFor="email">Email</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="mobilePhone"
              name="mobilePhone"
              value={formData.mobilePhone || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="mobilePhone">Mobile Phone</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="homePhone"
              name="homePhone"
              value={formData.homePhone || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="homePhone">Home Phone</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="address1"
              name="address1"
              value={formData.address1 || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="address1">Address Line 1</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="address2"
              name="address2"
              value={formData.address2 || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="address2">Address Line 2</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="city"
              name="city"
              value={formData.city || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="city">City</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="state"
              name="state"
              value={formData.state || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="state">State</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="zip"
              name="zip"
              value={formData.zip || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="zip">ZIP Code</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="zip4"
              name="zip4"
              value={formData.zip4 || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="zip4">ZIP+4</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="productName"
              name="productName"
              value={formData.productName || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="productName">Product Name</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Calendar
              id="datePurchased"
              value={formData.datePurchased ? new Date(formData.datePurchased) : null}
              onChange={(e) => handleDateChange(e.value as Date | null)}
              dateFormat="yy-mm-dd"
            />
            <label htmlFor="datePurchased">Date Purchased</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputNumber
              id="paidAmount"
              value={formData.paidAmount || null}
              onValueChange={(e) => handleNumberChange('paidAmount', e)}
              mode="decimal"
              minFractionDigits={2}
              maxFractionDigits={2}
            />
            <label htmlFor="paidAmount">Paid Amount</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputNumber
              id="coveredWeeks"
              value={formData.coveredWeeks || null}
              onValueChange={(e) => handleNumberChange('coveredWeeks', e)}
            />
            <label htmlFor="coveredWeeks">Covered Weeks</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="lastStateWorked"
              name="lastStateWorked"
              value={formData.lastStateWorked || ''}
              onChange={handleTextChange}
            />
            <label htmlFor="lastStateWorked">Last State Worked</label>
          </span>
        </div>
      </form>
    </Dialog>
  );
} 