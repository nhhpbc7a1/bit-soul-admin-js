import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Tag, 
  FolderOpen, 
  Edit, 
  Trash2, 
  Package, 
  Calendar, 
  User,
  Activity,
  TrendingUp,
  Eye,
  Plus
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';

const CategoryDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  const category = {
    id: id,
    name: 'Electronics',
    description: 'Electronic products, technology and digital devices. This category includes smartphones, laptops, home appliances, and all modern electronic gadgets.',
    status: 'active',
    type: 'parent',
    parentId: null,
    productsCount: 156,
    subcategoriesCount: 3,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
    slug: 'electronics',
    seoTitle: 'Electronics - Latest Technology & Digital Devices',
    seoDescription: 'Discover our wide range of electronic products including smartphones, laptops, home appliances and more.',
    image: null,
    sortOrder: 1,
    isVisible: true,
    allowSubcategories: true
  };

  const subcategories = [
    {
      id: '1-1',
      name: 'Phones & Accessories',
      description: 'Smartphones, headphones, chargers, phone cases',
      status: 'active',
      productsCount: 45,
      createdAt: '2024-01-02'
    },
    {
      id: '1-2',
      name: 'Laptops & Computers',
      description: 'Laptops, desktop computers, computer accessories',
      status: 'active',
      productsCount: 38,
      createdAt: '2024-01-02'
    },
    {
      id: '1-3',
      name: 'Home Appliances',
      description: 'Refrigerators, washing machines, air conditioners, microwaves',
      status: 'active',
      productsCount: 73,
      createdAt: '2024-01-03'
    }
  ];

  const products = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      description: 'Latest Apple smartphone with advanced camera system',
      price: 1199,
      status: 'active',
      stock: 25,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Android smartphone with S Pen',
      price: 1299,
      status: 'active',
      stock: 18,
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'MacBook Pro M3',
      description: 'High-performance laptop for professionals',
      price: 1999,
      status: 'active',
      stock: 12,
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      name: 'Sony WH-1000XM5',
      description: 'Premium noise-cancelling wireless headphones',
      price: 399,
      status: 'active',
      stock: 45,
      createdAt: '2024-01-12'
    }
  ];


  const stats = [
    {
      title: 'Total Products',
      value: category.productsCount,
      change: { value: 2, type: 'increase' },
      icon: Package,
      color: 'primary'
    },
    {
      title: 'Subcategories',
      value: category.subcategoriesCount,
      change: { value: 0, type: 'neutral' },
      icon: FolderOpen,
      color: 'info'
    },
    {
      title: 'Active Products',
      value: products.filter(p => p.status === 'active').length,
      change: { value: 1, type: 'increase' },
      icon: Activity,
      color: 'success'
    },
    {
      title: 'Total Revenue',
      value: '$156,420',
      change: { value: 18.2, type: 'increase' },
      icon: TrendingUp,
      color: 'warning'
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'subcategories', label: 'Subcategories', icon: FolderOpen }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/categories">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
              Back to Categories
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600 mt-1">Category Details & Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to={`/categories/${id}/edit`}>
            <Button variant="outline">
              <Edit size={16} />
              Edit Category
            </Button>
          </Link>
          <Button variant="danger">
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Category Info & Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Category Information & Details</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-gray-900 font-medium">{category.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-1">{getStatusBadge(category.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Type</label>
                      <p className="text-gray-900">{category.type === 'parent' ? 'Parent Category' : 'Subcategory'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Slug</label>
                      <p className="text-gray-900 font-mono text-sm">{category.slug}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Description</label>
                      <p className="text-gray-900 mt-1">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Category Details */}
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="text-sm font-medium">{category.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Created by</p>
                        <p className="text-sm font-medium">{category.createdBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="text-sm font-medium">{category.updatedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Updated by</p>
                        <p className="text-sm font-medium">{category.updatedBy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Quick Actions */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <Link to={`/categories/create?parent=${id}`} className="block">
                <Button variant="outline" className="w-full btn-ghost">
                  <Plus size={16} />
                  Add Subcategory
                </Button>
              </Link>
              <Button variant="outline" className="w-full btn-ghost">
                <Package size={16} />
                Add Product
              </Button>
              <Link to={`http://localhost:5173/analysis/categories`} className="block">
                <Button variant="outline" className="w-full btn-ghost">
                  <Activity size={16} />
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">SEO Title</label>
                    <p className="text-gray-900 mt-1">{category.seoTitle}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Sort Order</label>
                    <p className="text-gray-900 mt-1">{category.sortOrder}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">SEO Description</label>
                    <p className="text-gray-900 mt-1">{category.seoDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Products in this Category</h4>
                <Button variant="primary" size="sm">
                  <Plus size={16} />
                  Add Product
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.description}</p>
                          </div>
                        </td>
                        <td>
                          <span className="font-semibold text-gray-900">${product.price}</span>
                        </td>
                        <td>
                          <span className="font-medium text-gray-900">{product.stock}</span>
                        </td>
                        <td>{getStatusBadge(product.status)}</td>
                        <td className="text-gray-500">{product.createdAt}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'subcategories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Subcategories</h4>
                <Link to={`/categories/create?parent=${id}`}>
                  <Button variant="primary" size="sm">
                    <Plus size={16} />
                    Add Subcategory
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="card p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Tag size={16} className="text-gray-400" />
                        <div>
                          <h5 className="font-medium text-gray-900">{subcategory.name}</h5>
                          <p className="text-sm text-gray-500">{subcategory.description}</p>
                        </div>
                      </div>
                      {getStatusBadge(subcategory.status)}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {subcategory.productsCount} products
                      </span>
                      <div className="flex items-center gap-2">
                        <Link to={`/categories/${subcategory.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye size={14} />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Edit size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
