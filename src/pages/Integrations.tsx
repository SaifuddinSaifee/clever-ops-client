import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { IntegrationCard } from '../components/IntegrationCard';
import { integrations } from '../data/integrations';
import { Integration } from '../types';

const ITEMS_PER_PAGE = 6;

const groupedIntegrations = integrations.reduce((acc, integration) => {
  const category = integration.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(integration);
  return acc;
}, {} as Record<Integration['category'], Integration[]>);

export const Integrations = () => {
  const [selectedCategory, setSelectedCategory] = useState<Integration['category'] | 'All'>('All');

  const categories = ['All', ...Object.keys(groupedIntegrations)];
  
  const handleConnect = (id: string) => {
    console.log(`Connecting to ${id}`);
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
              Back to Chat
            </Link>
            <h1 className="text-2xl font-bold">Integrations</h1>
          </div>
          <Link
            to="/team"
            className="text-sm text-white/70 hover:text-teal-400 transition-colors"
          >
            Manage Team Access →
          </Link>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as Integration['category'] | 'All')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {selectedCategory === 'All' ? (
            Object.entries(groupedIntegrations).map(([category, items]) => (
              <section key={category}>
                <h2 className="text-xl font-semibold mb-6 text-white/90">
                  {category}
                  <span className="text-sm font-normal text-white/50 ml-2">
                    ({items.length} {items.length === 1 ? 'integration' : 'integrations'})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(integration => (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      onConnect={handleConnect}
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedIntegrations[selectedCategory as Integration['category']]?.map(integration => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConnect={handleConnect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};