'use client';

import { useState, FormEvent } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import type { Member } from '@/types/member';

type NewMember = Omit<Member, 'id' | 'isLocked' | 'lastModifiedBy' | 'createdAt' | 'updatedAt'>;

interface AddMemberFormProps {
  onSubmit: (member: NewMember) => void;
  onCancel: () => void;
  visible: boolean;
}

export default function AddMemberForm({ onSubmit, onCancel, visible }: AddMemberFormProps) {
  const [formData, setFormData] = useState<NewMember>({
    firstName: '',
    lastName: null,
    email: null,
    homePhone: null,
    mobilePhone: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
    zip4: null,
    productName: null,
    datePurchased: null,
    paidAmount: null,
    coveredWeeks: null,
    lastStateWorked: null,
    version: 1
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
      header="Add New Member"
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