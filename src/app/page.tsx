'use client';

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import SearchForm from '@/components/SearchForm';
import MemberTable from '@/components/MemberTable';
import EditMemberForm from '@/components/EditMemberForm';
import AddMemberForm from '@/components/AddMemberForm';

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

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all members when the component mounts
  useEffect(() => {
    loadAllMembers();
  }, []);

  const loadAllMembers = async () => {
    try {
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data);
      setError(null);
    } catch (error) {
      console.error('Error loading members:', error);
      setError('Failed to load members. Please try again.');
    }
  };

  const handleSearch = async (searchParams: { lastName?: string; email?: string; mobilePhone?: string }) => {
    try {
      const queryParams = new URLSearchParams();
      if (searchParams.lastName) queryParams.append('lastName', searchParams.lastName);
      if (searchParams.email) queryParams.append('email', searchParams.email);
      if (searchParams.mobilePhone) queryParams.append('mobilePhone', searchParams.mobilePhone);

      // If no search parameters are provided, load all members
      if (queryParams.toString() === '') {
        return loadAllMembers();
      }

      const response = await fetch(`/api/members?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data);
      setError(null);
    } catch (error) {
      console.error('Error searching members:', error);
      setError('Failed to search members. Please try again.');
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setIsAddingMember(false);
  };

  const handleSave = async (updatedMember: Member) => {
    try {
      const response = await fetch(`/api/members/${updatedMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMember),
      });

      if (!response.ok) throw new Error('Failed to update member');

      setMembers(prevMembers =>
        prevMembers.map(member =>
          member.id === updatedMember.id ? updatedMember : member
        )
      );
      setEditingMember(null);
      setError(null);
    } catch (error) {
      console.error('Error updating member:', error);
      setError('Failed to update member. Please try again.');
    }
  };

  const handleAdd = async (newMember: Omit<Member, 'id'>) => {
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) throw new Error('Failed to add member');

      const addedMember = await response.json();
      setMembers(prevMembers => [...prevMembers, addedMember]);
      setIsAddingMember(false);
      setError(null);
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Failed to add member. Please try again.');
    }
  };

  const handleDelete = async (memberId: number) => {
    try {
      const response = await fetch(`/api/members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete member');

      setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      setError(null);
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Failed to delete member. Please try again.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Class Action Lawsuit Member Management</h1>
      </div>

      {error && (
        <Message 
          severity="error" 
          text={error}
          className="mb-4 w-full"
        />
      )}

      <div className="mb-4 flex justify-end">
        <Button
          label="Add New Member"
          icon="pi pi-plus"
          severity="success"
          onClick={() => {
            setIsAddingMember(true);
            setEditingMember(null);
          }}
        />
      </div>

      <SearchForm onSearch={handleSearch} />

      {isAddingMember ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
          <AddMemberForm
            onSubmit={handleAdd}
            onCancel={() => setIsAddingMember(false)}
          />
        </div>
      ) : editingMember ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
          <EditMemberForm
            member={editingMember}
            onSave={handleSave}
            onCancel={() => setEditingMember(null)}
          />
        </div>
      ) : (
        <div>
          {members.length > 0 ? (
            <MemberTable 
              members={members} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No members found matching your search criteria.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
