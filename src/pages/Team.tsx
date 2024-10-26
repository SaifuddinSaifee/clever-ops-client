import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserPlus, Shield, Pencil, Trash2, Check, X, Users } from 'lucide-react';
import { mockTeam, roleHierarchy, defaultAccessByRole } from '../data/teams';
import { TeamMember, UserRole, Integration } from '../types';
import { integrations } from '../data/integrations';

const roleLabels: Record<UserRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  developer: 'Developer',
  support: 'Support',
  marketing: 'Marketing',
  analytics: 'Analytics',
};

const roleColors: Record<UserRole, string> = {
  owner: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  admin: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  developer: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  support: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  marketing: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  analytics: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export const Team = () => {
  const [team] = useState(mockTeam);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [editingRole, setEditingRole] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    if (!selectedMember) return;
    
    // Update member's role and access based on new role
    const updatedMember = {
      ...selectedMember,
      role,
      integrationAccess: defaultAccessByRole[role].reduce((acc, integration) => ({
        ...acc,
        [integration]: true
      }), {})
    };
    
    setSelectedMember(updatedMember);
    setEditingRole(false);
  };

  const handleAccessToggle = (integrationId: string) => {
    if (!selectedMember) return;
    
    setSelectedMember({
      ...selectedMember,
      integrationAccess: {
        ...selectedMember.integrationAccess,
        [integrationId]: !selectedMember.integrationAccess[integrationId]
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-white/70 hover:text-teal-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold">Team Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/integrations"
              className="text-sm text-white/70 hover:text-teal-400 transition-colors"
            >
              Manage Integrations →
            </Link>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg border border-teal-500/30 hover:bg-teal-500/30 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Invite Member
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-medium text-white/90">Team Members</h2>
              </div>
              <div className="divide-y divide-white/10">
                {team.members.map(member => (
                  <div
                    key={member.id}
                    className={`px-6 py-4 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors ${
                      selectedMember?.id === member.id ? 'bg-white/5' : ''
                    }`}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full border-2 border-white/10"
                      />
                      <div>
                        <h3 className="font-medium text-white/90 flex items-center gap-2">
                          {member.name}
                          {member.role === 'owner' && (
                            <Shield className="w-4 h-4 text-purple-400" />
                          )}
                        </h3>
                        <p className="text-sm text-white/50">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs border ${roleColors[member.role]}`}>
                        {roleLabels[member.role]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl">
            {selectedMember ? (
              <>
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedMember.avatar}
                        alt={selectedMember.name}
                        className="w-12 h-12 rounded-full border-2 border-white/10"
                      />
                      <div>
                        <h3 className="font-medium text-white/90">{selectedMember.name}</h3>
                        <p className="text-sm text-white/50">{selectedMember.email}</p>
                      </div>
                    </div>
                    <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white/70">Role</label>
                      {editingRole ? (
                        <div className="flex items-center gap-2 mt-2">
                          <select
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90 focus:outline-none focus:border-teal-500/50"
                            value={selectedMember.role}
                            onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                          >
                            {Object.entries(roleLabels).map(([role, label]) => (
                              <option key={role} value={role}>{label}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => setEditingRole(false)}
                            className="p-2 text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingRole(false)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="flex items-center justify-between mt-2 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                          onClick={() => setEditingRole(true)}
                        >
                          <span className={`px-3 py-1 rounded-full text-xs border ${roleColors[selectedMember.role]}`}>
                            {roleLabels[selectedMember.role]}
                          </span>
                          <Pencil className="w-4 h-4 text-white/30" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-sm font-medium text-white/70 mb-4">Integration Access</h4>
                  <div className="space-y-3">
                    {integrations.map(integration => (
                      <div
                        key={integration.id}
                        className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={integration.logo}
                            alt={`${integration.name} logo`}
                            className="w-6 h-6 rounded-lg"
                          />
                          <span className="text-sm text-white/90">{integration.name}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedMember.integrationAccess[integration.id] || false}
                            onChange={() => handleAccessToggle(integration.id)}
                            disabled={integration.status === 'coming_soon'}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white/10 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500/50"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/50">Select a team member to manage their access</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Invite Team Member</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white/70">Email</label>
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 focus:outline-none focus:border-teal-500/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/70">Role</label>
                <select className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 focus:outline-none focus:border-teal-500/50">
                  {Object.entries(roleLabels).map(([role, label]) => (
                    <option key={role} value={role}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 text-white/70 hover:text-white/90 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all">
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};