'use client';

import { useState, FormEvent } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

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

interface EditMemberFormProps {
  member: Member;
  onSave: (member: Member) => void;
  onCancel: () => void;
}

export default function EditMemberForm({ member, onSave, onCancel }: EditMemberFormProps) {
  const [formData, setFormData] = useState<Member>({
    ...member,
    email: member.email || '',
    homePhone: member.homePhone || '',
    mobilePhone: member.mobilePhone || '',
    address1: member.address1 || '',
    address2: member.address2 || '',
    city: member.city || '',
    state: member.state || '',
    zip: member.zip || '',
    zip4: member.zip4 || '',
    productName: member.productName || '',
    datePurchased: member.datePurchased || '',
    lastStateWorked: member.lastStateWorked || ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Convert empty strings back to null before saving
    const submissionData = Object.entries(formData).reduce<Partial<Member>>((acc, [key, value]) => {
      const typedKey = key as keyof Member;
      acc[typedKey] = value === '' ? null : value;
      return acc;
    }, {}) as Member;
    onSave(submissionData);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const header = (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold m-0">Edit Member</h2>
    </div>
  );

  return (
    <Card header={header}>
      <form onSubmit={handleSubmit} className="p-fluid grid grid-cols-1 md:grid-cols-2 gap-4">
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
              value={formData.lastName}
              onChange={handleTextChange}
              required
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
              onChange={(e) => handleDateChange(e.value as Date)}
              dateFormat="yy-mm-dd"
              showIcon
            />
            <label htmlFor="datePurchased">Date Purchased</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputNumber
              id="paidAmount"
              value={formData.paidAmount ?? undefined}
              onValueChange={(e) => handleNumberChange('paidAmount', e)}
              mode="currency"
              currency="USD"
              locale="en-US"
              minFractionDigits={2}
            />
            <label htmlFor="paidAmount">Paid Amount</label>
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputNumber
              id="coveredWeeks"
              value={formData.coveredWeeks ?? undefined}
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

        <div className="col-span-2 flex justify-end gap-2 mt-4">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            outlined
            onClick={onCancel}
          />
          <Button
            type="submit"
            label="Save Changes"
            severity="success"
          />
        </div>
      </form>
    </Card>
  );
} 