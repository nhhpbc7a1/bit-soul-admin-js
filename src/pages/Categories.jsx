import React, { useState } from 'react';
import { Tag, Plus, Search, Filter, Eye, Edit, Trash2, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    {
      title: 'Total Categories',
      value: 24,
      change: { value: 2, type: 'increase' },
      icon: Tag,
      color: 'primary'
    },
    {
      title: 'Active Categories',
      value: 20,
      change: { value: 5, type: 'increase' },
      icon: Tag,
      color: 'success'
    },
    {
      title: 'Parent Categories',
      value: 8,
      change: { value: 1, type: 'increase' },
      icon: FolderOpen,
      color: 'info'
    },
    {
      title: 'Subcategories',
      value: 16,
      change: { value: 3, type: 'increase' },
      icon: Tag,
      color: 'warning'
    }
  ];

  const categories = [
    {
      id: '1',
      name: 'Subscription Packages',
      description: 'Various subscription tiers and packages for different user needs',
      status: 'active',
      type: 'parent',
      productsCount: 8,
      createdAt: '2024-01-01'
    },
    {
      id: '1-1',
      name: 'Premium Plans',
      description: 'High-tier subscription plans with all features',
      parentId: '1',
      status: 'active',
      type: 'child',
      productsCount: 4,
      createdAt: '2024-01-02'
    },
    {
      id: '1-2',
      name: 'Basic Plans',
      description: 'Entry-level subscription plans for beginners',
      parentId: '1',
      status: 'active',
      type: 'child',
      productsCount: 4,
      createdAt: '2024-01-02'
    },
    {
      id: '2',
      name: 'Business Solutions',
      description: 'Enterprise and business-focused packages and services',
      status: 'active',
      type: 'parent',
      productsCount: 6,
      createdAt: '2024-01-01'
    },
    {
      id: '2-1',
      name: 'Enterprise',
      description: 'Large-scale enterprise solutions',
      parentId: '2',
      status: 'active',
      type: 'child',
      productsCount: 3,
      createdAt: '2024-01-03'
    },
    {
      id: '3',
      name: 'Special Offers',
      description: 'Promotional packages and limited-time offers',
      status: 'active',
      type: 'parent',
      productsCount: 2,
      createdAt: '2024-01-01'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="danger">Inactive</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'parent':
        return <Badge variant="info">Parent</Badge>;
      case 'child':
        return <Badge variant="neutral">Subcategory</Badge>;
      default:
        return <Badge variant="neutral">{type}</Badge>;
    }
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const parentCategories = categories.filter(cat => cat.type === 'parent');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600 mt-1">Organize and manage product categories</p>
        </div>
        <Link to="/categories/create">
          <Button variant="primary">
            <Plus size={16} />
            Add Category
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Categories Tree View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Tree */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Category Tree</h3>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {parentCategories.map((category) => {
                  const children = categories.filter(cat => cat.parentId === category.id);
                  return (
                    <div key={category.id} className="space-y-1">
                      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <FolderOpen size={16} className="text-primary-500" />
                        <span className="font-medium text-gray-900">{category.name}</span>
                        {getStatusBadge(category.status)}
                        <span className="text-xs text-gray-500 ml-auto">{category.productsCount}</span>
                      </div>
                      {children.map((child) => (
                        <div key={child.id} className="flex items-center gap-2 p-2 ml-6 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <Tag size={14} className="text-gray-400" />
                          <span className="text-gray-700">{child.name}</span>
                          {getStatusBadge(child.status)}
                          <span className="text-xs text-gray-500 ml-auto">{child.productsCount}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">All Categories</h3>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-input pl-10 w-64"
                    />
                  </div>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-input w-32"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  
                  <Button variant="secondary" size="sm">
                    <Filter size={16} />
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td>
                        <div className="flex items-center gap-3">
                          {category.type === 'parent' ? (
                            <FolderOpen size={16} className="text-primary-500" />
                          ) : (
                            <Tag size={16} className="text-gray-400" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {category.type === 'child' && '└─ '}{category.name}
                            </p>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{getTypeBadge(category.type)}</td>
                      <td>
                        <span className="font-medium text-gray-900">{category.productsCount}</span>
                      </td>
                      <td>{getStatusBadge(category.status)}</td>
                      <td className="text-gray-500">{category.createdAt}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
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
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Products per Category</p>
              <p className="text-2xl font-bold text-gray-900">14.3</p>
              <p className="text-sm text-green-600">+2.1 avg</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Most Popular</p>
              <p className="text-lg font-semibold text-gray-900">Subscription Packages</p>
              <p className="text-sm text-blue-600">142 products</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Category Growth</p>
              <p className="text-2xl font-bold text-gray-900">+8.5%</p>
              <p className="text-sm text-orange-600">This month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
