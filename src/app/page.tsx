'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { useEasterEgg } from '@/contexts/EasterEggContext';
import type { SerializedMember, MemberFormData } from '@/types/member';

export default function Home() {
  const [members, setMembers] = useState<SerializedMember[]>([]);
  const [editingMember, setEditingMember] = useState<SerializedMember | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVersionConflict, setShowVersionConflict] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingMember, setIsDeletingMember] = useState<number | null>(null);
  const toast = useToast();
  const { backgroundImage } = useTheme();
  const { triggerPartyMode } = useEasterEgg();

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to load members. Please try again.');
      toast.showError('Load Failed', 'Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Load all members when the component mounts
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleSearch = async (searchParams: URLSearchParams) => {
    setIsLoading(true);
    try {
      // Check for Easter egg trigger conditions
      const lastName = searchParams.get('lastName');
      const email = searchParams.get('email');
      const mobilePhone = searchParams.get('mobilePhone');
      
      // Debug logging
      console.log('Easter egg check:', { lastName, email, mobilePhone });
      
      // More flexible matching for the Easter egg
      const isLastNameMatch = lastName?.toLowerCase().trim() === 'cpt';
      const isEmailMatch = email?.toLowerCase().trim() === 'cpt@cpt.com';
      const isPhoneMatch = mobilePhone?.trim() === '2782782' || mobilePhone?.trim() === '2782782782';
      
      if (isLastNameMatch && isEmailMatch && isPhoneMatch) {
        console.log('🎉 Easter egg triggered!');
        triggerPartyMode();
      }

      const response = await fetch(`/api/members/search?${searchParams}`);
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

  const handleEdit = (member: SerializedMember) => {
    setEditingMember(member);
  };

  const handleSave = async (formData: MemberFormData): Promise<void> => {
    if (!editingMember) return;
    console.log('handleSave called with formData:', formData);
    setIsSubmitting(true);
    try {
      const updatedMember = {
        ...editingMember,
        ...formData
      };
      console.log('Sending updated member to API:', updatedMember);

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
      
      // Refresh the member list to ensure proper sorting and display
      await fetchMembers();
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
