'use client';

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog } from 'primereact/confirmdialog';

interface SearchFormProps {
  onSearch: (searchParams: URLSearchParams) => void;
  onAdd?: () => void;
}

export default function SearchForm({ onSearch, onAdd }: SearchFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Basic search fields
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');

  // Advanced search fields
  const [firstName, setFirstName] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [productName, setProductName] = useState('');
  const [datePurchased, setDatePurchased] = useState<Date | null>(null);
  const [paidAmountMin, setPaidAmountMin] = useState<number | null>(null);
  const [paidAmountMax, setPaidAmountMax] = useState<number | null>(null);
  const [hasCoveredWeeks, setHasCoveredWeeks] = useState(false);

  const searchItems = [
    {
      label: 'Advanced Search',
      icon: 'pi pi-sliders-h',
      command: () => setShowAdvanced(!showAdvanced)
    }
  ];

  const handleClear = () => {
    // Clear basic search fields
    setLastName('');
    setEmail('');
    setMobilePhone('');

    // Clear advanced search fields
    setFirstName('');
    setHomePhone('');
    setAddress('');
    setCity('');
    setState('');
    setZip('');
    setProductName('');
    setDatePurchased(null);
    setPaidAmountMin(null);
    setPaidAmountMax(null);
    setHasCoveredWeeks(false);

    // Reset UI state
    setShowAdvanced(false);
    setShowClearConfirm(false);

    // Trigger search with empty params to show all records
    onSearch(new URLSearchParams());
  };

  const handleSearchClick = () => {
    const params = new URLSearchParams();

    // Add basic search params
    if (lastName) params.append('lastName', lastName);
    if (email) params.append('email', email);
    if (mobilePhone) params.append('mobilePhone', mobilePhone);

    // Add advanced search params
    if (firstName) params.append('firstName', firstName);
    if (homePhone) params.append('homePhone', homePhone);
    if (address) params.append('address', address);
    if (city) params.append('city', city);
    if (state) params.append('state', state);
    if (zip) params.append('zip', zip);
    if (productName) params.append('productName', productName);
    if (datePurchased) params.append('datePurchased', datePurchased.toISOString().split('T')[0]);
    if (paidAmountMin !== null) params.append('paidAmountMin', paidAmountMin.toString());
    if (paidAmountMax !== null) params.append('paidAmountMax', paidAmountMax.toString());
    if (hasCoveredWeeks) params.append('hasCoveredWeeks', 'true');

    onSearch(params);
  };

  return (
    <div className="mb-4">
      <ConfirmDialog
        visible={showClearConfirm}
        onHide={() => setShowClearConfirm(false)}
        message="Are you sure you want to clear all search fields? This will reset the search and show all records."
        header="Clear Search"
        icon="pi pi-exclamation-triangle"
        accept={handleClear}
        reject={() => setShowClearConfirm(false)}
        acceptLabel="Yes, Clear"
        rejectLabel="No, Keep"
      />

      <Fieldset legend="Search Members">
        <form onSubmit={(e) => { e.preventDefault(); handleSearchClick(); }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
          </div>

          {showAdvanced && (
            <Fieldset legend="Advanced Search" className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full"
                    />
                    <label htmlFor="firstName">First Name</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="homePhone"
                      value={homePhone}
                      onChange={(e) => setHomePhone(e.target.value)}
                      className="w-full"
                    />
                    <label htmlFor="homePhone">Home Phone</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full"
                    />
                    <label htmlFor="address">Address</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full"
                    />
                    <label htmlFor="city">City</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full"
                    />
                    <label htmlFor="state">State</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full"
                    />
                    <label htmlFor="zip">ZIP</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full"
                    />
                    <label htmlFor="productName">Product Name</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Calendar
                      id="datePurchased"
                      value={datePurchased}
                      onChange={(e) => setDatePurchased(e.value as Date | null)}
                      className="w-full"
                      dateFormat="yy-mm-dd"
                    />
                    <label htmlFor="datePurchased">Date Purchased</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputNumber
                      id="paidAmountMin"
                      value={paidAmountMin}
                      onValueChange={(e) => setPaidAmountMin(e.value ?? null)}
                      mode="currency"
                      currency="USD"
                      className="w-full"
                    />
                    <label htmlFor="paidAmountMin">Min Amount Paid</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputNumber
                      id="paidAmountMax"
                      value={paidAmountMax}
                      onValueChange={(e) => setPaidAmountMax(e.value ?? null)}
                      mode="currency"
                      currency="USD"
                      className="w-full"
                    />
                    <label htmlFor="paidAmountMax">Max Amount Paid</label>
                  </span>
                </div>

                <div className="field flex items-center gap-2">
                  <Checkbox
                    id="hasCoveredWeeks"
                    checked={hasCoveredWeeks}
                    onChange={(e) => setHasCoveredWeeks(e.checked || false)}
                  />
                  <label htmlFor="hasCoveredWeeks" className="cursor-pointer">
                    Has Covered Weeks
                  </label>
                </div>
              </div>
            </Fieldset>
          )}

          <div className="flex justify-between items-center gap-4 mt-4">
            <div className="flex gap-2">
              <SplitButton 
                label="Search"
                icon="pi pi-search"
                model={searchItems}
                severity="info"
                onClick={handleSearchClick}
              />
              <Button
                icon="pi pi-refresh"
                severity="secondary"
                onClick={() => setShowClearConfirm(true)}
                tooltip="Clear Search"
              />
            </div>
            <div>
              {onAdd && (
                <Button
                  label="Add Member"
                  icon="pi pi-plus"
                  severity="success"
                  onClick={onAdd}
                />
              )}
            </div>
          </div>
        </form>
      </Fieldset>
    </div>
  );
} 