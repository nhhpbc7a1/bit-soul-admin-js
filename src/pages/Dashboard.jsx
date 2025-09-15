import React from 'react';
import { Users, ShoppingBag, DollarSign, Package } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: 2847,
      change: { value: 12, type: 'increase' },
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Total Orders',
      value: 1429,
      change: { value: 8, type: 'increase' },
      icon: ShoppingBag,
      color: 'success'
    },
    {
      title: 'Revenue',
      value: '$89,247',
      change: { value: 15, type: 'increase' },
      icon: DollarSign,
      color: 'warning'
    },
    {
      title: 'Products',
      value: 342,
      change: { value: 3, type: 'decrease' },
      icon: Package,
      color: 'info'
    }
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      product: 'Premium Package',
      amount: '$299',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      product: 'Basic Package',
      amount: '$99',
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      product: 'Standard Package',
      amount: '$199',
      status: 'processing',
      date: '2024-01-14'
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Wilson',
      product: 'Premium Package',
      amount: '$299',
      status: 'completed',
      date: '2024-01-14'
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
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <Button variant="primary">
          <Package size={16} />
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="font-medium text-primary-600">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td className="font-medium">{order.amount}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td className="text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Users</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-semibold text-yellow-600">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Low Stock Items</span>
                <span className="font-semibold text-red-600">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">New Messages</span>
                <span className="font-semibold text-blue-600">12</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start">
                <Users size={16} />
                Add New User
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Package size={16} />
                Add Product
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <ShoppingBag size={16} />
                View Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

