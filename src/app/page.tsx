'use client';

import { useState, useEffect } from 'react';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmDialog } from 'primereact/confirmdialog';
import SearchForm from '@/components/SearchForm';
import MemberTable from '@/components/MemberTable';
import EditMemberForm from '@/components/EditMemberForm';
import AddMemberForm from '@/components/AddMemberForm';
import { useToast } from '@/contexts/ToastContext';
import type { Member } from '@/types/member';

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVersionConflict, setShowVersionConflict] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const toast = useToast();

  // Load all members when the component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/members');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch members');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }
      setMembers(data);
      setError(null);
      if (data.length === 0) {
        toast.showInfo('No Members', 'No members found in the database.');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to fetch members. Please try again.');
      toast.showError('Failed to fetch members', 'Please try again later.');
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
  };

  const handleSave = async (updatedMember: Member) => {
    try {
      console.log('Sending to API:', updatedMember);
      const response = await fetch(`/api/members/${updatedMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMember),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('API error response:', errorData);
        
        if (response.status === 409) {
          if ('currentVersion' in errorData) {
            // Version conflict
            setShowVersionConflict(true);
            return;
          } else {
            // Record is locked
            toast.showError('Edit Failed', 'This record is currently being edited by another user. Please try again later.');
            return;
          }
        }
        throw new Error('Failed to update member');
      }

      const savedMember = await response.json();
      setMembers(prevMembers =>
        prevMembers.map(member =>
          member.id === savedMember.id ? savedMember : member
        )
      );
      setEditingMember(null);
      setError(null);
      toast.showSuccess(
        'Member Updated',
        `Successfully updated ${savedMember.firstName} ${savedMember.lastName}.`
      );
    } catch (error) {
      console.error('Error updating member:', error);
      setError('Failed to update member. Please try again.');
      toast.showError('Update Failed', 'Please try again later.');
    }
  };

  const handleAdd = async (newMember: Omit<Member, 'id' | 'isLocked' | 'lastModifiedBy' | 'createdAt' | 'updatedAt'>) => {
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

      if (!response.ok) {
        if (response.status === 409) {
          toast.showError('Delete Failed', 'This record is currently being edited by another user. Please try again later.');
          return;
        }
        throw new Error('Failed to delete member');
      }

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

  const handleVersionConflict = () => {
    // Refresh the member data to get the latest version
    fetchMembers();
    setShowVersionConflict(false);
    setEditingMember(null);
  };

  return (
    <main className="container mx-auto px-2 py-8">
      <SearchForm 
        onSearch={handleSearch} 
        onAdd={() => setIsAddingMember(true)}
      />
      
      {error && (
        <Message severity="error" text={error} className="mb-4" />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <ProgressSpinner />
        </div>
      ) : (
        <MemberTable
          members={members}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <AddMemberForm
        onSubmit={(member) => {
          handleAdd(member);
          setIsAddingMember(false);
        }}
        onCancel={() => setIsAddingMember(false)}
        visible={isAddingMember}
      />

      {editingMember && (
        <EditMemberForm
          member={editingMember}
          onSave={handleSave}
          onCancel={() => setEditingMember(null)}
          visible={!!editingMember}
        />
      )}

      <ConfirmDialog
        visible={showVersionConflict}
        onHide={() => setShowVersionConflict(false)}
        message="This record has been modified by another user. Would you like to refresh and get the latest version?"
        header="Version Conflict Detected"
        icon="pi pi-exclamation-triangle"
        accept={handleVersionConflict}
        reject={() => setShowVersionConflict(false)}
      />
    </main>
  );
}
