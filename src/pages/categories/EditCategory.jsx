import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Upload,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    type: 'parent',
    parentId: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    sortOrder: 1,
    isVisible: true,
    allowSubcategories: true,
    image: null
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Mock data - in real app, this would come from API
  const category = {
    id: id,
    name: 'Electronics',
    description: 'Electronic products, technology and digital devices',
    status: 'active',
    type: 'parent',
    parentId: null,
    slug: 'electronics',
    seoTitle: 'Electronics - Latest Technology & Digital Devices',
    seoDescription: 'Discover our wide range of electronic products including smartphones, laptops, home appliances and more.',
    sortOrder: 1,
    isVisible: true,
    allowSubcategories: true,
    image: null
  };

  const parentCategories = [
    { id: '', name: 'No Parent (Root Category)' },
    { id: '2', name: 'Consumer Goods' },
    { id: '3', name: 'Office Supplies' },
    { id: '4', name: 'Furniture' },
    { id: '5', name: 'Fashion' }
  ];

  useEffect(() => {
    // Load category data
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      type: category.type,
      parentId: category.parentId || '',
      slug: category.slug,
      seoTitle: category.seoTitle,
      seoDescription: category.seoDescription,
      sortOrder: category.sortOrder,
      isVisible: category.isVisible,
      allowSubcategories: category.allowSubcategories,
      image: category.image
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (!formData.seoTitle.trim()) {
      newErrors.seoTitle = 'SEO title is required';
    }

    if (!formData.seoDescription.trim()) {
      newErrors.seoDescription = 'SEO description is required';
    }

    if (formData.sortOrder < 0) {
      newErrors.sortOrder = 'Sort order must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, make API call here
      console.log('Updating category:', formData);
      
      // Navigate back to category detail
      navigate(`/categories/${id}`);
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real app, make API call here
        console.log('Deleting category:', id);
        
        // Navigate back to categories list
        navigate('/categories');
      } catch (error) {
        console.error('Error deleting category:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/categories/${id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
              Back to Category
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
            <p className="text-gray-600 mt-1">Update category information and settings</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            <Trash2 size={16} />
            Delete Category
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="form-label">Category Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter category name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`form-input ${errors.description ? 'border-red-500' : ''}`}
                    placeholder="Enter category description"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Parent Category</label>
                    <select
                      name="parentId"
                      value={formData.parentId}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={formData.type === 'parent'}
                    >
                      {parentCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className={`form-input ${errors.slug ? 'border-red-500' : ''}`}
                    placeholder="category-slug"
                  />
                  {errors.slug && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.slug}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    URL: /categories/{formData.slug}
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="form-label">SEO Title *</label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    className={`form-input ${errors.seoTitle ? 'border-red-500' : ''}`}
                    placeholder="Enter SEO title"
                    maxLength={60}
                  />
                  {errors.seoTitle && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.seoTitle}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.seoTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="form-label">SEO Description *</label>
                  <textarea
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className={`form-input ${errors.seoDescription ? 'border-red-500' : ''}`}
                    placeholder="Enter SEO description"
                    maxLength={160}
                  />
                  {errors.seoDescription && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.seoDescription}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.seoDescription.length}/160 characters
                  </p>
                </div>

                <div>
                  <label className="form-label">Sort Order</label>
                  <input
                    type="number"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleInputChange}
                    className={`form-input ${errors.sortOrder ? 'border-red-500' : ''}`}
                    min="0"
                  />
                  {errors.sortOrder && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.sortOrder}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Category Image */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Category Image</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {imagePreview || formData.image ? (
                    <div className="relative">
                      <img
                        src={imagePreview || formData.image}
                        alt="Category preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 mb-2">Upload category image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="btn btn-outline cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Visible to Users</label>
                    <p className="text-sm text-gray-500">Show this category on the website</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="isVisible"
                      checked={formData.isVisible}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Allow Subcategories</label>
                    <p className="text-sm text-gray-500">Allow creating subcategories under this category</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="allowSubcategories"
                      checked={formData.allowSubcategories}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3">
              <Link to={`/categories/${id}`}>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button 
                variant="primary" 
                type="submit" 
                loading={loading}
                disabled={loading}
              >
                <Save size={16} />
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">{formData.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  <Badge variant={formData.status === 'active' ? 'success' : 'danger'}>
                    {formData.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Visible:</span>
                  <Badge variant={formData.isVisible ? 'success' : 'danger'}>
                    {formData.isVisible ? 'Yes' : 'No'}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Subcategories:</span>
                  <Badge variant={formData.allowSubcategories ? 'success' : 'danger'}>
                    {formData.allowSubcategories ? 'Allowed' : 'Not Allowed'}
                  </Badge>
                </div>
              </div>

              {formData.seoTitle && (
                <div className="pt-4 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">SEO Preview</h5>
                  <div className="space-y-1">
                    <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {formData.seoTitle}
                    </p>
                    <p className="text-sm text-green-600">
                      /categories/{formData.slug}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formData.seoDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
