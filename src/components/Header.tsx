import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { UserMenu } from './UserMenu';

export const Header = () => (
  <header className="fixed top-0 w-full z-10 bg-black/10 backdrop-blur-xl border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <MessageSquare className="w-6 h-6 text-teal-600" />
        <span className="text-lg font-medium text-white-900">CleverOps</span>
      </div>
      <div className="flex items-center gap-6">
        <Link 
          to="/integrations" 
          className="text-gray-500 hover:text-teal-600 transition-colors text-sm"
        >
          Integrations
        </Link>
        <UserMenu />
      </div>
    </div>
  </header>
);