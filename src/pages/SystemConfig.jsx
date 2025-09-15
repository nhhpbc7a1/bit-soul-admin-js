import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Shield, Database, Bell } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState('general');

  const stats = [
    {
      title: 'System Uptime',
      value: '99.9%',
      change: { value: 0.1, type: 'increase' },
      icon: Shield,
      color: 'success'
    },
    {
      title: 'Active Configurations',
      value: 47,
      change: { value: 3, type: 'increase' },
      icon: Settings,
      color: 'primary'
    },
    {
      title: 'Database Size',
      value: '2.4GB',
      change: { value: 12, type: 'increase' },
      icon: Database,
      color: 'info'
    },
    {
      title: 'Last Backup',
      value: '2 hours ago',
      icon: Database,
      color: 'warning'
    }
  ];

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Site Name</label>
                <input type="text" className="form-input" defaultValue="BitSoul Admin" />
              </div>
              <div>
                <label className="form-label">Site URL</label>
                <input type="url" className="form-input" defaultValue="https://admin.bitsoul.com" />
              </div>
              <div>
                <label className="form-label">Admin Email</label>
                <input type="email" className="form-input" defaultValue="admin@bitsoul.com" />
              </div>
              <div>
                <label className="form-label">Timezone</label>
                <select className="form-input">
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                  <option>Asia/Tokyo</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Session Timeout (minutes)</label>
                <input type="number" className="form-input" defaultValue="30" />
              </div>
              <div>
                <label className="form-label">Max Login Attempts</label>
                <input type="number" className="form-input" defaultValue="5" />
              </div>
            </div>
          </div>
        );
      case 'database':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Database Host</label>
                <input type="text" className="form-input" defaultValue="localhost" />
              </div>
              <div>
                <label className="form-label">Database Port</label>
                <input type="number" className="form-input" defaultValue="5432" />
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">SMTP Host</label>
                <input type="text" className="form-input" defaultValue="smtp.gmail.com" />
              </div>
              <div>
                <label className="form-label">SMTP Port</label>
                <input type="number" className="form-input" defaultValue="587" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-gray-600 mt-1">Manage system settings and configurations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <RotateCcw size={16} />
            Reset to Defaults
          </Button>
          <Button variant="primary">
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Configuration Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;

