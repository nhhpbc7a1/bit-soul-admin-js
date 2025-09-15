import React, { useState } from 'react';
import { Palette, Plus, Search, Filter, Eye, Edit, Trash2, Image, FileText, Settings } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const UIContent = () => {
  const [activeTab, setActiveTab] = useState('banners');

  const stats = [
    {
      title: 'Active Banners',
      value: 12,
      change: { value: 2, type: 'increase' },
      icon: Image,
      color: 'primary'
    },
    {
      title: 'Static Pages',
      value: 8,
      change: { value: 1, type: 'increase' },
      icon: FileText,
      color: 'success'
    },
    {
      title: 'Content Updates',
      value: 24,
      change: { value: 8, type: 'increase' },
      icon: Edit,
      color: 'info'
    },
    {
      title: 'Media Files',
      value: 156,
      change: { value: 12, type: 'increase' },
      icon: Image,
      color: 'warning'
    }
  ];

  const tabs = [
    { id: 'banners', label: 'Banners', icon: Image },
    { id: 'pages', label: 'Static Pages', icon: FileText },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'footer', label: 'Footer', icon: Settings }
  ];

  const banners = [
    {
      id: 'banner-1',
      title: 'Welcome Hero Banner',
      type: 'hero',
      status: 'active',
      position: 'homepage-hero'
    },
    {
      id: 'banner-2',
      title: 'Premium Package Promotion',
      type: 'promotional',
      status: 'active',
      position: 'sidebar'
    },
    {
      id: 'banner-3',
      title: 'Holiday Sale Banner',
      type: 'seasonal',
      status: 'inactive',
      position: 'header'
    }
  ];

  const staticPages = [
    {
      id: 'about',
      title: 'About Us',
      slug: '/about',
      status: 'published',
      lastModified: '2024-01-10'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      slug: '/privacy',
      status: 'published',
      lastModified: '2024-01-08'
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      slug: '/terms',
      status: 'published',
      lastModified: '2024-01-08'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
      case 'published':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="danger">Inactive</Badge>;
      case 'scheduled':
        return <Badge variant="warning">Scheduled</Badge>;
      case 'draft':
        return <Badge variant="info">Draft</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'banners':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div key={banner.id} className="card card-hover">
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-xl flex items-center justify-center">
                  <Image className="w-12 h-12 text-primary-500" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{banner.title}</h3>
                    {getStatusBadge(banner.status)}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Type:</span>
                      <Badge variant="info">{banner.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Position:</span>
                      <span className="text-gray-900">{banner.position}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      <Eye size={14} />
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'pages':
        return (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Page Title</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Last Modified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staticPages.map((page) => (
                    <tr key={page.id} className="hover:bg-gray-50">
                      <td>
                        <span className="font-medium text-gray-900">{page.title}</span>
                      </td>
                      <td>
                        <span className="text-primary-600 font-mono text-sm">{page.slug}</span>
                      </td>
                      <td>{getStatusBadge(page.status)}</td>
                      <td className="text-gray-500">{page.lastModified}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button variant="primary" size="sm">
                            <Eye size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo & Brand Assets</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Upload primary logo</p>
                <Button variant="secondary" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg border border-gray-200"></div>
                    <input type="text" className="form-input flex-1" defaultValue="#f97316" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Company Name</label>
                <input type="text" className="form-input" defaultValue="BitSoul Technologies" />
              </div>
              <div>
                <label className="form-label">Copyright Text</label>
                <input type="text" className="form-input" defaultValue="© 2024 BitSoul. All rights reserved." />
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
          <h1 className="text-3xl font-bold text-gray-900">UI & Content Management</h1>
          <p className="text-gray-600 mt-1">Manage website content, banners, and branding</p>
        </div>
        <Button variant="primary">
          <Plus size={16} />
          Create Content
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Management Tabs */}
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

export default UIContent;

