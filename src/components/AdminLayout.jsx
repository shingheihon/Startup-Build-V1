import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Users, Activity, Settings, Bell, User } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'All Clients', href: '/admin', icon: Users },
    { name: 'Platform Health', href: '/admin/platform-health', icon: Activity },
    { name: 'User Management', href: '/admin/user-management', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-warm-grey">
        <div className="flex items-center justify-between h-16 px-4 border-b border-warm-grey">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-sage-500" />
            <span className="text-xl font-bold text-charcoal">Admin Console</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                location.pathname === item.href
                  ? 'bg-sage-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-warm-grey">
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="text-lg font-semibold text-charcoal">Platform Administration</h1>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SH</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Shing Hei (Admin)</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;