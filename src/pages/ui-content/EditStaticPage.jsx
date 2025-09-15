import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, FileText, Globe, Settings, History, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const EditStaticPage = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState({
    id: id,
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    content: '',
    status: 'draft',
    showInMenu: false,
    menuOrder: 0,
    createdAt: '',
    lastModified: '',
    version: 1
  });

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

This is the content for the ${id} page. You can edit this content using HTML or Markdown.

## Section 1
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Section 2
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      status: 'published',
      showInMenu: true,
      menuOrder: id === 'about' ? 1 : id === 'privacy' ? 2 : 3,
      createdAt: '2024-01-08T10:00:00Z',
      lastModified: '2024-01-10T15:30:00Z',
      version: 3
    };
    setPageData(mockData);
  }, [id]);

  const handleInputChange = (field, value) => {
    setPageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (status = pageData.status) => {
    const dataToSave = {
      ...pageData,
      status,
      lastModified: new Date().toISOString(),
      version: pageData.version + 1
    };
    console.log('Updating page:', dataToSave);
    // Here you would typically make an API call
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      console.log('Deleting page:', id);
      // Here you would typically make an API call
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Page: {pageData.title}</h1>
            <p className="text-gray-600 mt-1">Last modified: {new Date(pageData.lastModified).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to={`/ui-content/pages/${id}/history`}>
            <Button variant="ghost">
              <History size={16} />
              Version History
            </Button>
          </Link>
          <Button variant="secondary" onClick={() => handleSave()}>
            <Save size={16} />
            Save Changes
          </Button>
          <Button variant="primary" onClick={() => handleSave('published')}>
            <Globe size={16} />
            {pageData.status === 'published' ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="form-label">Page Title *</label>
                <input
                  type="text"
                  className="form-input"
                  value={pageData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter page title..."
                />
              </div>
              
              <div>
                <label className="form-label">URL Slug *</label>
                <input
                  type="text"
                  className="form-input"
                  value={pageData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="/page-url"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be the page URL: yoursite.com{pageData.slug}
                </p>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Page Content</h3>
                <Badge variant="info">Version {pageData.version}</Badge>
              </div>
            </div>
            <div className="p-6">
              <div>
                <label className="form-label">Content *</label>
                <textarea
                  className="form-input min-h-[400px]"
                  value={pageData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Enter page content using HTML or Markdown..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can use HTML tags and Markdown syntax
                </p>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="form-label">Meta Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={pageData.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  placeholder="SEO title for search engines..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {pageData.metaTitle.length}/60 characters (recommended)
                </p>
              </div>
              
              <div>
                <label className="form-label">Meta Description</label>
                <textarea
                  className="form-input"
                  rows="3"
                  value={pageData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="Brief description for search engines..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {pageData.metaDescription.length}/160 characters (recommended)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Publish Settings</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="form-label">Status</label>
                <select
                  className="form-input"
                  value={pageData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="private">Private</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="form-label mb-0">Show in Navigation Menu</label>
                <input
                  type="checkbox"
                  checked={pageData.showInMenu}
                  onChange={(e) => handleInputChange('showInMenu', e.target.checked)}
                  className="rounded border-gray-300"
                />
              </div>
              
              {pageData.showInMenu && (
                <div>
                  <label className="form-label">Menu Order</label>
                  <input
                    type="number"
                    className="form-input"
                    value={pageData.menuOrder}
                    onChange={(e) => handleInputChange('menuOrder', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <Button variant="secondary" className="w-full">
                <Eye size={16} />
                Preview Page
              </Button>
              
              <Link to={`/ui-content/pages/${id}`} className="block">
                <Button variant="ghost" className="w-full">
                  <FileText size={16} />
                  View Page Details
                </Button>
              </Link>
              
              <Link to={`/ui-content/pages/${id}/history`} className="block">
                <Button variant="ghost" className="w-full">
                  <History size={16} />
                  View All Versions
                </Button>
              </Link>
            </div>
          </div>

          {/* Page Info */}
          <div className="card bg-gray-50">
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-3">Page Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <Badge variant={pageData.status === 'published' ? 'success' : 'info'}>
                    {pageData.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="text-gray-900">
                    {new Date(pageData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Version:</span>
                  <span className="text-gray-900">{pageData.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Word Count:</span>
                  <span className="text-gray-900">
                    {pageData.content.split(/\s+/).filter(word => word.length > 0).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card border-red-200 bg-red-50">
            <div className="p-6">
              <h4 className="font-medium text-red-900 mb-3">Danger Zone</h4>
              <Button variant="danger" className="w-full" onClick={handleDelete}>
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

export default EditStaticPage;
