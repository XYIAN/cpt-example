'use client';

import { useState, useEffect } from 'react';
import { Message } from 'primereact/message';
import SearchForm from '@/components/SearchForm';
import MemberTable from '@/components/MemberTable';
import EditMemberForm from '@/components/EditMemberForm';
import AddMemberForm from '@/components/AddMemberForm';
import { useToast } from '@/contexts/ToastContext';

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
  const toast = useToast();

  // Load all members when the component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to fetch members. Please try again.');
      toast.showError('Failed to fetch members', 'Please try again later.');
    }
  };

  const handleSearch = async (params: {
    lastName?: string;
    email?: string;
    mobilePhone?: string;
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
  }) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add all non-empty params to the query string
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/members/search?${queryParams}`);
      if (!response.ok) throw new Error('Failed to search members');
      const data = await response.json();
      setMembers(data);
      setError(null);

      if (data.length === 0) {
        toast.showInfo('No Results', 'No members found matching your search criteria.');
      } else {
        toast.showSuccess('Search Results', `Found ${data.length} member${data.length === 1 ? '' : 's'}.`);
      }
    } catch (error) {
      console.error('Error searching members:', error);
      setError('Failed to search members. Please try again.');
      toast.showError('Search Failed', 'Please try again later.');
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
      toast.showSuccess(
        'Member Updated',
        `Successfully updated ${updatedMember.firstName} ${updatedMember.lastName}.`
      );
    } catch (error) {
      console.error('Error updating member:', error);
      setError('Failed to update member. Please try again.');
      toast.showError('Update Failed', 'Please try again later.');
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
      toast.showInfo(
        'Member Added',
        `Successfully added ${addedMember.firstName} ${addedMember.lastName} to the system.`
      );
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Failed to add member. Please try again.');
      toast.showError('Add Failed', 'Please try again later.');
    }
  };

  const handleDelete = async (memberId: number) => {
    try {
      const memberToDelete = members.find(m => m.id === memberId);
      const response = await fetch(`/api/members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete member');

      setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      setError(null);
      if (memberToDelete) {
        toast.showSuccess(
          'Member Deleted',
          `Successfully removed ${memberToDelete.firstName} ${memberToDelete.lastName} from the system.`
        );
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Failed to delete member. Please try again.');
      toast.showError('Delete Failed', 'Please try again later.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {error && (
        <Message 
          severity="error" 
          text={error}
          className="mb-4 w-full"
        />
      )}

      <SearchForm 
        onSearch={handleSearch} 
        onAddMember={() => {
          setIsAddingMember(true);
          setEditingMember(null);
        }}
      />

      {isAddingMember ? (
        <div className="mb-8">
          <AddMemberForm
            onSubmit={handleAdd}
            onCancel={() => setIsAddingMember(false)}
          />
        </div>
      ) : editingMember ? (
        <div className="mb-8">
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
