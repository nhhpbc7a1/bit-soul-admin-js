import React, { useState } from 'react';
import { Tag, Plus, Search, Filter, Eye, Edit, Trash2, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');


  const categories = [
    {
      id: '1',
      name: 'Electronics',
      description: 'Electronic products, technology and digital devices',
      status: 'active',
      type: 'parent',
      productsCount: 156,
      createdAt: '2024-01-01'
    },
    {
      id: '1-1',
      name: 'Phones & Accessories',
      description: 'Smartphones, headphones, chargers, phone cases',
      parentId: '1',
      status: 'active',
      type: 'child',
      productsCount: 45,
      createdAt: '2024-01-02'
    },
    {
      id: '1-2',
      name: 'Laptops & Computers',
      description: 'Laptops, desktop computers, computer accessories',
      parentId: '1',
      status: 'active',
      type: 'child',
      productsCount: 38,
      createdAt: '2024-01-02'
    },
    {
      id: '1-3',
      name: 'Home Appliances',
      description: 'Refrigerators, washing machines, air conditioners, microwaves',
      parentId: '1',
      status: 'active',
      type: 'child',
      productsCount: 73,
      createdAt: '2024-01-03'
    },
    {
      id: '2',
      name: 'Consumer Goods',
      description: 'Daily consumer products and household items',
      status: 'active',
      type: 'parent',
      productsCount: 89,
      createdAt: '2024-01-01'
    },
    {
      id: '2-1',
      name: 'Food & Beverages',
      description: 'Fresh food, packaged food, beverages',
      parentId: '2',
      status: 'active',
      type: 'child',
      productsCount: 34,
      createdAt: '2024-01-02'
    },
    {
      id: '2-2',
      name: 'Personal Care',
      description: 'Cosmetics, pharmaceuticals, personal hygiene products',
      parentId: '2',
      status: 'active',
      type: 'child',
      productsCount: 55,
      createdAt: '2024-01-02'
    },
    {
      id: '3',
      name: 'Office Supplies',
      description: 'Office equipment, study materials and work supplies',
      status: 'active',
      type: 'parent',
      productsCount: 67,
      createdAt: '2024-01-01'
    },
    {
      id: '3-1',
      name: 'School Supplies',
      description: 'Pens, notebooks, books, study tools',
      parentId: '3',
      status: 'active',
      type: 'child',
      productsCount: 28,
      createdAt: '2024-01-02'
    },
    {
      id: '3-2',
      name: 'Office Equipment',
      description: 'Printers, photocopiers, fax machines, computers',
      parentId: '3',
      status: 'active',
      type: 'child',
      productsCount: 39,
      createdAt: '2024-01-02'
    },
    {
      id: '4',
      name: 'Furniture',
      description: 'Home and office furniture',
      status: 'active',
      type: 'parent',
      productsCount: 43,
      createdAt: '2024-01-01'
    },
    {
      id: '4-1',
      name: 'Living Room Furniture',
      description: 'Sofas, tables, chairs, living room cabinets',
      parentId: '4',
      status: 'active',
      type: 'child',
      productsCount: 18,
      createdAt: '2024-01-02'
    },
    {
      id: '4-2',
      name: 'Bedroom Furniture',
      description: 'Beds, wardrobes, dressing tables',
      parentId: '4',
      status: 'active',
      type: 'child',
      productsCount: 25,
      createdAt: '2024-01-02'
    },
    {
      id: '5',
      name: 'Fashion',
      description: 'Clothing, shoes, fashion accessories',
      status: 'active',
      type: 'parent',
      productsCount: 124,
      createdAt: '2024-01-01'
    },
    {
      id: '5-1',
      name: "Men's Clothing",
      description: 'Shirts, trousers, men\'s jackets',
      parentId: '5',
      status: 'active',
      type: 'child',
      productsCount: 52,
      createdAt: '2024-01-02'
    },
    {
      id: '5-2',
      name: "Women's Clothing",
      description: 'Dresses, tops, women\'s pants, lingerie',
      parentId: '5',
      status: 'active',
      type: 'child',
      productsCount: 72,
      createdAt: '2024-01-02'
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
                      <Link to={`/categories/${category.id}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <FolderOpen size={16} className="text-primary-500" />
                        <span className="font-medium text-gray-900">{category.name}</span>
                        {getStatusBadge(category.status)}
                        <span className="text-xs text-gray-500 ml-auto">{category.productsCount}</span>
                      </Link>
                      {children.map((child) => (
                        <Link key={child.id} to={`/categories/${child.id}`} className="flex items-center gap-2 p-2 ml-6 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <Tag size={14} className="text-gray-400" />
                          <span className="text-gray-700">{child.name}</span>
                          {getStatusBadge(child.status)}
                          <span className="text-xs text-gray-500 ml-auto">{child.productsCount}</span>
                        </Link>
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
                          <Link to={`/categories/${category.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye size={14} />
                            </Button>
                          </Link>
                          <Link to={`/categories/${category.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit size={14} />
                            </Button>
                          </Link>
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

    </div>
  );
};

export default Categories;
