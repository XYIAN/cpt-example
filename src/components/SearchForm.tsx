'use client';

import { useState, FormEvent } from 'react';

interface SearchFormProps {
  onSearch: (searchParams: { lastName?: string; email?: string; mobilePhone?: string }) => void;
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
      mobilePhone: mobilePhone || undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="mobilePhone" className="block text-sm font-medium text-gray-700">
            Mobile Phone
          </label>
          <input
            type="tel"
            id="mobilePhone"
            value={mobilePhone}
            onChange={(e) => setMobilePhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>
    </form>
  );
} 