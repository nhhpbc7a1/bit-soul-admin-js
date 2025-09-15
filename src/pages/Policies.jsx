import React, { useState } from 'react';
import { FileText, Plus, Search, Edit, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const policies = [
    {
      id: '1',
      title: 'Terms of Service',
      description: 'Platform terms and conditions for all users',
      status: 'published',
      version: '2.1',
      lastUpdated: '2024-01-10',
      createdAt: '2023-06-15',
      wordCount: 2450,
      category: 'Legal'
    },
    {
      id: '2', 
      title: 'Privacy Policy',
      description: 'Data collection and privacy protection guidelines',
      status: 'published',
      version: '1.8',
      lastUpdated: '2024-01-05',
      createdAt: '2023-06-15',
      wordCount: 1820,
      category: 'Legal'
    },
    {
      id: '3',
      title: 'Seller Agreement',
      description: 'Terms and conditions for sellers on the platform',
      status: 'draft',
      version: '3.0',
      lastUpdated: '2024-01-12',
      createdAt: '2024-01-01',
      wordCount: 3200,
      category: 'Business'
    },
    {
      id: '4',
      title: 'Supplier Guidelines',
      description: 'Guidelines and requirements for suppliers',
      status: 'published',
      version: '1.5',
      lastUpdated: '2023-12-20',
      createdAt: '2023-08-10',
      wordCount: 2100,
      category: 'Business'
    },
    {
      id: '5',
      title: 'Return & Refund Policy',
      description: 'Customer return and refund procedures',
      status: 'review',
      version: '2.2',
      lastUpdated: '2024-01-08',
      createdAt: '2023-07-01',
      wordCount: 1650,
      category: 'Customer Service'
    },
    {
      id: '6',
      title: 'Community Guidelines',
      description: 'Rules and guidelines for platform community',
      status: 'published',
      version: '1.3',
      lastUpdated: '2023-11-15',
      createdAt: '2023-09-01',
      wordCount: 980,
      category: 'Community'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge variant="success"><CheckCircle size={12} /> Published</Badge>;
      case 'draft':
        return <Badge variant="warning"><Edit size={12} /> Draft</Badge>;
      case 'review':
        return <Badge variant="info"><Clock size={12} /> Under Review</Badge>;
      case 'archived':
        return <Badge variant="neutral">Archived</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Legal':
        return 'bg-red-100 text-red-800';
      case 'Business':
        return 'bg-blue-100 text-blue-800';
      case 'Customer Service':
        return 'bg-green-100 text-green-800';
      case 'Community':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policies Management</h1>
          <p className="text-gray-600 mt-1">Create, manage, and publish platform policies and legal documents</p>
        </div>
        <Button variant="primary">
          <Plus size={16} />
          Create New Policy
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md">
              All Policies
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Published Only
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">Under Review</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => (
          <div key={policy.id} className="card card-hover">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-500" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(policy.category)}`}>
                    {policy.category}
                  </span>
                </div>
                {getStatusBadge(policy.status)}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{policy.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Version:</span>
                  <span className="text-gray-900 font-medium">v{policy.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Word Count:</span>
                  <span className="text-gray-900">{policy.wordCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="text-gray-900">{policy.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm" className="flex-1">
                  <Edit size={14} />
                  Edit Policy
                </Button>
                <Button variant="secondary" size="sm">
                  <Eye size={14} />
                  View
                </Button>
              </div>
              
              {policy.status === 'draft' && (
                <div className="mt-3">
                  <Button variant="success" size="sm" className="w-full">
                    <CheckCircle size={14} />
                    Publish Policy
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {policies.filter(p => p.status === 'published').length}
            </div>
            <div className="text-sm text-gray-500">Published Policies</div>
          </div>
        </div>
        <div className="card text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {policies.filter(p => p.status === 'draft').length}
            </div>
            <div className="text-sm text-gray-500">Draft Policies</div>
          </div>
        </div>
        <div className="card text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {policies.filter(p => p.status === 'review').length}
            </div>
            <div className="text-sm text-gray-500">Under Review</div>
          </div>
        </div>
        <div className="card text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {policies.reduce((sum, p) => sum + p.wordCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Words</div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredPolicies.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <Button variant="primary">
            <Plus size={16} />
            Create First Policy
          </Button>
        </div>
      )}
    </div>
  );
};

export default Policies;
