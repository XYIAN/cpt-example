'use client';

import { useState, FormEvent } from 'react';

interface Member {
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

interface AddMemberFormProps {
  onSubmit: (member: Member) => void;
  onCancel: () => void;
}

const emptyMember: Member = {
  firstName: '',
  lastName: '',
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
  lastStateWorked: null
};

export default function AddMemberForm({ onSubmit, onCancel }: AddMemberFormProps) {
  const [formData, setFormData] = useState<Member>(emptyMember);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? Number(value) : null) : (value || null)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="mobilePhone" className="block text-sm font-medium text-gray-700">Mobile Phone</label>
          <input
            type="tel"
            name="mobilePhone"
            id="mobilePhone"
            value={formData.mobilePhone || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="homePhone" className="block text-sm font-medium text-gray-700">Home Phone</label>
          <input
            type="tel"
            name="homePhone"
            id="homePhone"
            value={formData.homePhone || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
          <input
            type="text"
            name="address1"
            id="address1"
            value={formData.address1 || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
          <input
            type="text"
            name="address2"
            id="address2"
            value={formData.address2 || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            id="state"
            value={formData.state || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
          <input
            type="text"
            name="zip"
            id="zip"
            value={formData.zip || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="zip4" className="block text-sm font-medium text-gray-700">ZIP+4</label>
          <input
            type="text"
            name="zip4"
            id="zip4"
            value={formData.zip4 || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={formData.productName || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="datePurchased" className="block text-sm font-medium text-gray-700">Date Purchased</label>
          <input
            type="date"
            name="datePurchased"
            id="datePurchased"
            value={formData.datePurchased || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-700">Paid Amount</label>
          <input
            type="number"
            name="paidAmount"
            id="paidAmount"
            step="0.01"
            value={formData.paidAmount || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="coveredWeeks" className="block text-sm font-medium text-gray-700">Covered Weeks</label>
          <input
            type="number"
            name="coveredWeeks"
            id="coveredWeeks"
            value={formData.coveredWeeks || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="lastStateWorked" className="block text-sm font-medium text-gray-700">Last State Worked</label>
          <input
            type="text"
            name="lastStateWorked"
            id="lastStateWorked"
            value={formData.lastStateWorked || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Member
        </button>
      </div>
    </form>
  );
} 