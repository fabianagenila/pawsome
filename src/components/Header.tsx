import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PawPrint, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <PawPrint className="w-8 h-8 text-pink-500" />
          <h1 className="text-xl font-bold ml-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Pawsome
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="ml-2 font-medium">{user.username}</span>
            </div>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};