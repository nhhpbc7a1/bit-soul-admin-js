import React, { useState } from 'react';
import { ArrowLeft, Package, Plus, Trash2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const CreatePackage = () => {
  const [packageData, setPackageData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '30',
    durationType: 'days',
    status: 'active',
    features: [''],
    category: 'basic',
    maxUsers: '',
    maxProjects: '',
    storage: '',
    support: 'email',
    analytics: false,
    api: false,
    customDomain: false,
    whiteLabel: false,
    sslCertificate: true,
    backup: false,
    priority: 'normal'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setPackageData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...packageData.features];
    newFeatures[index] = value;
    setPackageData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setPackageData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    if (packageData.features.length > 1) {
      const newFeatures = packageData.features.filter((_, i) => i !== index);
      setPackageData(prev => ({
        ...prev,
        features: newFeatures
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!packageData.name.trim()) {
      newErrors.name = 'Package name is required';
    }

    if (!packageData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!packageData.price || packageData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!packageData.maxUsers || packageData.maxUsers <= 0) {
      newErrors.maxUsers = 'Max users is required';
    }

    if (!packageData.maxProjects || packageData.maxProjects <= 0) {
      newErrors.maxProjects = 'Max projects is required';
    }

    if (!packageData.storage.trim()) {
      newErrors.storage = 'Storage limit is required';
    }

    const validFeatures = packageData.features.filter(f => f.trim());
    if (validFeatures.length === 0) {
      newErrors.features = 'At least one feature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Filter out empty features
      const finalData = {
        ...packageData,
        features: packageData.features.filter(f => f.trim()),
        price: parseFloat(packageData.price),
        maxUsers: parseInt(packageData.maxUsers),
        maxProjects: parseInt(packageData.maxProjects)
      };

      console.log('Creating package:', finalData);
      // Here you would typically send the data to your API
      alert('Package created successfully!');
    }
  };

  const getCategoryBadge = (category) => {
    const variants = {
      basic: 'info',
      professional: 'warning', 
      enterprise: 'primary',
      student: 'success'
    };
    return <Badge variant={variants[category]}>{category}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link to="/packages">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Package</h1>
          <p className="text-gray-600 mt-1">Set up a new subscription package with features and pricing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Name *
                    </label>
                    <input
                      type="text"
                      value={packageData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="e.g., Professional Plan"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={packageData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="form-input"
                    >
                      <option value="basic">Basic</option>
                      <option value="professional">Professional</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={packageData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={`form-input ${errors.description ? 'border-red-500' : ''}`}
                    rows={3}
                    placeholder="Describe what this package offers..."
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>
              </div>
            </div>

            {/* Pricing & Duration */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Duration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (USD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={packageData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className={`form-input ${errors.price ? 'border-red-500' : ''}`}
                      placeholder="29.99"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={packageData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration Type
                    </label>
                    <select
                      value={packageData.durationType}
                      onChange={(e) => handleInputChange('durationType', e.target.value)}
                      className="form-input"
                    >
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Limits & Resources */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Limits & Resources</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Users *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={packageData.maxUsers}
                      onChange={(e) => handleInputChange('maxUsers', e.target.value)}
                      className={`form-input ${errors.maxUsers ? 'border-red-500' : ''}`}
                      placeholder="5"
                    />
                    {errors.maxUsers && <p className="text-red-500 text-xs mt-1">{errors.maxUsers}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Projects *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={packageData.maxProjects}
                      onChange={(e) => handleInputChange('maxProjects', e.target.value)}
                      className={`form-input ${errors.maxProjects ? 'border-red-500' : ''}`}
                      placeholder="10"
                    />
                    {errors.maxProjects && <p className="text-red-500 text-xs mt-1">{errors.maxProjects}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Limit *
                    </label>
                    <input
                      type="text"
                      value={packageData.storage}
                      onChange={(e) => handleInputChange('storage', e.target.value)}
                      className={`form-input ${errors.storage ? 'border-red-500' : ''}`}
                      placeholder="10GB"
                    />
                    {errors.storage && <p className="text-red-500 text-xs mt-1">{errors.storage}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Package Features</h3>
                  <Button type="button" variant="ghost" size="sm" onClick={addFeature}>
                    <Plus size={16} />
                    Add Feature
                  </Button>
                </div>

                <div className="space-y-3">
                  {packageData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="form-input flex-1"
                        placeholder="e.g., Email Support"
                      />
                      {packageData.features.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.features && <p className="text-red-500 text-xs mt-2">{errors.features}</p>}
              </div>
            </div>

            {/* Advanced Features */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Level
                    </label>
                    <select
                      value={packageData.support}
                      onChange={(e) => handleInputChange('support', e.target.value)}
                      className="form-input"
                    >
                      <option value="email">Email Support</option>
                      <option value="priority">Priority Support</option>
                      <option value="phone">Phone Support</option>
                      <option value="dedicated">Dedicated Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      value={packageData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="form-input"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="analytics"
                      checked={packageData.analytics}
                      onChange={(e) => handleInputChange('analytics', e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="analytics" className="text-sm text-gray-700">
                      Advanced Analytics
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="api"
                      checked={packageData.api}
                      onChange={(e) => handleInputChange('api', e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="api" className="text-sm text-gray-700">
                      API Access
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="customDomain"
                      checked={packageData.customDomain}
                      onChange={(e) => handleInputChange('customDomain', e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="customDomain" className="text-sm text-gray-700">
                      Custom Domain
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="whiteLabel"
                      checked={packageData.whiteLabel}
                      onChange={(e) => handleInputChange('whiteLabel', e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="whiteLabel" className="text-sm text-gray-700">
                      White-label Solution
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="sslCertificate"
                      checked={packageData.sslCertificate}
                      onChange={(e) => handleInputChange('sslCertificate', e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="sslCertificate" className="text-sm text-gray-700">
                      SSL Certificate
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="backup"
                      checked={packageData.backup}
                      onChange={(e) => handleInputChange('backup', e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="backup" className="text-sm text-gray-700">
                      Automated Backup
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Package Preview */}
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Preview</h3>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-primary-500" />
                      <h4 className="font-semibold text-gray-900">
                        {packageData.name || 'Package Name'}
                      </h4>
                    </div>
                    {getCategoryBadge(packageData.category)}
                  </div>

                  <p className="text-sm text-gray-600 text-center">
                    {packageData.description || 'Package description will appear here...'}
                  </p>

                  <div className="text-center py-4 border-y border-gray-200">
                    <div className="text-3xl font-bold text-gray-900">
                      ${packageData.price || '0'}
                    </div>
                    <div className="text-sm text-gray-500">
                      per {packageData.duration} {packageData.durationType}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Users:</span> {packageData.maxUsers || 'N/A'}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Projects:</span> {packageData.maxProjects || 'N/A'}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Storage:</span> {packageData.storage || 'N/A'}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Support:</span> {packageData.support}
                    </div>
                  </div>

                  {packageData.features.filter(f => f.trim()).length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                      <div className="space-y-1">
                        {packageData.features.filter(f => f.trim()).map((feature, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-800">
                        <p className="font-medium mb-1">Preview Mode</p>
                        <p>This is how your package will appear to customers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Link to="/packages">
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary">
            <Package size={16} />
            Create Package
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePackage;
