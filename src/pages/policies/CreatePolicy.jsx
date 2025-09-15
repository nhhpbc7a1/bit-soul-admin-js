import React, { useState } from 'react';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const CreatePolicy = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Legal',
    content: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    keywords: ''
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
    console.log('Creating policy:', formData);
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
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Policy</h1>
          <p className="text-gray-600 mt-1">Create a new policy document for the platform</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/policies">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Policies
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
                    rows={20}
                    className="form-input"
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
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title || 'Untitled Policy'}</h1>
                {formData.description && (
                  <p className="text-lg text-gray-600 mb-6">{formData.description}</p>
                )}
                <div className="prose max-w-none">
                  {formData.content ? (
                    <div className="whitespace-pre-wrap">{formData.content}</div>
                  ) : (
                    <p className="text-gray-400 italic">No content yet...</p>
                  )}
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
                  Save Policy
                </Button>
                
                {formData.status === 'draft' && (
                  <Button variant="success" className="w-full">
                    Save & Publish
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
                  <label className="text-sm font-medium text-gray-500">Word Count</label>
                  <p className="text-gray-900">
                    {formData.content.split(' ').filter(word => word.length > 0).length} words
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Version</label>
                  <p className="text-gray-900">1.0 (New)</p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="card bg-blue-50">
              <div className="p-6">
                <h4 className="font-medium text-blue-900 mb-2">Writing Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use clear, simple language</li>
                  <li>• Structure content with headings</li>
                  <li>• Include effective date</li>
                  <li>• Add contact information</li>
                  <li>• Review legal compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePolicy;
