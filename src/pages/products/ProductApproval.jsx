import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Eye, DollarSign, User, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ProductApproval = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  
  // Mock pending products data
  const [pendingProducts] = useState([
    {
      id: '1',
      name: 'Wireless Gaming Headset Pro',
      sku: 'WGH-PRO-001',
      seller: {
        id: 'S001',
        name: 'TechStore VN',
        email: 'tech@store.vn',
        rating: 4.8
      },
      supplier: {
        id: 'SUP001',
        name: 'Electronics Supplier Co',
        sku: 'ES-WGH-001',
        cost: 45.00
      },
      sellingPrice: 89.99,
      suggestedPrice: 79.99,
      margin: 49.9,
      platformFee: 8.99,
      category: 'Electronics',
      submittedAt: '2024-01-15T10:30:00Z',
      images: ['/api/placeholder/300/300'],
      description: 'Professional wireless gaming headset with 7.1 surround sound and RGB lighting',
      status: 'pending',
      productType: 'sales', // Sales Product - needs approval
      checklist: [
        { id: 1, item: 'Product images quality check', completed: true },
        { id: 2, item: 'Description accuracy verification', completed: true },
        { id: 3, item: 'Price competitiveness analysis', completed: false },
        { id: 4, item: 'Supplier verification', completed: true },
        { id: 5, item: 'Category classification check', completed: true },
        { id: 6, item: 'Legal compliance review', completed: false }
      ]
    },
    {
      id: '2',
      name: 'Smart Fitness Tracker',
      sku: 'SFT-2024-002',
      seller: {
        id: 'S002',
        name: 'HealthTech Store',
        email: 'info@healthtech.vn',
        rating: 4.6
      },
      supplier: {
        id: 'SUP002',
        name: 'Wearable Tech Supplier',
        sku: 'WTS-SFT-002',
        cost: 25.00
      },
      sellingPrice: 59.99,
      suggestedPrice: 54.99,
      margin: 58.3,
      platformFee: 5.99,
      category: 'Wearables',
      submittedAt: '2024-01-14T15:20:00Z',
      images: ['/api/placeholder/300/300'],
      description: 'Advanced fitness tracker with heart rate monitoring and sleep tracking',
      status: 'pending',
      productType: 'sales', // Sales Product - needs approval
      checklist: [
        { id: 1, item: 'Product images quality check', completed: true },
        { id: 2, item: 'Description accuracy verification', completed: true },
        { id: 3, item: 'Price competitiveness analysis', completed: true },
        { id: 4, item: 'Supplier verification', completed: true },
        { id: 5, item: 'Category classification check', completed: true },
        { id: 6, item: 'Legal compliance review', completed: true }
      ]
    },
    {
      id: '3',
      name: 'Bluetooth Wireless Mouse',
      sku: 'SUP-BWM-003',
      supplier: {
        id: 'SUP003',
        name: 'Direct Electronics Supplier',
        sku: 'DES-BWM-003',
        cost: 12.00
      },
      seller: null, // This is a direct supplier product
      sellingPrice: 29.99,
      suggestedPrice: 24.99,
      margin: 59.9,
      platformFee: 2.99,
      category: 'Electronics',
      submittedAt: '2024-01-13T09:15:00Z',
      images: ['/api/placeholder/300/300'],
      description: 'Ergonomic wireless mouse with precision tracking and long battery life',
      status: 'pending',
      productType: 'supplier', // Supplier Product - direct from supplier
      checklist: [
        { id: 1, item: 'Product images quality check', completed: true },
        { id: 2, item: 'Description accuracy verification', completed: true },
        { id: 3, item: 'Price competitiveness analysis', completed: true },
        { id: 4, item: 'Supplier verification', completed: true },
        { id: 5, item: 'Category classification check', completed: false },
        { id: 6, item: 'Legal compliance review', completed: true }
      ]
    }
  ]);

  const [approvalNotes, setApprovalNotes] = useState({});

  const handleApproval = (productId, action, notes) => {
    console.log(`${action} product ${productId}:`, notes);
    // Handle approval logic
  };

  const updateChecklistItem = (productId, itemId, completed) => {
    console.log(`Update checklist item ${itemId} for product ${productId}:`, completed);
    // Handle checklist update
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending Approval</Badge>;
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const canApprove = (product) => {
    return product.checklist.every(item => item.completed);
  };

  const getCompletionRate = (checklist) => {
    const completed = checklist.filter(item => item.completed).length;
    return (completed / checklist.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Approval</h1>
          <p className="text-gray-600 mt-1">Review and approve products submitted by suppliers and sellers before going live</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/products">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setSelectedTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All Pending ({pendingProducts.filter(p => p.status === 'pending').length})
          </button>
          <button
            onClick={() => setSelectedTab('supplier-pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'supplier-pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Supplier Products ({pendingProducts.filter(p => p.status === 'pending' && p.productType === 'supplier').length})
          </button>
          <button
            onClick={() => setSelectedTab('sales-pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'sales-pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Sales Products ({pendingProducts.filter(p => p.status === 'pending' && p.productType === 'sales').length})
          </button>
          <button
            onClick={() => setSelectedTab('approved')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'approved'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Recently Approved
          </button>
          <button
            onClick={() => setSelectedTab('rejected')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'rejected'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Rejected
          </button>
        </nav>
      </div>

      {/* All Pending Products */}
      {selectedTab === 'pending' && (
        <div className="space-y-6">
          {pendingProducts.filter(product => product.status === 'pending').map((product) => (
            <div key={product.id} className="card">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Product Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {product.productType === 'supplier' ? (
                                <>
                                  <Badge variant="primary">Supplier Product</Badge>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">Direct from Supplier</span>
                                </>
                              ) : (
                                <>
                                  <Badge variant="info">Sales Product</Badge>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">From Seller</span>
                                </>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                          </div>
                          {getStatusBadge(product.status)}
                        </div>
                      </div>
                    </div>

                    {/* Seller & Supplier Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Seller Information - Only for Sales Products */}
                      {product.productType === 'sales' && product.seller && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <User className="w-4 h-4 text-primary-500" />
                            <h4 className="font-medium text-gray-900">Seller Information</h4>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm"><span className="text-gray-500">Name:</span> {product.seller.name}</p>
                            <p className="text-sm"><span className="text-gray-500">Email:</span> {product.seller.email}</p>
                            <p className="text-sm"><span className="text-gray-500">Rating:</span> {product.seller.rating}/5</p>
                          </div>
                        </div>
                      )}

                      {/* Supplier Information */}
                      <div className={`border border-gray-200 rounded-lg p-4 ${product.productType === 'supplier' ? 'md:col-span-2' : ''}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-4 h-4 text-blue-500" />
                          <h4 className="font-medium text-gray-900">
                            {product.productType === 'supplier' ? 'Direct Supplier Information' : 'Source Supplier Information'}
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm"><span className="text-gray-500">Name:</span> {product.supplier.name}</p>
                          <p className="text-sm"><span className="text-gray-500">SKU:</span> {product.supplier.sku}</p>
                          <p className="text-sm"><span className="text-gray-500">Cost:</span> ${product.supplier.cost}</p>
                          {product.productType === 'supplier' && (
                            <div className="mt-3 p-2 bg-blue-50 rounded">
                              <p className="text-xs text-blue-700">
                                📦 This is a direct supplier product - no seller intermediary
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <h4 className="font-medium text-gray-900">Financial Summary</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Selling Price</p>
                          <p className="text-lg font-semibold text-gray-900">${product.sellingPrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Supplier Cost</p>
                          <p className="text-lg font-semibold text-gray-900">${product.supplier.cost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Platform Fee</p>
                          <p className="text-lg font-semibold text-gray-900">${product.platformFee}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Margin</p>
                          <p className="text-lg font-semibold text-green-600">{product.margin}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Approval Checklist */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Approval Checklist</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getCompletionRate(product.checklist)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {getCompletionRate(product.checklist).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {product.checklist.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={(e) => updateChecklistItem(product.id, item.id, e.target.checked)}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span className={`text-sm ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {item.item}
                            </span>
                            {item.completed && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="lg:col-span-1">
                    <div className="card bg-gray-50">
                      <div className="p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Admin Actions</h4>
                        
                        <div className="space-y-4">
                          <Link to={`/products/${product.id}`}>
                            <Button variant="secondary" className="w-full">
                              <Eye size={16} />
                              View Full Details
                            </Button>
                          </Link>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Approval Notes
                            </label>
                            <textarea
                              value={approvalNotes[product.id] || ''}
                              onChange={(e) => setApprovalNotes({
                                ...approvalNotes,
                                [product.id]: e.target.value
                              })}
                              className="form-input"
                              rows={3}
                              placeholder="Add notes for this approval decision..."
                            />
                          </div>

                          <div className="space-y-2">
                            <Button
                              variant="success"
                              className="w-full"
                              disabled={!canApprove(product)}
                              onClick={() => handleApproval(product.id, 'approve', approvalNotes[product.id])}
                            >
                              <CheckCircle size={16} />
                              Approve Product
                            </Button>
                            
                            <Button
                              variant="warning"
                              className="w-full"
                              onClick={() => handleApproval(product.id, 'request_changes', approvalNotes[product.id])}
                            >
                              <AlertCircle size={16} />
                              Request Changes
                            </Button>
                            
                            <Button
                              variant="danger"
                              className="w-full"
                              onClick={() => handleApproval(product.id, 'reject', approvalNotes[product.id])}
                            >
                              <XCircle size={16} />
                              Reject Product
                            </Button>
                          </div>

                          {!canApprove(product) && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-600" />
                                <p className="text-xs text-yellow-800">
                                  Complete all checklist items to enable approval
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="text-xs text-gray-500">
                            <p>Submitted: {new Date(product.submittedAt).toLocaleDateString()}</p>
                            <p>Category: {product.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Supplier Products Only */}
      {selectedTab === 'supplier-pending' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Supplier Products</h3>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Direct products from suppliers - no seller intermediary involved
            </p>
          </div>
          {pendingProducts.filter(product => product.status === 'pending' && product.productType === 'supplier').map((product) => (
            <div key={product.id} className="card">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Product Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="primary">Supplier Product</Badge>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">Direct from Supplier</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                          </div>
                          {getStatusBadge(product.status)}
                        </div>
                      </div>
                    </div>

                    {/* Supplier Info Only */}
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="w-4 h-4 text-blue-500" />
                        <h4 className="font-medium text-gray-900">Direct Supplier Information</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="text-gray-500">Name:</span> {product.supplier.name}</p>
                        <p className="text-sm"><span className="text-gray-500">SKU:</span> {product.supplier.sku}</p>
                        <p className="text-sm"><span className="text-gray-500">Cost:</span> ${product.supplier.cost}</p>
                        <div className="mt-3 p-2 bg-blue-50 rounded">
                          <p className="text-xs text-blue-700">
                            📦 This is a direct supplier product - no seller intermediary
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <h4 className="font-medium text-gray-900">Financial Summary</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Selling Price</p>
                          <p className="text-lg font-semibold text-gray-900">${product.sellingPrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Supplier Cost</p>
                          <p className="text-lg font-semibold text-gray-900">${product.supplier.cost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Platform Fee</p>
                          <p className="text-lg font-semibold text-gray-900">${product.platformFee}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Margin</p>
                          <p className="text-lg font-semibold text-green-600">{product.margin}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Approval Checklist */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Approval Checklist</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getCompletionRate(product.checklist)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {getCompletionRate(product.checklist).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {product.checklist.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={(e) => updateChecklistItem(product.id, item.id, e.target.checked)}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span className={`text-sm ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {item.item}
                            </span>
                            {item.completed && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="lg:col-span-1">
                    <div className="card bg-gray-50">
                      <div className="p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Admin Actions</h4>
                        
                        <div className="space-y-4">
                          <Link to={`/products/${product.id}`}>
                            <Button variant="secondary" className="w-full">
                              <Eye size={16} />
                              View Full Details
                            </Button>
                          </Link>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Approval Notes
                            </label>
                            <textarea
                              value={approvalNotes[product.id] || ''}
                              onChange={(e) => setApprovalNotes({
                                ...approvalNotes,
                                [product.id]: e.target.value
                              })}
                              className="form-input"
                              rows={3}
                              placeholder="Add notes for this approval decision..."
                            />
                          </div>

                          <div className="space-y-2">
                            <Button
                              variant="success"
                              className="w-full"
                              disabled={!canApprove(product)}
                              onClick={() => handleApproval(product.id, 'approve', approvalNotes[product.id])}
                            >
                              <CheckCircle size={16} />
                              Approve Product
                            </Button>
                            
                            <Button
                              variant="warning"
                              className="w-full"
                              onClick={() => handleApproval(product.id, 'request_changes', approvalNotes[product.id])}
                            >
                              <AlertCircle size={16} />
                              Request Changes
                            </Button>
                            
                            <Button
                              variant="danger"
                              className="w-full"
                              onClick={() => handleApproval(product.id, 'reject', approvalNotes[product.id])}
                            >
                              <XCircle size={16} />
                              Reject Product
                            </Button>
                          </div>

                          {!canApprove(product) && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-600" />
                                <p className="text-xs text-yellow-800">
                                  Complete all checklist items to enable approval
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="text-xs text-gray-500">
                            <p>Submitted: {new Date(product.submittedAt).toLocaleDateString()}</p>
                            <p>Category: {product.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sales Products Only */}
      {selectedTab === 'sales-pending' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium text-purple-900">Sales Products</h3>
            </div>
            <p className="text-sm text-purple-700 mt-1">
              Products created by sellers based on supplier SKUs - includes seller markup
            </p>
          </div>
          {pendingProducts.filter(product => product.status === 'pending' && product.productType === 'sales').map((product) => (
            <div key={product.id} className="card">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Product Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="info">Sales Product</Badge>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">From Seller</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                          </div>
                          {getStatusBadge(product.status)}
                        </div>
                      </div>
                    </div>

                    {/* Seller & Supplier Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Seller Information */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-4 h-4 text-primary-500" />
                          <h4 className="font-medium text-gray-900">Seller Information</h4>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm"><span className="text-gray-500">Name:</span> {product.seller?.name}</p>
                          <p className="text-sm"><span className="text-gray-500">Email:</span> {product.seller?.email}</p>
                          <p className="text-sm"><span className="text-gray-500">Rating:</span> {product.seller?.rating}/5</p>
                        </div>
                      </div>

                      {/* Source Supplier Information */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-4 h-4 text-blue-500" />
                          <h4 className="font-medium text-gray-900">Source Supplier Information</h4>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm"><span className="text-gray-500">Name:</span> {product.supplier.name}</p>
                          <p className="text-sm"><span className="text-gray-500">SKU:</span> {product.supplier.sku}</p>
                          <p className="text-sm"><span className="text-gray-500">Cost:</span> ${product.supplier.cost}</p>
                        </div>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <h4 className="font-medium text-gray-900">Financial Summary</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Selling Price</p>
                          <p className="text-lg font-semibold text-gray-900">${product.sellingPrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Supplier Cost</p>
                          <p className="text-lg font-semibold text-gray-900">${product.supplier.cost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Platform Fee</p>
                          <p className="text-lg font-semibold text-gray-900">${product.platformFee}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Margin</p>
                          <p className="text-lg font-semibold text-green-600">{product.margin}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Approval Checklist */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Approval Checklist</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getCompletionRate(product.checklist)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {getCompletionRate(product.checklist).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {product.checklist.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={(e) => updateChecklistItem(product.id, item.id, e.target.checked)}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span className={`text-sm ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {item.item}
                            </span>
                            {item.completed && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="lg:col-span-1">
                    <div className="card bg-gray-50">
                      <div className="p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Admin Actions</h4>
                        
                        <div className="space-y-4">
                          <Link to={`/products/${product.id}`}>
                            <Button variant="secondary" className="w-full">
                              <Eye size={16} />
                              View Full Details
                            </Button>
                          </Link>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Approval Notes
                            </label>
                            <textarea
                              value={approvalNotes[product.id] || ''}
                              onChange={(e) => setApprovalNotes({
                                ...approvalNotes,
                                [product.id]: e.target.value
                              })}
                              className="form-input"
                              rows={3}
                              placeholder="Add notes for this approval decision..."
                            />
                          </div>

                          <div className="space-y-2">
                            <Button
                              variant="success"
                              className="w-full"
                              disabled={!canApprove(product)}
                              onClick={() => handleApproval(product.id, 'approve', approvalNotes[product.id])}
                            >
                              <CheckCircle size={16} />
                              Approve Product
                            </Button>
                            
                            <Button
                              variant="warning"
                              className="w-full"
                              onClick={() => handleApproval(product.id, 'request_changes', approvalNotes[product.id])}
                            >
                              <AlertCircle size={16} />
                              Request Changes
                            </Button>
                            
                            <Button
                              variant="danger"
                              className="w-full"
                              onClick={() => handleApproval(product.id, 'reject', approvalNotes[product.id])}
                            >
                              <XCircle size={16} />
                              Reject Product
                            </Button>
                          </div>

                          {!canApprove(product) && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-600" />
                                <p className="text-xs text-yellow-800">
                                  Complete all checklist items to enable approval
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="text-xs text-gray-500">
                            <p>Submitted: {new Date(product.submittedAt).toLocaleDateString()}</p>
                            <p>Category: {product.category}</p>
                            <p>Seller: {product.seller?.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty States for other tabs */}
      {selectedTab === 'approved' && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Recently Approved Products</h3>
          <p className="text-gray-500">Approved products will appear here</p>
        </div>
      )}

      {selectedTab === 'rejected' && (
        <div className="text-center py-12">
          <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Rejected Products</h3>
          <p className="text-gray-500">Rejected products will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ProductApproval;
