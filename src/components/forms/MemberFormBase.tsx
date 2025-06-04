import React from 'react';
import { Member } from '@prisma/client';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

export type MemberFormData = Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'isLocked' | 'lastModifiedBy'>;

interface MemberFormBaseProps {
  initialData?: Partial<MemberFormData>;
  onSubmit: (data: MemberFormData) => void;
  isSubmitting: boolean;
  children?: React.ReactNode;
  formId?: string;
}

export const MemberFormBase: React.FC<MemberFormBaseProps> = ({
  initialData = {},
  onSubmit,
  isSubmitting,
  children,
  formId
}) => {
  const { control, handleSubmit } = useForm<MemberFormData>({
    defaultValues: {
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
      lastStateWorked: null,
      version: 1,
      ...initialData
    }
  });

  const formFields = [
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'email', label: 'Email' },
    { name: 'homePhone', label: 'Home Phone' },
    { name: 'mobilePhone', label: 'Mobile Phone' },
    { name: 'address1', label: 'Address 1' },
    { name: 'address2', label: 'Address 2' },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State' },
    { name: 'zip', label: 'ZIP' },
    { name: 'zip4', label: 'ZIP+4' },
    { name: 'productName', label: 'Product Name' },
    { name: 'datePurchased', label: 'Date Purchased', type: 'date' },
    { name: 'paidAmount', label: 'Paid Amount', type: 'number' },
    { name: 'coveredWeeks', label: 'Covered Weeks', type: 'number' },
    { name: 'lastStateWorked', label: 'Last State Worked' }
  ];

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formFields.map((field) => {
          const fieldId = field.name as keyof MemberFormData;
          return (
            <div key={field.name} className="field">
              <span className="p-float-label">
                <Controller
                  name={fieldId}
                  control={control}
                  rules={{ required: field.required }}
                  render={({ field: { value, onChange }, fieldState }) => {
                    const hasError = !!fieldState.error;
                    if (field.type === 'date') {
                      return (
                        <Calendar
                          id={field.name}
                          value={value instanceof Date ? value : value ? new Date(value) : null}
                          onChange={(e) => onChange(e.value?.toISOString() || null)}
                          disabled={isSubmitting}
                          className={`w-full ${hasError ? 'p-invalid' : ''}`}
                        />
                      );
                    }
                    if (field.type === 'number') {
                      return (
                        <InputNumber
                          id={field.name}
                          value={typeof value === 'number' ? value : null}
                          onValueChange={(e) => onChange(e.value)}
                          disabled={isSubmitting}
                          className={`w-full ${hasError ? 'p-invalid' : ''}`}
                          mode="decimal"
                          minFractionDigits={0}
                          maxFractionDigits={2}
                        />
                      );
                    }
                    return (
                      <InputText
                        id={field.name}
                        value={typeof value === 'string' ? value : ''}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={isSubmitting}
                        className={`w-full ${hasError ? 'p-invalid' : ''}`}
                      />
                    );
                  }}
                />
                <label htmlFor={field.name} className={field.required ? 'required-field' : ''}>
                  {field.label}
                </label>
              </span>
              <Controller
                name={fieldId}
                control={control}
                render={({ fieldState }) => (
                  <>
                    {fieldState.error?.message && (
                      <small className="p-error">{fieldState.error.message}</small>
                    )}
                  </>
                )}
              />
            </div>
          );
        })}
      </div>
      {children}
    </form>
  );
}; 