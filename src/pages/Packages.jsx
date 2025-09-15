import React, { useState } from 'react';
import { Package, Plus, Search, Filter, Eye, Edit, Trash2, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    {
      title: 'Total Packages',
      value: 12,
      change: { value: 2, type: 'increase' },
      icon: Package,
      color: 'primary'
    },
    {
      title: 'Active Packages',
      value: 9,
      change: { value: 1, type: 'increase' },
      icon: Package,
      color: 'success'
    },
    {
      title: 'Popular Package',
      value: 'Premium',
      icon: Star,
      color: 'warning'
    },
    {
      title: 'Avg. Duration',
      value: '365 days',
      change: { value: 5, type: 'increase' },
      icon: Package,
      color: 'info'
    }
  ];

  const packages = [
    {
      id: '1',
      name: 'Basic Starter',
      description: 'Perfect for individuals and small projects getting started',
      price: 9,
      features: [
        '5 Projects',
        '10GB Storage',
        'Email Support',
        'Basic Analytics',
        'SSL Certificate'
      ],
      duration: 30,
      status: 'active'
    },
    {
      id: '2',
      name: 'Professional',
      description: 'Ideal for growing businesses and professional developers',
      price: 29,
      features: [
        '25 Projects',
        '100GB Storage',
        'Priority Support',
        'Advanced Analytics',
        'Custom Domain',
        'API Access',
        'Team Collaboration'
      ],
      duration: 30,
      status: 'active'
    },
    {
      id: '3',
      name: 'Premium Enterprise',
      description: 'Comprehensive solution for large organizations and enterprises',
      price: 99,
      features: [
        'Unlimited Projects',
        '1TB Storage',
        '24/7 Phone Support',
        'Enterprise Analytics',
        'White-label Solution',
        'Advanced API',
        'Team Management',
        'Custom Integrations',
        'Dedicated Account Manager'
      ],
      duration: 30,
      status: 'active'
    },
    {
      id: '4',
      name: 'Student Discount',
      description: 'Special pricing for students and educational institutions',
      price: 5,
      features: [
        '3 Projects',
        '5GB Storage',
        'Email Support',
        'Basic Analytics',
        'Educational Resources'
      ],
      duration: 30,
      status: 'active'
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

  const getPopularityBadge = (packageId) => {
    if (packageId === '3') {
      return <Badge variant="warning">Most Popular</Badge>;
    }
    if (packageId === '2') {
      return <Badge variant="info">Recommended</Badge>;
    }
    return null;
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Packages Management</h1>
          <p className="text-gray-600 mt-1">Create and manage subscription packages</p>
        </div>
        <Link to="/packages/create">
          <Button variant="primary">
            <Plus size={16} />
            Create Package
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className={`card card-hover relative ${pkg.id === '3' ? 'ring-2 ring-primary-200' : ''}`}>
            {/* Popular Badge */}
            {pkg.id === '3' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="p-6">
              {/* Package Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  {getPopularityBadge(pkg.id)}
                </div>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-500 ml-1">
                    /{pkg.duration === 365 ? 'year' : 'month'}
                  </span>
                  {pkg.duration === 365 && (
                    <div className="text-sm text-green-600 font-medium">
                      Save 20% annually
                    </div>
                  )}
                </div>

                {getStatusBadge(pkg.status)}
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link to={`/packages/${pkg.id}`} className="flex-1">
                  <Button 
                    variant={pkg.id === '3' ? 'primary' : 'secondary'} 
                    size="sm" 
                    className="w-full"
                  >
                    <Eye size={14} />
                    View Details
                  </Button>
                </Link>
                <Link to={`/packages/${pkg.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit size={14} />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;

