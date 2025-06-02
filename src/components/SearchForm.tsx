'use client';

import { useState, FormEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { SplitButton } from 'primereact/splitbutton';
import { ConfirmDialog } from 'primereact/confirmdialog';
import Header from './Header';

interface SearchFormProps {
  onSearch: (params: {
    // Basic search params
    lastName?: string;
    email?: string;
    mobilePhone?: string;
    // Advanced search params
    firstName?: string;
    homePhone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    productName?: string;
    datePurchased?: string;
    paidAmountMin?: number;
    paidAmountMax?: number;
    hasCoveredWeeks?: boolean;
  }) => void;
  onAdd?: () => void;
}

export default function SearchForm({ onSearch, onAdd }: SearchFormProps) {
  // State for showing advanced search
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Basic search state
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');

  // Advanced search state
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({
      // Basic search params
      lastName: lastName || undefined,
      email: email || undefined,
      mobilePhone: mobilePhone || undefined,
      // Advanced search params
      firstName: firstName || undefined,
      homePhone: homePhone || undefined,
      address: address || undefined,
      city: city || undefined,
      state: state || undefined,
      zip: zip || undefined,
      productName: productName || undefined,
      datePurchased: datePurchased ? datePurchased.toISOString().split('T')[0] : undefined,
      paidAmountMin: paidAmountMin || undefined,
      paidAmountMax: paidAmountMax || undefined,
      hasCoveredWeeks: hasCoveredWeeks || undefined,
    });
  };

  const clearForm = () => {
    // Clear basic search
    setLastName('');
    setEmail('');
    setMobilePhone('');
    
    // Clear advanced search
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

    // Trigger a search with no params to show all results
    onSearch({});
  };

  const searchItems = [
    {
      label: 'Toggle Advanced Search',
      icon: 'pi pi-sliders-h',
      command: () => setShowAdvanced(!showAdvanced)
    }
  ];

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Create an object with only the non-empty values
    const searchParams: Record<string, string | number | boolean> = {};
    
    // Basic search params
    if (lastName.trim()) searchParams.lastName = lastName.trim();
    if (email.trim()) searchParams.email = email.trim();
    if (mobilePhone.trim()) searchParams.mobilePhone = mobilePhone.trim();
    
    // Advanced search params
    if (firstName.trim()) searchParams.firstName = firstName.trim();
    if (homePhone.trim()) searchParams.homePhone = homePhone.trim();
    if (address.trim()) searchParams.address = address.trim();
    if (city.trim()) searchParams.city = city.trim();
    if (state.trim()) searchParams.state = state.trim();
    if (zip.trim()) searchParams.zip = zip.trim();
    if (productName.trim()) searchParams.productName = productName.trim();
    if (datePurchased) searchParams.datePurchased = datePurchased.toISOString().split('T')[0];
    if (paidAmountMin !== null) searchParams.paidAmountMin = paidAmountMin;
    if (paidAmountMax !== null) searchParams.paidAmountMax = paidAmountMax;
    if (hasCoveredWeeks) searchParams.hasCoveredWeeks = hasCoveredWeeks;

    // Call onSearch with the filtered params
    onSearch(searchParams);
  };

  return (
    <div className="mb-6">
      <Header />
      <div className="flex flex-col gap-4">
        <Fieldset legend="Basic Search" className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Fieldset legend="Advanced Search" className="w-full">
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
                      <label htmlFor="zip">ZIP Code</label>
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
                        dateFormat="yy-mm-dd"
                        className="w-full"
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
                      <label htmlFor="paidAmountMin">Min Paid Amount</label>
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
                      <label htmlFor="paidAmountMax">Max Paid Amount</label>
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

      <ConfirmDialog
        visible={showClearConfirm}
        onHide={() => setShowClearConfirm(false)}
        message="Are you sure you want to clear all search fields? This will reset the search to show all members."
        header="Clear Search Fields"
        icon="pi pi-exclamation-triangle"
        accept={clearForm}
        reject={() => setShowClearConfirm(false)}
      />
    </div>
  );
} 