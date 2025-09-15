import React, { useState } from 'react';
import { ArrowLeft, Package, User, MapPin, Calendar, CreditCard, Truck, DollarSign, AlertTriangle, Printer, Eye } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const OrderDetail = () => {
  const { id } = useParams();
  
  // Mock order data - in real app, fetch based on ID
  const [order] = useState({
    id: id || 'ord001',
    orderNumber: id === 'ord001' ? 'ORD-001' : id === 'ord002' ? 'ORD-002' : id === 'ord003' ? 'ORD-003' : id === 'ord004' ? 'ORD-004' : id === 'ord005' ? 'ORD-005' : 'ORD-2024-001',
    status: 'processing',
    total: 299.99,
    subtotal: 249.99,
    tax: 25.00,
    shippingCost: 25.00,
    discount: 0,
    currency: 'USD',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    // Dropshipping specific data
    seller: {
      id: 'S001',
      name: 'TechStore VN',
      email: 'tech@store.vn',
      commission: 45.00
    },
    supplier: {
      id: 'SUP001', 
      name: 'Electronics Supplier Co',
      cost: 180.00
    },
    financial: {
      supplierCost: 180.00,
      platformFee: 29.99,
      sellerCommission: 45.00,
      paymentProcessing: 8.99,
      platformProfit: 36.01
    },
    shipping: {
      trackingNumber: 'TRK123456789',
      carrier: 'FastShip Express',
      estimatedDelivery: '2024-01-20',
      status: 'in_transit',
      trackingUrl: 'https://fastship.com/track/TRK123456789'
    },
    customer: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567'
    },
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    billingAddress: {
      fullName: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        sku: 'PWH-001',
        price: 199.99,
        quantity: 1,
        image: null
      },
      {
        id: '2',
        name: 'Bluetooth Speaker',
        sku: 'BTS-002',
        price: 49.99,
        quantity: 1,
        image: null
      }
    ],
    timeline: [
      {
        id: '1',
        status: 'Order Placed',
        description: 'Order has been successfully placed',
        timestamp: '2024-01-15T10:30:00Z',
        completed: true
      },
      {
        id: '2',
        status: 'Payment Confirmed',
        description: 'Payment has been processed successfully',
        timestamp: '2024-01-15T10:35:00Z',
        completed: true
      },
      {
        id: '3',
        status: 'Processing',
        description: 'Order is being prepared for shipment',
        timestamp: '2024-01-15T14:20:00Z',
        completed: true
      },
      {
        id: '4',
        status: 'Shipped',
        description: 'Order has been shipped',
        timestamp: null,
        completed: false
      },
      {
        id: '5',
        status: 'Delivered',
        description: 'Order has been delivered',
        timestamp: null,
        completed: false
      }
    ]
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'processing':
        return <Badge variant="info">Processing</Badge>;
      case 'shipped':
        return <Badge variant="primary">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      case 'refunded':
        return <Badge variant="info">Refunded</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
          <p className="text-gray-600 mt-1">View and manage order details</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/orders">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Order Status */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    {getPaymentStatusBadge(order.paymentStatus)}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.timeline.map((item, index) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className={`w-4 h-4 rounded-full mt-1 ${
                        item.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${
                            item.completed ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {item.status}
                          </h4>
                          {item.timestamp && (
                            <span className="text-sm text-gray-500">
                              {new Date(item.timestamp).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${
                          item.completed ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${item.price}</p>
                        <p className="text-sm text-gray-500">
                          Total: ${(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="card" id="shipping-details">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Shipping Details</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Shipment Tracking */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Shipment Tracking</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-blue-900">Tracking Number: {order.shipping.trackingNumber}</p>
                          <p className="text-sm text-blue-700">Carrier: {order.shipping.carrier}</p>
                        </div>
                        <Badge variant="info">{order.shipping.status.replace('_', ' ')}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-blue-700">
                          Estimated Delivery: {new Date(order.shipping.estimatedDelivery).toLocaleDateString()}
                        </p>
                        <a 
                          href={order.shipping.trackingUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Track Package →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="card" id="financial-breakdown">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Financial Breakdown</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Cost Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">${order.financial.supplierCost}</div>
                      <div className="text-sm text-red-700">Supplier Cost</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">${order.financial.platformFee}</div>
                      <div className="text-sm text-blue-700">Platform Fee</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">${order.financial.sellerCommission}</div>
                      <div className="text-sm text-purple-700">Seller Commission</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">${order.financial.paymentProcessing}</div>
                      <div className="text-sm text-yellow-700">Payment Processing</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">${order.financial.platformProfit}</div>
                      <div className="text-sm text-green-700">Platform Profit</div>
                    </div>
                  </div>

                  {/* Payment Flow Visualization */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Payment Flow</h4>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Customer pays ${order.total}</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Platform receives</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Supplier gets ${order.financial.supplierCost}</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span>Seller gets ${order.financial.sellerCommission}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">{order.billingAddress.fullName}</p>
                    <p className="text-gray-600">{order.billingAddress.address}</p>
                    <p className="text-gray-600">
                      {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                    </p>
                    <p className="text-gray-600">{order.billingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary & Admin Actions */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Admin Actions */}
            <div className="card bg-gray-50">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Admin Actions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <a href="#shipping-details">
                    <Button variant="secondary" className="w-full">
                      <Truck size={16} />
                      Track Shipment
                    </Button>
                  </a>
                  
                  <a href="#financial-breakdown">
                    <Button variant="secondary" className="w-full">
                      <Eye size={16} />
                      View Commission Details
                    </Button>
                  </a>
                  
                  <Button variant="primary" className="w-full">
                    <Printer size={16} />
                    Print Invoice
                  </Button>
                  
                  <Button variant="warning" className="w-full">
                    <AlertTriangle size={16} />
                    Suspend Order
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    ⚠️ Admin cannot edit order details (quantities, addresses, items, prices) to preserve audit trail
                  </p>
                </div>
              </div>
            </div>
            {/* Customer Info */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer.name}</p>
                    <p className="text-sm text-gray-500">ID: {order.customer.id}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{order.customer.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${order.tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">${order.shippingCost}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-${order.discount}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">${order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order Information</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order ID</label>
                    <p className="text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment Method</label>
                    <p className="text-gray-900">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order Date</label>
                    <p className="text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-gray-900">{new Date(order.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

