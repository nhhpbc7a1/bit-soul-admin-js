import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Eye, History, Globe, FileText, Settings, Calendar, User, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const StaticPageDetail = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState(null);
  const [activeTab, setActiveTab] = useState('content');

  // Mock data loading
  useEffect(() => {
    // Simulate API call to load page data
    const mockData = {
      id: id,
      title: id === 'about' ? 'About Us' : id === 'privacy' ? 'Privacy Policy' : 'Terms of Service',
      slug: `/${id}`,
      metaTitle: id === 'about' ? 'About Our Company' : id === 'privacy' ? 'Privacy Policy' : 'Terms of Service',
      metaDescription: id === 'about' ? 'Learn about our company mission and values' : id === 'privacy' ? 'Our privacy policy and data protection' : 'Terms and conditions of service',
      content: `# ${id === 'about' ? 'About Us' : id === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}

This is the content for the ${id} page. This content is displayed to visitors on the website.

## Our Mission
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Our Values
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Contact Information
- Email: contact@bitsoul.com
- Phone: +1 (555) 123-4567
- Address: 123 Business St, City, State 12345`,
      status: 'published',
      showInMenu: true,
      menuOrder: id === 'about' ? 1 : id === 'privacy' ? 2 : 3,
      createdAt: '2024-01-08T10:00:00Z',
      lastModified: '2024-01-10T15:30:00Z',
      createdBy: 'Admin User',
      lastModifiedBy: 'Admin User',
      version: 3,
      views: Math.floor(Math.random() * 1000) + 100,
      seoScore: Math.floor(Math.random() * 30) + 70
    };
    setPageData(mockData);
  }, [id]);

  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page details...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'seo', label: 'SEO', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: Globe }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return (
          <div className="space-y-6">
            {/* Content Preview */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Page Content</h3>
                <p className="text-sm text-gray-600 mt-1">How this page appears to visitors</p>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-900">
                    {pageData.content}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Settings */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Navigation Settings</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Show in Menu:</span>
                    <Badge variant={pageData.showInMenu ? 'success' : 'neutral'}>
                      {pageData.showInMenu ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  {pageData.showInMenu && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Menu Order:</span>
                      <span className="font-medium text-gray-900">{pageData.menuOrder}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            {/* SEO Overview */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">SEO Overview</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">SEO Score:</span>
                    <Badge variant={pageData.seoScore >= 80 ? 'success' : pageData.seoScore >= 60 ? 'warning' : 'danger'}>
                      {pageData.seoScore}/100
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Meta Title</h4>
                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                      {pageData.metaTitle || 'No meta title set'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {pageData.metaTitle?.length || 0}/60 characters
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Meta Description</h4>
                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                      {pageData.metaDescription || 'No meta description set'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {pageData.metaDescription?.length || 0}/160 characters
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* URL Information */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">URL Information</h3>
              </div>
              <div className="p-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Page URL</h4>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono flex-1">
                      https://yoursite.com{pageData.slug}
                    </code>
                    <Button variant="ghost" size="sm">
                      <Eye size={14} />
                      Visit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Page Statistics */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Page Statistics</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{pageData.views}</div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{pageData.version}</div>
                    <div className="text-sm text-gray-600">Current Version</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {pageData.content.split(/\s+/).filter(word => word.length > 0).length}
                    </div>
                    <div className="text-sm text-gray-600">Word Count</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Analysis */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Content Analysis</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Reading Time:</span>
                    <span className="font-medium text-gray-900">
                      {Math.ceil(pageData.content.split(/\s+/).length / 200)} min read
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Character Count:</span>
                    <span className="font-medium text-gray-900">{pageData.content.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Last Updated:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(pageData.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
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
        <div className="flex items-center gap-4">
          <Link to="/ui-content">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageData.title}</h1>
            <div className="flex items-center gap-4 mt-1">
              <Badge variant={pageData.status === 'published' ? 'success' : 'info'}>
                {pageData.status}
              </Badge>
              <span className="text-gray-600 text-sm">
                Created: {new Date(pageData.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <Eye size={16} />
            Preview
          </Button>
          <Link to={`/ui-content/pages/${id}/history`}>
            <Button variant="secondary">
              <History size={16} />
              History
            </Button>
          </Link>
          <Link to={`/ui-content/pages/${id}/edit`}>
            <Button variant="primary">
              <Edit size={16} />
              Edit Page
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <Link to={`/ui-content/pages/${id}/edit`} className="block">
                <Button variant="primary" className="w-full">
                  <Edit size={16} />
                  Edit Page
                </Button>
              </Link>
              
              <Button variant="secondary" className="w-full">
                <Eye size={16} />
                Preview Page
              </Button>
              
              <Link to={`/ui-content/pages/${id}/history`} className="block">
                <Button variant="ghost" className="w-full">
                  <History size={16} />
                  View History
                </Button>
              </Link>
            </div>
          </div>

          {/* Page Information */}
          <div className="card bg-gray-50">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Page Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium text-gray-900">
                    {new Date(pageData.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Created By</p>
                  <p className="font-medium text-gray-900">{pageData.createdBy}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Last Modified</p>
                  <p className="font-medium text-gray-900">
                    {new Date(pageData.lastModified).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Last Modified By</p>
                  <p className="font-medium text-gray-900">{pageData.lastModifiedBy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card border-red-200 bg-red-50">
            <div className="p-6">
              <h4 className="font-medium text-red-900 mb-3">Danger Zone</h4>
              <Button variant="danger" className="w-full">
                <Trash2 size={16} />
                Delete Page
              </Button>
              <p className="text-xs text-red-600 mt-2 text-center">
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPageDetail;
