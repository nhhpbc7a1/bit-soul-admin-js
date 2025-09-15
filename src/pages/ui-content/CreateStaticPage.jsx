import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, FileText, Globe, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const CreateStaticPage = () => {
  const [pageData, setPageData] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    content: '',
    status: 'draft',
    showInMenu: false,
    menuOrder: 0
  });

  const handleInputChange = (field, value) => {
    setPageData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-generate slug from title
    if (field === 'title' && !pageData.slug) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setPageData(prev => ({
        ...prev,
        slug: `/${slug}`
      }));
    }
  };

  const handleSave = (status = 'draft') => {
    const dataToSave = {
      ...pageData,
      status,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    console.log('Saving page:', dataToSave);
    // Here you would typically make an API call
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
            <h1 className="text-3xl font-bold text-gray-900">Create Static Page</h1>
            <p className="text-gray-600 mt-1">Create new static page content</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => handleSave('draft')}>
            <Save size={16} />
            Save Draft
          </Button>
          <Button variant="primary" onClick={() => handleSave('published')}>
            <Globe size={16} />
            Publish
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
              <h3 className="text-lg font-semibold text-gray-900">Page Content</h3>
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

          {/* Preview */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            </div>
            <div className="p-6">
              <Button variant="secondary" className="w-full">
                <Eye size={16} />
                Preview Page
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Preview how this page will look to visitors
              </p>
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
                  <span className="text-gray-500">Word Count:</span>
                  <span className="text-gray-900">
                    {pageData.content.split(/\s+/).filter(word => word.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Character Count:</span>
                  <span className="text-gray-900">{pageData.content.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStaticPage;
