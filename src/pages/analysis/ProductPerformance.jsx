import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Eye, 
  ShoppingCart, 
  DollarSign,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Calendar,
  Clock
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ProductPerformance = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  
  const [timeRange, setTimeRange] = useState('30d');
  const [sortBy, setSortBy] = useState('revenue');

  // Mock data for all products
  const allProducts = [
    {
      id: 'prod001',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      revenue: 15420,
      orders: 89,
      conversion: 7.1,
      rating: 4.8,
      views: 1250,
      uniqueViews: 980,
      addToCart: 156,
      purchases: 89,
      bounceRate: 28.5,
      avgTimeOnPage: 245,
      reviews: 124,
      trend: 'up'
    },
    {
      id: 'prod002', 
      name: 'Smart Fitness Watch',
      category: 'Wearables',
      revenue: 12890,
      orders: 67,
      conversion: 6.8,
      rating: 4.6,
      views: 980,
      uniqueViews: 756,
      addToCart: 134,
      purchases: 67,
      bounceRate: 32.1,
      avgTimeOnPage: 189,
      reviews: 89,
      trend: 'up'
    },
    {
      id: 'prod003',
      name: 'Organic Coffee Beans',
      category: 'Food & Beverage',
      revenue: 9870,
      orders: 145,
      conversion: 6.9,
      rating: 4.7,
      views: 2100,
      uniqueViews: 1680,
      addToCart: 189,
      purchases: 145,
      bounceRate: 22.8,
      avgTimeOnPage: 156,
      reviews: 203,
      trend: 'stable'
    },
    {
      id: 'prod004',
      name: 'Vintage Vinyl Record',
      category: 'Music',
      revenue: 450,
      orders: 3,
      conversion: 1.7,
      rating: 3.2,
      views: 180,
      uniqueViews: 145,
      addToCart: 8,
      purchases: 3,
      bounceRate: 45.6,
      avgTimeOnPage: 89,
      reviews: 8,
      trend: 'down'
    },
    {
      id: 'prod005',
      name: 'Designer T-Shirt Collection',
      category: 'Fashion',
      revenue: 6750,
      orders: 45,
      conversion: 2.9,
      rating: 4.3,
      views: 1560,
      uniqueViews: 1200,
      addToCart: 98,
      purchases: 45,
      bounceRate: 38.2,
      avgTimeOnPage: 134,
      reviews: 67,
      trend: 'stable'
    },
    {
      id: 'prod006',
      name: 'Smart Home Security System',
      category: 'Home & Garden',
      revenue: 15600,
      orders: 52,
      conversion: 5.8,
      rating: 4.9,
      views: 890,
      uniqueViews: 720,
      addToCart: 78,
      purchases: 52,
      bounceRate: 25.4,
      avgTimeOnPage: 298,
      reviews: 89,
      trend: 'up'
    },
    {
      id: 'prod007',
      name: 'Professional Running Shoes',
      category: 'Sports',
      revenue: 11700,
      orders: 78,
      conversion: 5.8,
      rating: 4.6,
      views: 1340,
      uniqueViews: 1080,
      addToCart: 112,
      purchases: 78,
      bounceRate: 29.8,
      avgTimeOnPage: 167,
      reviews: 156,
      trend: 'up'
    },
    {
      id: 'prod008',
      name: 'Organic Skincare Set',
      category: 'Health & Beauty',
      revenue: 4200,
      orders: 28,
      conversion: 3.9,
      rating: 4.4,
      views: 720,
      uniqueViews: 580,
      addToCart: 45,
      purchases: 28,
      bounceRate: 34.5,
      avgTimeOnPage: 198,
      reviews: 45,
      trend: 'stable'
    }
  ];

  // Separate best sellers and low performers
  const bestSellers = allProducts.filter(p => p.trend === 'up' && p.revenue > 10000);
  const lowPerformers = allProducts.filter(p => p.trend === 'down' || p.revenue < 1000);
  
  // Get current product info if specific product is selected from URL
  const currentProduct = productId 
    ? allProducts.find(product => product.id === productId)
    : null;


  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Mock chart data
  const chartData = {
    revenueTrend: [
      { month: 'Jan', revenue: 12000, orders: 45 },
      { month: 'Feb', revenue: 15000, orders: 52 },
      { month: 'Mar', revenue: 18000, orders: 67 },
      { month: 'Apr', revenue: 22000, orders: 78 },
      { month: 'May', revenue: 25000, orders: 89 },
      { month: 'Jun', revenue: 28230, orders: 95 }
    ],
    categoryDistribution: [
      { category: 'Electronics', revenue: 45230, percentage: 32.1 },
      { category: 'Fashion', revenue: 32180, percentage: 22.8 },
      { category: 'Home & Garden', revenue: 28940, percentage: 20.5 },
      { category: 'Health & Beauty', revenue: 18750, percentage: 13.3 },
      { category: 'Sports', revenue: 15680, percentage: 11.1 }
    ],
    conversionTrend: [
      { day: '1', conversion: 6.2 },
      { day: '2', conversion: 7.1 },
      { day: '3', conversion: 5.8 },
      { day: '4', conversion: 8.3 },
      { day: '5', conversion: 7.9 },
      { day: '6', conversion: 6.7 },
      { day: '7', conversion: 8.1 }
    ]
  };

  const maxRevenue = Math.max(...chartData.revenueTrend.map(d => d.revenue));
  const maxOrders = Math.max(...chartData.revenueTrend.map(d => d.orders));
  const maxConversion = Math.max(...chartData.conversionTrend.map(d => d.conversion));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentProduct ? `${currentProduct.name} - Product Analysis` : 'Product Analysis'}
          </h1>
          <p className="text-gray-600 mt-1">
            {currentProduct 
              ? `Comprehensive analytics for ${currentProduct.name} in ${currentProduct.category} category`
              : 'Comprehensive product performance metrics and user behavior insights'
            }
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
          <Button variant="primary" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="revenue">Sort by Revenue</option>
                <option value="orders">Sort by Orders</option>
                <option value="conversion">Sort by Conversion</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$28,230</p>
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
                <p className="text-2xl font-bold text-gray-900">307</p>
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
                <p className="text-sm font-medium text-gray-600">Avg Conversion</p>
                <p className="text-2xl font-bold text-gray-900">7.3%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-red-600 mt-2">-2.1% from last period</p>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.3</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+0.2 from last period</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend (6 Months)</h3>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.revenueTrend.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-gray-100 rounded-t-lg relative">
                    <div 
                      className="bg-primary-500 rounded-t-lg transition-all duration-500 hover:bg-primary-600"
                      style={{ 
                        height: `${(data.revenue / maxRevenue) * 200}px`,
                        minHeight: '20px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                        ${data.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-500 rounded"></div>
                <span>Revenue</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Revenue by Category</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {chartData.categoryDistribution.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ 
                        backgroundColor: [
                          '#3B82F6', '#10B981', '#F59E0B', 
                          '#EF4444', '#8B5CF6'
                        ][index % 5]
                      }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{data.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${data.percentage}%`,
                          backgroundColor: [
                            '#3B82F6', '#10B981', '#F59E0B', 
                            '#EF4444', '#8B5CF6'
                          ][index % 5]
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      {data.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Trend Chart */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Conversion Rate Trend (Last 7 Days)</h3>
        </div>
        <div className="p-6">
          <div className="h-48 flex items-end justify-between gap-2">
            {chartData.conversionTrend.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full bg-gray-100 rounded-t-lg relative">
                  <div 
                    className="bg-green-500 rounded-t-lg transition-all duration-500 hover:bg-green-600"
                    style={{ 
                      height: `${(data.conversion / maxConversion) * 150}px`,
                      minHeight: '20px'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                      {data.conversion}%
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">Day {data.day}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Conversion Rate (%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All Products →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bestSellers.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">ID: {product.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary">{product.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${product.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.conversion}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-900">{product.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon(product.trend)}
                      <span className={`ml-1 text-sm ${getTrendColor(product.trend)}`}>
                        {product.trend === 'up' ? 'Growing' : product.trend === 'down' ? 'Declining' : 'Stable'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/products/${product.id}`}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      View Details
                    </Link>
                    <Link 
                      to={`/products/${product.id}/edit`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Products Analytics Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Products Analytics</h3>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <BarChart3 size={16} className="mr-2" />
                Chart View
              </Button>
              <Button variant="secondary" size="sm">
                <PieChart size={16} className="mr-2" />
                Pie Chart
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Add to Cart</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchases</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allProducts.map((product) => (
                <tr key={product.id} className={`hover:bg-gray-50 ${product.id === productId ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.views.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{product.uniqueViews} unique</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.addToCart}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.purchases}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      product.conversion >= 6 ? 'text-green-600' : 
                      product.conversion >= 4 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.conversion}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      product.bounceRate <= 25 ? 'text-green-600' : 
                      product.bounceRate <= 40 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.bounceRate}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{product.avgTimeOnPage}s</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${product.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/products/${product.id}`}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      View Details
                    </Link>
                    <Link 
                      to={`/products/${product.id}/edit`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="card">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">
              <BarChart3 size={16} className="mr-2" />
              Generate Performance Report
            </Button>
            <Button variant="secondary" size="sm">
              <PieChart size={16} className="mr-2" />
              View Category Breakdown
            </Button>
            <Button variant="warning" size="sm">
              <TrendingDown size={16} className="mr-2" />
              Review Low Performers
            </Button>
            <Button variant="secondary" size="sm">
              <Download size={16} className="mr-2" />
              Export Analysis Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;
