import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  CreditCard,
  AlertTriangle,
  Settings,
  Palette,
  Menu,
  X,
  Cpu,
  Tag,
  Package,
  FileText,
  BarChart3
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
  { id: 'users', label: 'Users', icon: Users, path: '/users', badge: 2847, badgeColor: 'primary' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/orders', badge: 23, badgeColor: 'primary' },
  { id: 'products', label: 'Products', icon: Package, path: '/products', badge: 342, badgeColor: 'primary' },
  { id: 'categories', label: 'Categories', icon: Tag, path: '/categories' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payments' },
  { id: 'packages', label: 'Packages', icon: Package, path: '/packages' },
  { id: 'complaints', label: 'Complaints', icon: AlertTriangle, path: '/complaints', badge: 7, badgeColor: 'danger' },
  { id: 'analysis', label: 'Analysis', icon: BarChart3, path: '/analysis' },
  { id: 'policies', label: 'Policies', icon: FileText, path: '/policies' },
  { id: 'ai-operations', label: 'AI Operations', icon: Cpu, path: '/ai-operations' },
  { id: 'system-config', label: 'System Config', icon: Settings, path: '/system-config' },
  { id: 'ui-content', label: 'UI & Content', icon: Palette, path: '/ui-content' },
];

const getBadgeColor = (color) => {
  switch (color) {
    case 'danger':
      return 'bg-red-500 hover:bg-red-600'; // Chỉ cho complaints/urgent
    case 'primary':
      return 'bg-primary-500 hover:bg-primary-600'; // Cho tất cả info badges
    default:
      return 'bg-gray-500 hover:bg-gray-600'; // Fallback
  }
};

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-white shadow-sidebar border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        lg:translate-x-0
        ${isCollapsed ? 'translate-x-0' : 'translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BS</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-gray-900">BitSoul</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
          
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  nav-link group relative
                  ${isActive ? 'nav-link-active bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}
                  ${isCollapsed ? 'justify-center px-2' : 'px-3'}
                `}
                title={isCollapsed ? item.label : ''}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <IconComponent size={20} />
                  {!isCollapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </div>
                
                {/* Badge */}
                {item.badge && (
                  <span className={`
                    inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded-full ml-auto
                    ${isCollapsed ? 'absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center' : ''}
                    ${getBadgeColor(item.badgeColor)}
                  `}>
                    {item.badge > 999 ? '999+' : item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.label}
                    {item.badge && (
                      <span className={`ml-2 px-1.5 py-0.5 text-white text-xs rounded-full ${getBadgeColor(item.badgeColor)}`}>
                        {item.badge > 999 ? '999+' : item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">A</span>
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@bitsoul.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;

