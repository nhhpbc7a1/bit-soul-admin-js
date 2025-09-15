import React, { useState } from 'react';
import { ArrowLeft, Package, Edit, Trash2, Users, FolderOpen, HardDrive, HeadphonesIcon, Calendar, DollarSign, Star, TrendingUp, Eye, Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';

const PackageDetail = () => {
  const { id } = useParams();

  // Mock package data - in real app, fetch based on id
  const [packageData] = useState({
    id: '2',
    name: 'Professional',
    description: 'Ideal for growing businesses and professional developers who need advanced features and priority support',
    price: 29,
    originalPrice: 39,
    discount: 26,
    features: [
      '25 Projects',
      '100GB Storage', 
      'Priority Support',
      'Advanced Analytics',
      'Custom Domain',
      'API Access',
      'Team Collaboration',
      'SSL Certificate',
      'Automated Backup'
    ],
    duration: 30,
    durationType: 'days',
    status: 'active',
    category: 'professional',
    maxUsers: 10,
    maxProjects: 25,
    storage: '100GB',
    support: 'priority',
    analytics: true,
    api: true,
    customDomain: true,
    whiteLabel: false,
    sslCertificate: true,
    backup: true,
    priority: 'high',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20',
    subscribers: 156,
    revenue: 4524,
    conversionRate: 12.5,
    churnRate: 2.1,
    avgDuration: 45,
    rating: 4.8,
    reviews: 89,
    tags: ['Popular', 'Recommended', 'Best Value'],
    targetAudience: ['Small Businesses', 'Freelancers', 'Agencies', 'Startups'],
    competitors: [
      { name: 'Basic Starter', price: 9, comparison: 'Less features' },
      { name: 'Premium Enterprise', price: 99, comparison: 'More expensive' }
    ]
  });

  const stats = [
    {
      title: 'Active Subscribers',
      value: packageData.subscribers,
      change: { value: 12, type: 'increase' },
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Monthly Revenue',
      value: `$${packageData.revenue.toLocaleString()}`,
      change: { value: 8.5, type: 'increase' },
      icon: DollarSign,
      color: 'success'
    },
    {
      title: 'Conversion Rate',
      value: `${packageData.conversionRate}%`,
      change: { value: 2.1, type: 'increase' },
      icon: TrendingUp,
      color: 'warning'
    },
    {
      title: 'Customer Rating',
      value: packageData.rating,
      change: { value: 0.2, type: 'increase' },
      icon: Star,
      color: 'info'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="danger">Inactive</Badge>;
      case 'draft':
        return <Badge variant="neutral">Draft</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category) => {
    const variants = {
      basic: 'info',
      professional: 'warning',
      enterprise: 'primary',
      student: 'success'
    };
    return <Badge variant={variants[category]}>{category}</Badge>;
  };

  const getSupportLevel = (support) => {
    const levels = {
      email: 'Email Support',
      priority: 'Priority Support',
      phone: 'Phone Support',
      dedicated: 'Dedicated Support'
    };
    return levels[support] || support;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/packages">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900">{packageData.name}</h1>
              {getStatusBadge(packageData.status)}
              {getCategoryBadge(packageData.category)}
            </div>
            <p className="text-gray-600">{packageData.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to={`/packages/${id}/edit`}>
            <Button variant="secondary">
              <Edit size={16} />
              Edit Package
            </Button>
          </Link>
          <Button variant="danger">
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package Overview */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">${packageData.price}</span>
                        {packageData.originalPrice && (
                          <>
                            <span className="text-lg text-gray-400 line-through">${packageData.originalPrice}</span>
                            <Badge variant="success">{packageData.discount}% OFF</Badge>
                          </>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        per {packageData.duration} {packageData.durationType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Max Users</div>
                      <div className="text-sm text-gray-500">{packageData.maxUsers} users</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Max Projects</div>
                      <div className="text-sm text-gray-500">{packageData.maxProjects} projects</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <HardDrive className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Storage</div>
                      <div className="text-sm text-gray-500">{packageData.storage}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <HeadphonesIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Support Level</div>
                      <div className="text-sm text-gray-500">{getSupportLevel(packageData.support)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Created</div>
                      <div className="text-sm text-gray-500">
                        {new Date(packageData.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Rating</div>
                      <div className="text-sm text-gray-500">
                        {packageData.rating}/5.0 ({packageData.reviews} reviews)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Churn Rate</div>
                      <div className="text-sm text-gray-500">{packageData.churnRate}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Features</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${packageData.analytics ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-700">Analytics</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${packageData.api ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-700">API Access</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${packageData.customDomain ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-700">Custom Domain</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${packageData.whiteLabel ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-700">White Label</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${packageData.sslCertificate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-700">SSL Certificate</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${packageData.backup ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-700">Auto Backup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Audience</h3>
              
              <div className="flex flex-wrap gap-2">
                {packageData.targetAudience.map((audience, index) => (
                  <Badge key={index} variant="neutral">{audience}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  <Eye size={16} />
                  Preview Package
                </Button>
                
                <Link to={`/packages/${id}/edit`} className="block">
                  <Button variant="secondary" className="w-full">
                    <Edit size={16} />
                    Edit Package
                  </Button>
                </Link>
                
                <Button variant="ghost" className="w-full">
                  <Download size={16} />
                  Export Data
                </Button>
                
                <Button variant="danger" className="w-full">
                  <Trash2 size={16} />
                  Delete Package
                </Button>
              </div>
            </div>
          </div>

          {/* Package Tags */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Tags</h3>
              
              <div className="flex flex-wrap gap-2">
                {packageData.tags.map((tag, index) => (
                  <Badge key={index} variant="primary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Competitor Comparison */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Analysis</h3>
              
              <div className="space-y-3">
                {packageData.competitors.map((competitor, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-gray-900">{competitor.name}</span>
                      <span className="text-sm font-semibold text-gray-900">${competitor.price}</span>
                    </div>
                    <span className="text-xs text-gray-500">{competitor.comparison}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="text-sm font-medium text-gray-900">{packageData.conversionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${packageData.conversionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Churn Rate</span>
                    <span className="text-sm font-medium text-gray-900">{packageData.churnRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${packageData.churnRate * 10}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Customer Rating</span>
                    <span className="text-sm font-medium text-gray-900">{packageData.rating}/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(packageData.rating / 5) * 100}%` }}
                    ></div>
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

export default PackageDetail;
