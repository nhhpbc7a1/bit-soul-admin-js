import React, { useState } from 'react';
import { CreditCard, Plus, Search, Filter, Eye, Download, RefreshCw, DollarSign } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  const stats = [
    {
      title: 'Total Revenue',
      value: '$89,247',
      change: { value: 15, type: 'increase' },
      icon: DollarSign,
      color: 'primary'
    },
    {
      title: 'Completed Payments',
      value: 1247,
      change: { value: 8, type: 'increase' },
      icon: CreditCard,
      color: 'success'
    },
    {
      title: 'Pending Payments',
      value: 23,
      change: { value: 12, type: 'increase' },
      icon: CreditCard,
      color: 'warning'
    },
    {
      title: 'Failed Payments',
      value: 18,
      change: { value: 3, type: 'decrease' },
      icon: CreditCard,
      color: 'danger'
    }
  ];

  const payments = [
    {
      id: 'PAY-001',
      orderId: 'ORD-001',
      amount: 299,
      method: 'credit_card',
      status: 'completed',
      transactionId: 'TXN-ABC123',
      createdAt: '2024-01-15'
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-002',
      amount: 99,
      method: 'paypal',
      status: 'pending',
      transactionId: 'TXN-DEF456',
      createdAt: '2024-01-15'
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-003',
      amount: 199,
      method: 'bank_transfer',
      status: 'completed',
      transactionId: 'TXN-GHI789',
      createdAt: '2024-01-14'
    },
    {
      id: 'PAY-004',
      orderId: 'ORD-004',
      amount: 299,
      method: 'credit_card',
      status: 'failed',
      transactionId: 'TXN-JKL012',
      createdAt: '2024-01-14'
    },
    {
      id: 'PAY-005',
      orderId: 'ORD-005',
      amount: 149,
      method: 'paypal',
      status: 'refunded',
      transactionId: 'TXN-MNO345',
      createdAt: '2024-01-13'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
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

  const getMethodBadge = (method) => {
    switch (method) {
      case 'credit_card':
        return <Badge variant="info">Credit Card</Badge>;
      case 'paypal':
        return <Badge variant="warning">PayPal</Badge>;
      case 'bank_transfer':
        return <Badge variant="success">Bank Transfer</Badge>;
      case 'cash':
        return <Badge variant="neutral">Cash</Badge>;
      default:
        return <Badge variant="neutral">{method}</Badge>;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (payment.transactionId && payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
          <p className="text-gray-600 mt-1">Track and manage payment transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Download size={16} />
            Export
          </Button>
          <Button variant="primary">
            <RefreshCw size={16} />
            Sync Payments
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Payment Methods Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Credit Card</span>
                </div>
                <span className="text-sm font-medium text-gray-900">65%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-600">P</span>
                  </div>
                  <span className="text-sm text-gray-700">PayPal</span>
                </div>
                <span className="text-sm font-medium text-gray-900">25%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">B</span>
                  </div>
                  <span className="text-sm text-gray-700">Bank Transfer</span>
                </div>
                <span className="text-sm font-medium text-gray-900">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search payments..."
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
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                  
                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="form-input w-40"
                  >
                    <option value="all">All Methods</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
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
                    <th>Payment ID</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td>
                        <span className="font-medium text-primary-600">#{payment.id}</span>
                      </td>
                      <td>
                        <span className="font-medium text-gray-900">#{payment.orderId}</span>
                      </td>
                      <td>
                        <span className="font-semibold text-gray-900">
                          ${payment.amount.toLocaleString()}
                        </span>
                      </td>
                      <td>{getMethodBadge(payment.method)}</td>
                      <td>{getStatusBadge(payment.status)}</td>
                      <td>
                        <span className="text-sm text-gray-500 font-mono">
                          {payment.transactionId || '-'}
                        </span>
                      </td>
                      <td className="text-gray-500">{payment.createdAt}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download size={14} />
                          </Button>
                          {payment.status === 'completed' && (
                            <Button variant="ghost" size="sm">
                              <RefreshCw size={14} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {filteredPayments.length} of {payments.length} payments
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500">
                    Total: <span className="font-semibold text-gray-900">${totalRevenue.toLocaleString()}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="secondary" size="sm">
                      Next
                    </Button>
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

export default Payments;

