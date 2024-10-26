export interface Message {
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'CRM' | 'Customer Service' | 'Payments' | 'Calendar' | 'Analytics' | 'Product Management';
  logo: string;
  status: 'available' | 'coming_soon';
  isConnected?: boolean;
}

export type UserRole = 'owner' | 'admin' | 'developer' | 'support' | 'marketing' | 'analytics';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface TeamMember extends User {
  integrationAccess: {
    [key: string]: boolean;
  };
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  owner: string;
}