import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, History, Archive } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const EditPolicy = () => {
  const { id } = useParams();
  
  // Mock policy data - in real app, fetch based on ID
  const [formData, setFormData] = useState({
    id: id || '1',
    title: 'Terms of Service',
    description: 'Platform terms and conditions for all users',
    category: 'Legal',
    content: `# Terms of Service

## 1. Introduction

Welcome to our platform. By using our services, you agree to these terms.

## 2. User Accounts

Users must provide accurate information when creating accounts.

## 3. Prohibited Activities

The following activities are strictly prohibited:
- Spam or unsolicited communications
- Illegal activities
- Harassment of other users

## 4. Intellectual Property

All content on this platform is protected by copyright laws.

## 5. Termination

We reserve the right to terminate accounts for violations.

## 6. Contact Information

For questions about these terms, contact us at legal@platform.com

**Effective Date:** January 1, 2024
**Last Updated:** January 10, 2024`,
    status: 'published',
    version: '2.1',
    metaTitle: 'Terms of Service - Platform Name',
    metaDescription: 'Read our terms of service to understand your rights and responsibilities.',
    keywords: 'terms, service, legal, agreement',
    createdAt: '2023-06-15',
    lastUpdated: '2024-01-10',
    publishedAt: '2024-01-10'
  });

  const [isPreview, setIsPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating policy:', formData);
    // Handle form submission
  };

  const categories = [
    'Legal',
    'Business', 
    'Customer Service',
    'Community',
    'Technical',
    'Privacy'
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Published</Badge>;
      case 'draft':
        return <Badge variant="warning">Draft</Badge>;
      case 'review':
        return <Badge variant="info">Under Review</Badge>;
      case 'archived':
        return <Badge variant="neutral">Archived</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Policy</h1>
          <p className="text-gray-600 mt-1">Editing: {formData.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/policies">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Policies
            </Button>
          </Link>
          <Link to={`/policies/${id}/history`}>
            <Button variant="secondary">
              <History size={16} />
              Version History
            </Button>
          </Link>
          <Button 
            variant="secondary"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye size={16} />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {!isPreview ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter policy title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="form-input"
                      placeholder="Brief description of the policy"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="draft">Draft</option>
                        <option value="review">Under Review</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Content */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Policy Content</h3>
                </div>
                <div className="p-6">
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={25}
                    className="form-input font-mono text-sm"
                    placeholder="Enter the full policy content here..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Word count: {formData.content.split(' ').filter(word => word.length > 0).length}
                  </p>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="SEO title for search engines"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleChange}
                      rows={3}
                      className="form-input"
                      placeholder="Brief description for search engines"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* Preview Mode */
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                  {getStatusBadge(formData.status)}
                </div>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap">{formData.content}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Actions */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={handleSubmit}
                  type="submit"
                >
                  <Save size={16} />
                  Update Policy
                </Button>
                
                {formData.status === 'draft' && (
                  <Button variant="success" className="w-full">
                    Save & Publish
                  </Button>
                )}
                
                {formData.status === 'published' && (
                  <Button variant="warning" className="w-full">
                    <Archive size={16} />
                    Archive Policy
                  </Button>
                )}
                
                <Button variant="secondary" className="w-full">
                  Save as Draft
                </Button>
              </div>
            </div>

            {/* Policy Info */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Policy Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900">{formData.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">{getStatusBadge(formData.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Version</label>
                  <p className="text-gray-900">v{formData.version}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Word Count</label>
                  <p className="text-gray-900">
                    {formData.content.split(' ').filter(word => word.length > 0).length} words
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="text-gray-900">{formData.createdAt}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="text-gray-900">{formData.lastUpdated}</p>
                </div>
                {formData.publishedAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Published</label>
                    <p className="text-gray-900">{formData.publishedAt}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Change Log */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Changes</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">v2.1 - Updated terms</p>
                    <p className="text-gray-500">Jan 10, 2024</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">v2.0 - Major revision</p>
                    <p className="text-gray-500">Dec 15, 2023</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">v1.5 - Minor updates</p>
                    <p className="text-gray-500">Nov 20, 2023</p>
                  </div>
                </div>
                <Link to={`/policies/${id}/history`}>
                  <Button variant="secondary" size="sm" className="w-full mt-4">
                    <History size={14} />
                    View Full History
                  </Button>
                </Link>
              </div>
            </div>

            {/* Warning */}
            {formData.status === 'published' && (
              <div className="card bg-yellow-50 border-yellow-200">
                <div className="p-6">
                  <h4 className="font-medium text-yellow-900 mb-2">⚠️ Published Policy</h4>
                  <p className="text-sm text-yellow-800">
                    This policy is currently live. Changes will affect all users immediately upon saving.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPolicy;
