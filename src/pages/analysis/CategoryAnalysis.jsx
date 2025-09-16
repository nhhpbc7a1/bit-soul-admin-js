import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Calendar,
  Eye,
  Users
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const CategoryAnalysis = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [viewMode, setViewMode] = useState('revenue');

  // Mock data for category analysis
  const categoryData = [
    {
      id: 'cat001',
      name: 'Electronics',
      revenue: 45230,
      orders: 189,
      products: 45,
      conversion: 8.5,
      avgOrderValue: 239.3,
      growth: 15.2,
      trend: 'up',
      marketShare: 32.1
    },
    {
      id: 'cat002',
      name: 'Fashion & Apparel',
      revenue: 32180,
      orders: 267,
      products: 78,
      conversion: 12.3,
      avgOrderValue: 120.5,
      growth: 8.7,
      trend: 'up',
      marketShare: 22.8
    },
    {
      id: 'cat003',
      name: 'Home & Garden',
      revenue: 28940,
      orders: 145,
      products: 52,
      conversion: 6.8,
      avgOrderValue: 199.6,
      growth: 3.2,
      trend: 'stable',
      marketShare: 20.5
    },
    {
      id: 'cat004',
      name: 'Health & Beauty',
      revenue: 18750,
      orders: 98,
      products: 34,
      conversion: 9.1,
      avgOrderValue: 191.3,
      growth: -2.1,
      trend: 'down',
      marketShare: 13.3
    },
    {
      id: 'cat005',
      name: 'Sports & Outdoors',
      revenue: 15680,
      orders: 67,
      products: 28,
      conversion: 7.4,
      avgOrderValue: 234.0,
      growth: 11.8,
      trend: 'up',
      marketShare: 11.1
    }
  ];

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

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Mock chart data
  const chartData = {
    categoryGrowth: [
      { category: 'Electronics', current: 45230, previous: 39200, growth: 15.2 },
      { category: 'Fashion', current: 32180, previous: 29600, growth: 8.7 },
      { category: 'Home & Garden', current: 28940, previous: 28050, growth: 3.2 },
      { category: 'Health & Beauty', current: 18750, previous: 19150, growth: -2.1 },
      { category: 'Sports', current: 15680, previous: 14030, growth: 11.8 }
    ],
    monthlyTrend: [
      { month: 'Jan', electronics: 38000, fashion: 28000, home: 25000, health: 16000, sports: 12000 },
      { month: 'Feb', electronics: 41000, fashion: 30000, home: 26000, health: 17000, sports: 13000 },
      { month: 'Mar', electronics: 43000, fashion: 31000, home: 27000, health: 18000, sports: 14000 },
      { month: 'Apr', electronics: 44000, fashion: 31500, home: 27500, health: 18500, sports: 14500 },
      { month: 'May', electronics: 45000, fashion: 32000, home: 28000, health: 18600, sports: 15000 },
      { month: 'Jun', electronics: 45230, fashion: 32180, home: 28940, health: 18750, sports: 15680 }
    ],
    marketShare: [
      { category: 'Electronics', share: 32.1, color: '#3B82F6' },
      { category: 'Fashion', share: 22.8, color: '#10B981' },
      { category: 'Home & Garden', share: 20.5, color: '#F59E0B' },
      { category: 'Health & Beauty', share: 13.3, color: '#EF4444' },
      { category: 'Sports', share: 11.1, color: '#8B5CF6' }
    ]
  };

  const maxRevenue = Math.max(...chartData.monthlyTrend.map(d => 
    d.electronics + d.fashion + d.home + d.health + d.sports
  ));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Analysis</h1>
          <p className="text-gray-600 mt-1">Analyze category performance and market trends</p>
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
                value={viewMode} 
                onChange={(e) => setViewMode(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="revenue">Sort by Revenue</option>
                <option value="orders">Sort by Orders</option>
                <option value="growth">Sort by Growth</option>
                <option value="marketShare">Sort by Market Share</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$140,780</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+7.2% from last period</p>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">766</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+5.8% from last period</p>
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
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">$183.8</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+1.4% from last period</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share Pie Chart */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Market Share Distribution</h3>
          </div>
          <div className="p-6">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {(() => {
                  let cumulativePercentage = 0;
                  return chartData.marketShare.map((item, index) => {
                    const startAngle = cumulativePercentage * 3.6;
                    const endAngle = (cumulativePercentage + item.share) * 3.6;
                    cumulativePercentage += item.share;
                    
                    const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                    
                    const largeArcFlag = item.share > 50 ? 1 : 0;
                    const pathData = [
                      `M 50 50`,
                      `L ${x1} ${y1}`,
                      `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ].join(' ');
                    
                    return (
                      <path
                        key={index}
                        d={pathData}
                        fill={item.color}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$140,780</div>
                  <div className="text-sm text-gray-500">Total Revenue</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {chartData.marketShare.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">{item.category}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Growth Chart */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Category Growth Comparison</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {chartData.categoryGrowth.map((data, index) => (
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
                          width: `${Math.min(Math.abs(data.growth) * 2, 100)}%`,
                          backgroundColor: data.growth > 0 ? '#10B981' : '#EF4444'
                        }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium w-16 text-right ${
                      data.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.growth > 0 ? '+' : ''}{data.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Trend */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Trend by Category</h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-end justify-between gap-1">
            {chartData.monthlyTrend.map((data, index) => {
              const totalRevenue = data.electronics + data.fashion + data.home + data.health + data.sports;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-gray-100 rounded-t-lg relative group">
                    {/* Electronics */}
                    <div 
                      className="bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                      style={{ 
                        height: `${(data.electronics / maxRevenue) * 200}px`,
                        minHeight: '4px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Electronics: ${data.electronics.toLocaleString()}
                      </div>
                    </div>
                    {/* Fashion */}
                    <div 
                      className="bg-green-500 transition-all duration-500 hover:bg-green-600"
                      style={{ 
                        height: `${(data.fashion / maxRevenue) * 200}px`,
                        minHeight: '4px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Fashion: ${data.fashion.toLocaleString()}
                      </div>
                    </div>
                    {/* Home & Garden */}
                    <div 
                      className="bg-yellow-500 transition-all duration-500 hover:bg-yellow-600"
                      style={{ 
                        height: `${(data.home / maxRevenue) * 200}px`,
                        minHeight: '4px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Home: ${data.home.toLocaleString()}
                      </div>
                    </div>
                    {/* Health & Beauty */}
                    <div 
                      className="bg-red-500 transition-all duration-500 hover:bg-red-600"
                      style={{ 
                        height: `${(data.health / maxRevenue) * 200}px`,
                        minHeight: '4px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Health: ${data.health.toLocaleString()}
                      </div>
                    </div>
                    {/* Sports */}
                    <div 
                      className="bg-purple-500 rounded-b-lg transition-all duration-500 hover:bg-purple-600"
                      style={{ 
                        height: `${(data.sports / maxRevenue) * 200}px`,
                        minHeight: '4px'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Sports: ${data.sports.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Electronics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Fashion</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Home & Garden</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Health & Beauty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Sports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
            <Link to="/categories" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Manage Categories →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Order Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categoryData.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-500">ID: {category.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${category.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category.products}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category.conversion}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${category.avgOrderValue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon(category.trend)}
                      <span className={`ml-1 text-sm ${getGrowthColor(category.growth)}`}>
                        {category.growth > 0 ? '+' : ''}{category.growth}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category.marketShare}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/categories/${category.id}`}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      View Details
                    </Link>
                    <Link 
                      to={`/categories/${category.id}/edit`}
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

      {/* Category Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Growing Categories */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Growing Categories</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categoryData
                .filter(cat => cat.trend === 'up')
                .sort((a, b) => b.growth - a.growth)
                .map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-full mr-3">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.products} products</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+{category.growth}%</div>
                      <div className="text-xs text-gray-500">${category.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Declining Categories */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Categories Needing Attention</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categoryData
                .filter(cat => cat.trend === 'down')
                .map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-full mr-3">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.products} products</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-red-600">{category.growth}%</div>
                      <div className="text-xs text-gray-500">${category.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="card">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">
              <BarChart3 size={16} className="mr-2" />
              Generate Category Report
            </Button>
            <Button variant="secondary" size="sm">
              <PieChart size={16} className="mr-2" />
              View Market Share Chart
            </Button>
            <Button variant="warning" size="sm">
              <TrendingDown size={16} className="mr-2" />
              Review Declining Categories
            </Button>
            <Button variant="secondary" size="sm">
              <Download size={16} className="mr-2" />
              Export Category Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;
