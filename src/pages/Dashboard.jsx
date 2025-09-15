import React, { useState } from 'react';
import { Users, ShoppingBag, DollarSign, Package, TrendingUp, Activity, AlertCircle, UserPlus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const [activeChart, setActiveChart] = useState('revenue');

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
      id: 'ord001',
      orderNumber: '#ORD-001',
      customer: 'John Doe',
      product: 'Premium Package',
      amount: '$299',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 'ord002',
      orderNumber: '#ORD-002',
      customer: 'Jane Smith',
      product: 'Basic Package',
      amount: '$99',
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'ord003',
      orderNumber: '#ORD-003',
      customer: 'Mike Johnson',
      product: 'Standard Package',
      amount: '$199',
      status: 'processing',
      date: '2024-01-14'
    },
    {
      id: 'ord004',
      orderNumber: '#ORD-004',
      customer: 'Sarah Wilson',
      product: 'Premium Package',
      amount: '$299',
      status: 'completed',
      date: '2024-01-14'
    }
  ];

  // Recent Activity Log data
  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New seller registered: TechStore Inc.',
      timestamp: '2024-01-15 14:30',
      severity: 'info',
      icon: UserPlus
    },
    {
      id: 2,
      type: 'large_order',
      message: 'High-value order placed: $2,499 by Premium Corp',
      timestamp: '2024-01-15 13:45',
      severity: 'success',
      icon: ShoppingBag
    },
    {
      id: 3,
      type: 'system_alert',
      message: 'Server CPU usage above 80% threshold',
      timestamp: '2024-01-15 12:20',
      severity: 'warning',
      icon: AlertCircle
    },
    {
      id: 4,
      type: 'product_approval',
      message: '5 products pending approval in Electronics category',
      timestamp: '2024-01-15 11:15',
      severity: 'warning',
      icon: Package
    },
    {
      id: 5,
      type: 'revenue_milestone',
      message: 'Monthly revenue target achieved: $50,000',
      timestamp: '2024-01-15 10:00',
      severity: 'success',
      icon: DollarSign
    }
  ];

  // Mock chart data
  const chartData = {
    revenue: {
      title: 'Revenue Trend (Last 7 Days)',
      data: [45000, 52000, 48000, 61000, 55000, 67000, 89247],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    orders: {
      title: 'Order Volume (Last 7 Days)', 
      data: [120, 135, 98, 167, 145, 189, 203],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    users: {
      title: 'User Growth (Last 7 Days)',
      data: [15, 23, 18, 31, 25, 42, 38],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  };

  const getActivityIcon = (activity) => {
    const IconComponent = activity.icon;
    const colorClass = activity.severity === 'success' ? 'text-green-500' : 
                      activity.severity === 'warning' ? 'text-yellow-500' : 
                      activity.severity === 'error' ? 'text-red-500' : 'text-blue-500';
    return <IconComponent className={`w-4 h-4 ${colorClass}`} />;
  };

  const getActivityBadge = (severity) => {
    switch (severity) {
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'warning':
        return <Badge variant="warning">Warning</Badge>;
      case 'error':
        return <Badge variant="danger">Error</Badge>;
      default:
        return <Badge variant="info">Info</Badge>;
    }
  };

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

      {/* Graphical Reports */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            </div>
            <div className="flex gap-2">
              {Object.keys(chartData).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveChart(key)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeChart === key
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-900">{chartData[activeChart].title}</h4>
          </div>
          {/* Simple Bar Chart Visualization */}
          <div className="flex items-end justify-between h-64 bg-gray-50 rounded-lg p-4">
            {chartData[activeChart].data.map((value, index) => {
              const maxValue = Math.max(...chartData[activeChart].data);
              const height = (value / maxValue) * 200; // Max height 200px
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-primary-500 rounded-t w-8 transition-all duration-300 hover:bg-primary-600"
                    style={{ height: `${height}px` }}
                    title={`${chartData[activeChart].labels[index]}: ${value.toLocaleString()}`}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">
                    {chartData[activeChart].labels[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link to="/orders">
                  <Button variant="ghost" size="sm">
                    <Eye size={14} />
                    View All
                  </Button>
                </Link>
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
                      <td>
                        <Link to={`/orders/${order.id}`} className="font-medium text-primary-600 hover:text-primary-800">
                          {order.orderNumber}
                        </Link>
                      </td>
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

          {/* Recent Activity Log */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="mt-0.5">
                      {getActivityIcon(activity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {getActivityBadge(activity.severity)}
                    </div>
                  </div>
                ))}
              </div>
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
              <Link to="/users/create" className="block">
                <Button variant="primary" className="w-full justify-start">
                  <Users size={16} />
                  Add New User
                </Button>
              </Link>
              <Link to="/products" className="block">
                <Button variant="secondary" className="w-full justify-start">
                  <Package size={16} />
                  Manage Products
                </Button>
              </Link>
              <Link to="/orders" className="block">
                <Button variant="secondary" className="w-full justify-start">
                  <ShoppingBag size={16} />
                  View Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

