import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Users, LogOut } from 'lucide-react';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
      >
        <User className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-gray-200 shadow-lg z-50">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john@acme.com</p>
          </div>
          <div className="p-2">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Edit Profile
            </Link>
            <Link
              to="/team"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Users className="w-4 h-4" />
              Manage Team
            </Link>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};