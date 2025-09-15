import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Payments from './pages/Payments';
import Packages from './pages/Packages';
import Complaints from './pages/Complaints';
import AIOperations from './pages/AIOperations';
import SystemConfig from './pages/SystemConfig';
import UIContent from './pages/UIContent';

// Child pages
import CreateUser from './pages/users/CreateUser';
import UserDetail from './pages/users/UserDetail';
import EditUser from './pages/users/EditUser';
import CreateCategory from './pages/categories/CreateCategory';
import OrderDetail from './pages/orders/OrderDetail';
import ProductDetail from './pages/products/ProductDetail';
import ProductApproval from './pages/products/ProductApproval';
import CreatePackage from './pages/packages/CreatePackage';
import PackageDetail from './pages/packages/PackageDetail';
import EditPackage from './pages/packages/EditPackage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            
            {/* Users Routes */}
            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="users/:id/edit" element={<EditUser />} />
            
            {/* Categories Routes */}
            <Route path="categories" element={<Categories />} />
            <Route path="categories/create" element={<CreateCategory />} />
            
            {/* Orders Routes */}
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            
            {/* Products Routes */}
            <Route path="products" element={<Products />} />
            <Route path="products/approval" element={<ProductApproval />} />
            <Route path="products/:id" element={<ProductDetail />} />
            
            <Route path="payments" element={<Payments />} />
            
            {/* Packages Routes */}
            <Route path="packages" element={<Packages />} />
            <Route path="packages/create" element={<CreatePackage />} />
            <Route path="packages/:id" element={<PackageDetail />} />
            <Route path="packages/:id/edit" element={<EditPackage />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="ai-operations" element={<AIOperations />} />
            <Route path="system-config" element={<SystemConfig />} />
            <Route path="ui-content" element={<UIContent />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;