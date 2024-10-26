import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Loader2, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { hubspotService } from '../../services/hubspot';

export const HubSpotIntegration = () => {
  const queryClient = useQueryClient();

  const { data: isAuthenticated, isLoading: checkingAuth } = useQuery(
    'hubspotAuth',
    hubspotService.getAuthStatus,
    { refetchInterval: 5000 }
  );

  const { data: contacts, isLoading: loadingContacts } = useQuery(
    'hubspotContacts',
    hubspotService.getContacts,
    { enabled: isAuthenticated }
  );

  const connectMutation = useMutation(hubspotService.initiateOAuth, {
    onSuccess: (authUrl) => {
      window.location.href = authUrl;
    }
  });

  const disconnectMutation = useMutation(hubspotService.disconnect, {
    onSuccess: () => {
      queryClient.invalidateQueries('hubspotAuth');
      queryClient.invalidateQueries('hubspotContacts');
    }
  });

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <button
          onClick={() => connectMutation.mutate()}
          disabled={connectMutation.isLoading}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/90 hover:text-teal-400 transition-all flex items-center justify-center gap-2"
        >
          {connectMutation.isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Connect HubSpot'
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm">Connected to HubSpot</span>
        </div>
        <button
          onClick={() => disconnectMutation.mutate()}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Disconnect
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-white/70" />
          <h3 className="text-sm font-medium text-white/90">Contacts</h3>
        </div>

        {loadingContacts ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
          </div>
        ) : contacts && contacts.length > 0 ? (
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 text-xs text-white/50 pb-2">
              <span>Name</span>
              <span>Email</span>
              <span>Company</span>
            </div>
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="grid grid-cols-3 gap-4 text-sm text-white/80 py-2 border-t border-white/5">
                  <span>{contact.firstname} {contact.lastname}</span>
                  <span>{contact.email}</span>
                  <span>{contact.company || '-'}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white/50 text-sm py-4">
            <AlertCircle className="w-4 h-4" />
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};