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
import Policies from './pages/Policies';
import AIOperations from './pages/AIOperations';
import SystemConfig from './pages/SystemConfig';
import UIContent from './pages/UIContent';
import Analysis from './pages/Analysis';

// Analysis pages
import ProductPerformance from './pages/analysis/ProductPerformance';
import CategoryAnalysis from './pages/analysis/CategoryAnalysis';

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
import CreatePolicy from './pages/policies/CreatePolicy';
import PolicyDetail from './pages/policies/PolicyDetail';
import EditPolicy from './pages/policies/EditPolicy';
import PolicyHistory from './pages/policies/PolicyHistory';
import AIConfiguration from './pages/ai-operations/AIConfiguration';
import CreateStaticPage from './pages/ui-content/CreateStaticPage';
import EditStaticPage from './pages/ui-content/EditStaticPage';
import StaticPageDetail from './pages/ui-content/StaticPageDetail';
import StaticPageHistory from './pages/ui-content/StaticPageHistory';
import ComplaintDetail from './pages/complaints/ComplaintDetail';

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
            
            {/* Analysis Routes */}
            <Route path="analysis" element={<Analysis />} />
            <Route path="analysis/products" element={<ProductPerformance />} />
            <Route path="analysis/categories" element={<CategoryAnalysis />} />
            
            {/* Policies Routes */}
            <Route path="policies" element={<Policies />} />
            <Route path="policies/create" element={<CreatePolicy />} />
            <Route path="policies/:id" element={<PolicyDetail />} />
            <Route path="policies/:id/edit" element={<EditPolicy />} />
            <Route path="policies/:id/history" element={<PolicyHistory />} />
            
            <Route path="ai-operations" element={<AIOperations />} />
            <Route path="ai-operations/configure" element={<AIConfiguration />} />
            <Route path="ai-operations/configure/:modelId" element={<AIConfiguration />} />

            {/* UI Content Routes */}
            <Route path="ui-content/pages/create" element={<CreateStaticPage />} />
            <Route path="ui-content/pages/:id" element={<StaticPageDetail />} />
            <Route path="ui-content/pages/:id/edit" element={<EditStaticPage />} />
            <Route path="ui-content/pages/:id/history" element={<StaticPageHistory />} />

            {/* Complaints Routes */}
            <Route path="complaints/:id" element={<ComplaintDetail />} />
            
            <Route path="system-config" element={<SystemConfig />} />
            <Route path="ui-content" element={<UIContent />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;