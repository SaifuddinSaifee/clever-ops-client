export const integrations = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Connect your CRM data to analyze customer relationships and sales pipeline.',
    category: 'CRM',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available',
    isConnected: false
  },
  {
    id: 'attio',
    name: 'Attio',
    description: 'Modern CRM for cross-functional collaboration.',
    category: 'CRM',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'coming_soon'
  },
  {
    id: 'intercom',
    name: 'Intercom',
    description: 'Access customer conversations and support metrics.',
    category: 'Customer Service',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available',
    isConnected: true
  },
  {
    id: 'crisp',
    name: 'Crisp',
    description: 'Customer messaging and support platform.',
    category: 'Customer Service',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'coming_soon'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Analyze payment data, subscriptions, and revenue metrics.',
    category: 'Payments',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available',
    isConnected: true
  },
  {
    id: 'paddle',
    name: 'Paddle',
    description: 'Access payment processing and subscription analytics.',
    category: 'Payments',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Connect your email for communication analysis.',
    category: 'Calendar',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available'
  },
  {
    id: 'gcal',
    name: 'Google Calendar',
    description: 'Analyze meeting patterns and time management.',
    category: 'Calendar',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available'
  },
  {
    id: 'calendly',
    name: 'Calendly',
    description: 'Schedule and manage appointments efficiently.',
    category: 'Calendar',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'coming_soon'
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    description: 'Access product analytics and user behavior data.',
    category: 'Analytics',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Track development metrics and code analytics.',
    category: 'Product Management',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available'
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Access project management and issue tracking data.',
    category: 'Product Management',
    logo: 'https://images.unsplash.com/photo-1679692363620-d774a6cd92e9?w=50&h=50&fit=crop',
    status: 'available'
  }
] as const;