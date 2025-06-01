'use client';

import { useState, FormEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import Header from './Header';

interface SearchFormProps {
  onSearch: (params: { lastName?: string; email?: string; mobilePhone?: string }) => void;
  onAddMember: () => void;
}

export default function SearchForm({ onSearch, onAddMember }: SearchFormProps) {
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({
      lastName: lastName || undefined,
      email: email || undefined,
      mobilePhone: mobilePhone || undefined,
    });
  };

  return (
    <div className="mb-6">
      <Header />
      <div className="flex flex-wrap justify-center items-start gap-4">
        <Fieldset toggleable legend="Search Members" className="flex-grow max-w-4xl">
          <form onSubmit={handleSubmit} className="p-fluid grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="field">
              <span className="p-float-label">
                <InputText
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full"
                />
                <label htmlFor="lastName">Last Name</label>
              </span>
            </div>
            <div className="field">
              <span className="p-float-label">
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
            <div className="field">
              <span className="p-float-label">
                <InputText
                  id="mobilePhone"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  className="w-full"
                />
                <label htmlFor="mobilePhone">Mobile Phone</label>
              </span>
            </div>
            <div className="field flex align-items-end">
              <Button 
                type="submit" 
                label="Search" 
                icon="pi pi-search"
                severity="info"
                className="w-full"
              />
            </div>
          </form>
        </Fieldset>
        <Button
          label="Add New Member"
          icon="pi pi-plus"
          severity="success"
          onClick={onAddMember}
          className="min-w-[200px]"
        />
      </div>
    </div>
  );
} 