import { Team, UserRole } from '../types';

export const roleHierarchy: Record<UserRole, number> = {
  owner: 5,
  admin: 4,
  developer: 3,
  analytics: 2,
  marketing: 2,
  support: 1,
};

export const defaultAccessByRole: Record<UserRole, string[]> = {
  owner: ['all'],
  admin: ['all'],
  developer: ['github', 'jira', 'mixpanel'],
  support: ['intercom', 'crisp', 'hubspot'],
  marketing: ['hubspot', 'mixpanel', 'gmail'],
  analytics: ['mixpanel', 'stripe', 'paddle'],
};

export const mockTeam: Team = {
  id: 'team-1',
  name: 'Acme Corp',
  owner: 'user-1',
  members: [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@acme.com',
      role: 'owner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop',
      integrationAccess: { all: true }
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@acme.com',
      role: 'developer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop',
      integrationAccess: {
        github: true,
        jira: true,
        mixpanel: true
      }
    }
  ]
};