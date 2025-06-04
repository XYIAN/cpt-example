'use client';

import { useState, useEffect } from 'react';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { BlockUI } from 'primereact/blockui';
import SearchForm from '@/components/forms/SearchForm';
import MemberTable from '@/components/members/MemberTable';
import { EditMemberForm } from '@/components/forms/EditMemberForm';
import { AddMemberForm } from '@/components/forms/AddMemberForm';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { Member } from '@/types/member';
import type { MemberFormData } from '@/types/member';

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVersionConflict, setShowVersionConflict] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingMember, setIsDeletingMember] = useState<number | null>(null);
  const toast = useToast();
  const { backgroundImage } = useTheme();

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

  const handleSave = async (formData: MemberFormData): Promise<void> => {
    if (!editingMember) return;
    setIsSubmitting(true);
    try {
      const updatedMember = {
        ...editingMember,
        ...formData
      };

      const response = await fetch(`/api/members/${editingMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMember),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          if ('currentVersion' in errorData) {
            setShowVersionConflict(true);
            return;
          } else {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdd = async (formData: MemberFormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add member');

      const addedMember = await response.json();
      setMembers(prevMembers => [...prevMembers, addedMember]);
      setError(null);
      setIsAddingMember(false);
      toast.showSuccess(
        'Member Added',
        `Successfully added ${addedMember.firstName} ${addedMember.lastName} to the system.`
      );
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Failed to add member. Please try again.');
      toast.showError('Add Failed', 'Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (memberId: number) => {
    setIsDeletingMember(memberId);
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
    } finally {
      setIsDeletingMember(null);
    }
  };

  const handleVersionConflict = () => {
    // Refresh the member data to get the latest version
    fetchMembers();
    setShowVersionConflict(false);
    setEditingMember(null);
  };

  const LoadingOverlay = () => (
    <div className="flex justify-center items-center p-4">
      <ProgressSpinner strokeWidth="4" style={{ width: '50px', height: '50px' }} />
    </div>
  );

  return (
    <div className="min-h-screen relative flex-1 pb-16">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.3)',
        }}
      />
      <BlockUI blocked={isLoading} template={<LoadingOverlay />}>
        <main className="container mx-auto px-2 py-4 relative z-10">
          <SearchForm 
            onSearch={handleSearch} 
            onAdd={() => setIsAddingMember(true)}
          />
          
          {error && (
            <Message severity="error" text={error} className="mb-4" />
          )}

          <MemberTable
            members={members}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingMemberId={isDeletingMember}
          />

          <AddMemberForm
            onSubmit={handleAdd}
            onCancel={() => setIsAddingMember(false)}
            isSubmitting={isSubmitting}
            visible={isAddingMember}
          />

          {editingMember && (
            <EditMemberForm
              member={editingMember}
              onSubmit={handleSave}
              onCancel={() => setEditingMember(null)}
              isSubmitting={isSubmitting}
              visible={true}
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
      </BlockUI>
    </div>
  );
}
