import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Target,
  ArrowRight,
  Eye,
  ShoppingCart,
  DollarSign,
  Package,
  Tag
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Analysis = () => {
  const analysisModules = [
    {
      id: 'product-analysis',
      title: 'Product Analysis',
      description: 'Comprehensive product performance, analytics, and user behavior insights',
      icon: TrendingUp,
      path: '/analysis/products',
      metrics: [
        { label: 'Total Products', value: '8', color: 'blue' },
        { label: 'Top Performers', value: '4', color: 'green' },
        { label: 'Total Revenue', value: '$75,080', color: 'purple' }
      ],
      features: ['Product Performance', 'Best Sellers & Low Performers', 'Detailed Analytics', 'User Behavior', 'Conversion Tracking']
    },
    {
      id: 'category-analysis',
      title: 'Category Analysis',
      description: 'Revenue by category, market trends, and category performance insights',
      icon: PieChart,
      path: '/analysis/categories',
      metrics: [
        { label: 'Active Categories', value: '5', color: 'blue' },
        { label: 'Market Leaders', value: '3', color: 'green' },
        { label: 'Total Revenue', value: '$140,780', color: 'purple' }
      ],
      features: ['Revenue by Category', 'Market Share Analysis', 'Category Trends', 'Growth Metrics', 'Performance Comparison']
    }
  ];

  const getMetricColor = (color) => {
    switch(color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'red': return 'text-red-600 bg-red-100';
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analysis Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive analytics and insights for your business</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$168,010</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12.5% from last period</p>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">1,073</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+8.2% from last period</p>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">237</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12 new products</p>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Categories</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Tag className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">All categories active</p>
          </div>
        </div>
      </div>

      {/* Analysis Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analysisModules.map((module) => {
          const IconComponent = module.icon;
          
          return (
            <div key={module.id} className="card hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    </div>
                  </div>
                  <Link to={module.path}>
                    <Button variant="primary" size="sm">
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {module.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getMetricColor(metric.color)}`}>
                        {metric.value}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link to={module.path} className="block">
                    <Button variant="secondary" size="sm" className="w-full">
                      <Eye size={16} className="mr-2" />
                      View Analysis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Admin Actions */}
      <div className="card">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">
              <BarChart3 size={16} className="mr-2" />
              Generate Full Report
            </Button>
            <Button variant="secondary" size="sm">
              <PieChart size={16} className="mr-2" />
              Export Analytics Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
