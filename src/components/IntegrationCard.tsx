import React from 'react';
import { Integration } from '../types';
import { CheckCircle2, Clock } from 'lucide-react';
import { HubSpotIntegration } from './integrations/HubSpotIntegration';

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (id: string) => void;
}

export const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const renderIntegrationContent = () => {
    switch (integration.id) {
      case 'hubspot':
        return <HubSpotIntegration />;
      default:
        return integration.status === 'available' && !integration.isConnected && (
          <button
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/90 hover:text-teal-400 transition-all"
          >
            Connect
          </button>
        );
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-teal-500/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={integration.logo}
            alt={`${integration.name} logo`}
            className="w-10 h-10 rounded-lg"
          />
          <div>
            <h3 className="text-lg font-medium text-white/90">{integration.name}</h3>
            <p className="text-sm text-white/50">{integration.category}</p>
          </div>
        </div>
        {integration.status === 'coming_soon' && (
          <span className="flex items-center gap-1.5 text-xs text-white/40">
            <Clock className="w-4 h-4" />
            Coming Soon
          </span>
        )}
      </div>
      <p className="text-sm text-white/70 mb-4">{integration.description}</p>
      {renderIntegrationContent()}
    </div>
  );
};