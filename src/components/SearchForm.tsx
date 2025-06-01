'use client';

import { useState, FormEvent } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface SearchFormProps {
  onSearch: (params: { lastName?: string; email?: string; mobilePhone?: string }) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
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

  const header = (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold m-0">Search Members</h2>
    </div>
  );

  return (
    <Card header={header} className="mb-4">
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
    </Card>
  );
} 