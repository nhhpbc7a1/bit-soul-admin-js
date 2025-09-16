import React, { useEffect, useState } from 'react';
import { Package, Plus, Search, Filter, Eye, Edit, Trash2, Star, Grid3X3, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const products = [
    {
      id: '1',
      name: 'Premium Subscription Package',
      description: 'Complete premium access with all features included for power users',
      price: 299,
      category: 'Subscription Packages',
      status: 'active',
      stock: 100,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Basic Starter Package',
      description: 'Perfect entry-level package for new users getting started',
      price: 99,
      category: 'Subscription Packages',
      status: 'active',
      stock: 250,
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'Professional Business Package',
      description: 'Comprehensive business solution with advanced analytics and support',
      price: 199,
      category: 'Business Solutions',
      status: 'pending',
      stock: 75,
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      name: 'Enterprise Solution',
      description: 'Full-scale enterprise solution with custom integrations',
      price: 599,
      category: 'Business Solutions',
      status: 'active',
      stock: 25,
      createdAt: '2024-01-12'
    },
    {
      id: '5',
      name: 'Student Discount Package',
      description: 'Special pricing for students and educational institutions',
      price: 49,
      category: 'Special Offers',
      status: 'inactive',
      stock: 150,
      createdAt: '2024-01-11'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="danger">Inactive</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return <Badge variant="danger">Out of Stock</Badge>;
    } else if (stock < 50) {
      return <Badge variant="warning">Low Stock</Badge>;
    } else {
      return <Badge variant="success">In Stock</Badge>;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Reset to first page when filters or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600 mt-1">View and manage Supplier Products (auto-live) and Sales Products (need approval)</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/products/approval">
            <Button variant="warning">
              <Package size={16} />
              Product Approval
            </Button>
          </Link>
        </div>
      </div>


      {/* Products Grid/Table Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                viewMode === 'grid'
                  ? 'text-white bg-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Grid3X3 size={16} className="inline mr-2" />
              Grid View
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                viewMode === 'list'
                  ? 'text-white bg-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <List size={16} className="inline mr-2" />
              List View
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 w-64"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input w-40"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="form-input w-24"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <Button variant="outline" size="sm">
            <Filter size={16} />
            Filter
          </Button>
        </div>
      </div>

      {/* Products Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="card card-hover">
              {/* Product Image */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-t-xl">
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-xl flex items-center justify-center">
                  <Package className="w-12 h-12 text-primary-500" />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs text-gray-500">4.8</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-sm text-gray-500 ml-1">/month</span>
                  </div>
                  {getStatusBadge(product.status)}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Stock: </span>
                    <span className="font-medium">{product.stock}</span>
                  </div>
                  {getStockStatus(product.stock)}
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  Category: {product.category}
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link to={`/products/${product.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      <Eye size={14} />
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    Hide
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th className="static">Product</th>
                <th className="static">Price</th>
                <th className="static">Category</th>
                <th className="static">Stock</th>
                <th className="static">Status</th>
                <th className="static">Created</th>
                <th className="static">Actions</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-primary-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500 truncate">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className="font-semibold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-500 ml-1">/month</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600">{product.category}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{product.stock}</span>
                        {getStockStatus(product.stock)}
                      </div>
                    </td>
                    <td>
                      {getStatusBadge(product.status)}
                    </td>
                    <td>
                      <span className="text-sm text-gray-500">{product.createdAt}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link to={`/products/${product.id}`}>
                          <Button variant="primary" size="sm">
                            <Eye size={14} />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline" size="sm">
                          Hide
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600 px-2">Page {currentPage} of {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
