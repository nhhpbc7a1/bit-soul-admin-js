import React, { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ord001',
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      email: 'john.doe@example.com',
      total: 299,
      status: 'completed',
      createdAt: '2024-01-15'
    },
    {
      id: 'ord002',
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane.smith@example.com',
      total: 99,
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: 'ord003',
      orderNumber: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      total: 199,
      status: 'processing',
      createdAt: '2024-01-14'
    },
    {
      id: 'ord004',
      orderNumber: 'ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      total: 299,
      status: 'shipped',
      createdAt: '2024-01-14'
    },
    {
      id: 'ord005',
      orderNumber: 'ORD-005',
      customer: 'Tom Brown',
      email: 'tom.brown@example.com',
      total: 149,
      status: 'cancelled',
      createdAt: '2024-01-13'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'processing':
        return <Badge variant="info">Processing</Badge>;
      case 'shipped':
        return <Badge variant="info">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header - minimal */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Track and manage customer orders</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
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
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td>
                    <Link to={`/orders/${order.id}`} className="font-medium text-primary-600 hover:text-primary-800">
                      #{order.orderNumber || order.id}
                    </Link>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-xs">
                          {order.customer.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-semibold text-gray-900">
                      ${order.total.toLocaleString()}
                    </span>
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td className="text-gray-500">{order.createdAt}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link to={`/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye size={14} />
                          View
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Admin Actions</h3>
        </div>
        <p className="text-xs text-gray-500 mt-2">Editing or deleting orders is not allowed. You can only view, track shipment, and inspect financial breakdown on the order detail page.</p>
      </div>
    </div>
  );
};

export default Orders;
