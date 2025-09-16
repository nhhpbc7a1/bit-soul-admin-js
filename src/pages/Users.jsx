import React, { useRef, useState, useEffect } from 'react';
import { Users as UsersIcon, Plus, Search, Filter, Eye, Edit, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const filterAnchorRef = useRef(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isFilterOpen && filterAnchorRef.current) {
      const rect = filterAnchorRef.current.getBoundingClientRect();
      setPopoverPos({ top: rect.bottom + 8, left: rect.right - 256 }); // 256px ~ popover width
    }
  }, [isFilterOpen]);

  const users = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin', status: 'active', createdAt: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'user', status: 'active', createdAt: '2024-01-14' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'moderator', status: 'inactive', createdAt: '2024-01-13' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@example.com', role: 'user', status: 'pending', createdAt: '2024-01-12' },
    { id: '5', name: 'Tom Lee', email: 'tom.lee@example.com', role: 'user', status: 'active', createdAt: '2024-01-11' },
    { id: '6', name: 'Anna Cruz', email: 'anna.cruz@example.com', role: 'moderator', status: 'active', createdAt: '2024-01-10' },
    { id: '7', name: 'Peter Pan', email: 'peter.pan@example.com', role: 'user', status: 'inactive', createdAt: '2024-01-09' },
    { id: '8', name: 'Linda May', email: 'linda.may@example.com', role: 'admin', status: 'active', createdAt: '2024-01-08' },
    { id: '9', name: 'Chris Vo', email: 'chris.vo@example.com', role: 'user', status: 'pending', createdAt: '2024-01-07' },
    { id: '10', name: 'Kelly Tran', email: 'kelly.tran@example.com', role: 'user', status: 'active', createdAt: '2024-01-06' },
    { id: '11', name: 'David Kim', email: 'david.kim@example.com', role: 'user', status: 'active', createdAt: '2024-01-05' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="danger">Inactive</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <Badge variant="danger">Admin</Badge>;
      case 'moderator':
        return <Badge variant="warning">Moderator</Badge>;
      case 'user':
        return <Badge variant="info">User</Badge>;
      default:
        return <Badge variant="neutral">{role}</Badge>;
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !normalizedSearch ||
      u.name.toLowerCase().includes(normalizedSearch) ||
      u.email.toLowerCase().includes(normalizedSearch) ||
      u.id.toLowerCase().includes(normalizedSearch);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // pagination
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedUsers = filteredUsers.slice(startIdx, endIdx);

  const clearFilters = () => {
    setRoleFilter('all');
    setStatusFilter('all');
  };

  const changePage = (delta) => {
    setCurrentPage((p) => Math.min(Math.max(1, p + delta), totalPages));
  };

  return (
    <div className="space-y-6">
      {/* Page Header with actions on the right */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/users/create" className="block">
            <Button variant="primary">
              <Plus size={16} />
              Add New User
            </Button>
          </Link>
          <Button variant="outline">
            <Download size={16} />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Content: users table */}
      <div className="space-y-6">
        {/* Main table */}
        <div>
          <div className="card" style={{ overflow: 'visible' }}>
            <div className="p-6 border-b border-gray-200" style={{ overflow: 'visible' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                <div className="flex items-center gap-3 relative" ref={filterAnchorRef}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-input pl-10 w-64"
                    />
                  </div>
                  <select
                    className="form-input w-28"
                    value={pageSize}
                    onChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setCurrentPage(1); }}
                    title="Items per page"
                  >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                  </select>
                  <Button variant="outline" size="sm" onClick={() => setIsFilterOpen((v) => !v)}>
                    <Filter size={16} />
                    Filter
                  </Button>
                </div>
              </div>
            </div>

            {/* Natural-height table body (no inner scroll) */}
            <table className="table">
              <thead>
                <tr>
                  <th className="static">User</th>
                  <th className="static">Email</th>
                  <th className="static">Role</th>
                  <th className="static">Status</th>
                  <th className="static">Created</th>
                  <th className="static">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-medium text-sm">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">ID: {user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-gray-600">{user.email}</td>
                        <td>{getRoleBadge(user.role)}</td>
                        <td>{getStatusBadge(user.status)}</td>
                        <td className="text-gray-500">{user.createdAt}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Link to={`/users/${user.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye size={14} />
                                View
                              </Button>
                            </Link>
                            <Link to={`/users/${user.id}/edit`}>
                              <Button variant="outline" size="sm">
                                <Edit size={14} />
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {Math.min(totalItems, startIdx + 1)}-{Math.min(totalItems, endIdx)} of {totalItems}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => changePage(-1)} disabled={safePage === 1}>
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm text-gray-700">Page {safePage} / {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => changePage(1)} disabled={safePage === totalPages}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter popover rendered as fixed so it's not clipped */}
      {isFilterOpen && (
        <div
          className="fixed z-50 w-64 bg-white border border-gray-200 rounded-lg shadow-card p-4 space-y-3"
          style={{ top: popoverPos.top, left: popoverPos.left }}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900">Filters</h4>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsFilterOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Role</label>
            <select className="form-input px-3 py-2" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Status</label>
            <select className="form-input px-3 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Button variant="secondary" size="sm" onClick={clearFilters}>Clear</Button>
            <Button variant="primary" size="sm" onClick={() => setIsFilterOpen(false)}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
