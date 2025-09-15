import React, { useState } from 'react';
import { ArrowLeft, Image, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentCategory: '',
    status: 'active',
    sortOrder: 0,
    metaTitle: '',
    metaDescription: '',
    keywords: ''
  });

  const [categoryIcon, setCategoryIcon] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCategoryIcon(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating category:', formData);
    // Handle form submission
  };

  const parentCategories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Home & Garden' },
    { id: '4', name: 'Sports & Outdoors' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Category</h1>
          <p className="text-gray-600 mt-1">Add a new product category to organize your inventory</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/categories">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Category Icon & Status */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Icon</h3>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                        {categoryIcon ? (
                          <img src={categoryIcon} alt="Category Icon" className="w-full h-full object-cover" />
                        ) : (
                          <Image className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Click to upload category icon</p>
                    <p className="text-xs text-gray-400">PNG, JPG, SVG up to 2MB</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Status *</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Parent Category</label>
                      <select
                        name="parentCategory"
                        value={formData.parentCategory}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">None (Top Level)</option>
                        {parentCategories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Sort Order</label>
                      <input
                        type="number"
                        name="sortOrder"
                        value={formData.sortOrder}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="0"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="form-label">Category Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter category name"
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label">URL Slug *</label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="category-url-slug"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Auto-generated from name, but you can customize it</p>
                    </div>

                    <div>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="form-input"
                        rows={4}
                        placeholder="Describe this category and what products it contains..."
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="form-label">Meta Title</label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="SEO title for this category"
                        maxLength="60"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.metaTitle.length}/60 characters
                      </p>
                    </div>

                    <div>
                      <label className="form-label">Meta Description</label>
                      <textarea
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleInputChange}
                        className="form-input"
                        rows={3}
                        placeholder="SEO description for this category"
                        maxLength="160"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.metaDescription.length}/160 characters
                      </p>
                    </div>

                    <div>
                      <label className="form-label">Keywords</label>
                      <input
                        type="text"
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Separate keywords with commas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <Link to="/categories">
              <Button variant="secondary">
                <X size={16} />
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="primary">
              <Save size={16} />
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;

