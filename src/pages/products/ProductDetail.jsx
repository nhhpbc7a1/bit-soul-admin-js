import React, { useState } from 'react';
import { ArrowLeft, Edit, Eye, Star, Package, DollarSign, Calendar, Tag, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ProductDetail = () => {
  const { id } = useParams();
  
  // Mock product data - in real app, fetch based on ID
  const [product] = useState({
    id: id || '1',
    name: 'Premium Wireless Headphones',
    sku: 'PWH-2024-001',
    description: 'Experience premium sound quality with our latest wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort design.',
    shortDescription: 'Premium wireless headphones with active noise cancellation',
    price: 299.99,
    salePrice: 249.99,
    cost: 150.00,
    currency: 'USD',
    status: 'active',
    stock: 45,
    lowStockThreshold: 10,
    category: 'Electronics',
    categoryId: '1',
    brand: 'TechBrand',
    // Dropshipping specific data
    seller: {
      id: 'S001',
      name: 'TechStore VN',
      email: 'tech@store.vn',
      phone: '+84 123 456 789',
      rating: 4.8,
      totalProducts: 156,
      joinedDate: '2023-06-15'
    },
    supplier: {
      id: 'SUP001',
      name: 'Electronics Supplier Co',
      sku: 'ES-PWH-001',
      cost: 150.00,
      email: 'supplier@electronics.com',
      phone: '+86 138 0013 8000',
      location: 'Shenzhen, China'
    },
    financial: {
      sellingPrice: 249.99,
      supplierCost: 150.00,
      platformFee: 24.99,
      sellerCommission: 74.99,
      platformProfit: 0.01,
      margin: 39.98
    },
    weight: '0.5',
    dimensions: '20cm x 18cm x 8cm',
    rating: 4.5,
    reviewCount: 128,
    totalSales: 1250,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    specifications: [
      { name: 'Driver Size', value: '40mm' },
      { name: 'Frequency Response', value: '20Hz - 20kHz' },
      { name: 'Impedance', value: '32 Ohm' },
      { name: 'Battery Life', value: '30 hours' },
      { name: 'Charging Time', value: '2 hours' },
      { name: 'Bluetooth Version', value: '5.2' },
      { name: 'Noise Cancellation', value: 'Active ANC' },
      { name: 'Weight', value: '250g' }
    ],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge (15 min = 3 hours)',
      'Premium leather padding',
      'Foldable design',
      'Touch controls',
      'Voice assistant compatible',
      'Wireless & wired connectivity'
    ],
    tags: ['wireless', 'bluetooth', 'headphones', 'noise-cancelling', 'premium'],
    seo: {
      metaTitle: 'Premium Wireless Headphones - TechBrand',
      metaDescription: 'Experience premium sound quality with active noise cancellation and 30-hour battery life.',
      keywords: 'wireless headphones, bluetooth, noise cancelling, premium audio'
    }
  });

  const [selectedImage, setSelectedImage] = useState(0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="danger">Inactive</Badge>;
      case 'draft':
        return <Badge variant="warning">Draft</Badge>;
      case 'out_of_stock':
        return <Badge variant="danger">Out of Stock</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getStockStatus = () => {
    if (product.stock === 0) {
      return <Badge variant="danger">Out of Stock</Badge>;
    } else if (product.stock <= product.lowStockThreshold) {
      return <Badge variant="warning">Low Stock</Badge>;
    } else {
      return <Badge variant="success">In Stock</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-1">SKU: {product.sku}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/products">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Products
            </Button>
          </Link>
          <Button variant="warning">
            Hide Product
          </Button>
          <Link to={`/analysis/products?product=${product.id}`}>
            <Button variant="secondary">
              <Eye size={16} />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images & Details */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Product Images */}
            <div className="card">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Image */}
                  <div>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Image Thumbnails */}
                  <div>
                    <div className="grid grid-cols-3 gap-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                            selectedImage === index ? 'border-primary-500' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">{spec.name}</span>
                          <span className="text-gray-900 font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller & Supplier Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seller Information */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Seller Information</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Seller Name</label>
                      <p className="text-gray-900 font-medium">{product.seller.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Contact</label>
                      <p className="text-gray-900">{product.seller.email}</p>
                      <p className="text-gray-900">{product.seller.phone}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Rating</label>
                        <p className="text-gray-900">{product.seller.rating}/5</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Products</label>
                        <p className="text-gray-900">{product.seller.totalProducts}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Joined</label>
                      <p className="text-gray-900">{product.seller.joinedDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supplier Information */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Supplier Information</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Supplier Name</label>
                      <p className="text-gray-900 font-medium">{product.supplier.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Supplier SKU</label>
                      <p className="text-gray-900 font-mono">{product.supplier.sku}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Contact</label>
                      <p className="text-gray-900">{product.supplier.email}</p>
                      <p className="text-gray-900">{product.supplier.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Location</label>
                      <p className="text-gray-900">{product.supplier.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Supplier Cost</label>
                      <p className="text-lg font-bold text-green-600">${product.supplier.cost}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Financial Summary</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">${product.financial.sellingPrice}</div>
                    <div className="text-sm text-gray-500">Selling Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">${product.financial.supplierCost}</div>
                    <div className="text-sm text-gray-500">Supplier Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">${product.financial.platformFee}</div>
                    <div className="text-sm text-gray-500">Platform Fee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">${product.financial.sellerCommission}</div>
                    <div className="text-sm text-gray-500">Seller Commission</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{product.financial.margin}%</div>
                    <div className="text-sm text-gray-500">Profit Margin</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Flow</h4>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Customer pays ${product.financial.sellingPrice}</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Platform receives</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Supplier gets ${product.financial.supplierCost}</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Seller gets ${product.financial.sellerCommission}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">SEO Information</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Meta Title</label>
                    <p className="text-gray-900">{product.seo.metaTitle}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Meta Description</label>
                    <p className="text-gray-900">{product.seo.metaDescription}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Keywords</label>
                    <p className="text-gray-900">{product.seo.keywords}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Status & Pricing */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Product Status</h3>
                  {getStatusBadge(product.status)}
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Price</label>
                    <div className="flex items-center gap-2">
                      {product.salePrice < product.price && (
                        <span className="text-lg text-gray-400 line-through">${product.price}</span>
                      )}
                      <span className="text-2xl font-bold text-gray-900">${product.salePrice || product.price}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Cost</label>
                    <p className="text-gray-900">${product.cost}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Profit Margin</label>
                    <p className="text-gray-900">
                      {(((product.salePrice || product.price) - product.cost) / (product.salePrice || product.price) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Information */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Stock</h3>
                  {getStockStatus()}
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Stock</label>
                    <p className="text-2xl font-bold text-gray-900">{product.stock}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Low Stock Alert</label>
                    <p className="text-gray-900">{product.lowStockThreshold} units</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600">Rating</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{product.rating}/5</p>
                      <p className="text-xs text-gray-500">{product.reviewCount} reviews</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Total Sales</span>
                    </div>
                    <p className="font-medium text-gray-900">{product.totalSales}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category & Tags */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Category & Tags</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <p className="text-gray-900">{product.category}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Brand</label>
                    <p className="text-gray-900">{product.brand}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tags</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="neutral" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Weight</label>
                    <p className="text-gray-900">{product.weight} kg</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Dimensions</label>
                    <p className="text-gray-900">{product.dimensions}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created</label>
                    <p className="text-gray-900">{product.createdAt}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-gray-900">{product.updatedAt}</p>
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

export default ProductDetail;
