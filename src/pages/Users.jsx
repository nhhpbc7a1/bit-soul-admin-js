import React, { useState } from 'react';
import { Users as UsersIcon, Plus, Search, Filter, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    {
      title: 'Total Users',
      value: 2847,
      change: { value: 12, type: 'increase' },
      icon: UsersIcon,
      color: 'primary'
    },
    {
      title: 'Active Users',
      value: 2156,
      change: { value: 8, type: 'increase' },
      icon: UsersIcon,
      color: 'success'
    },
    {
      title: 'New This Month',
      value: 234,
      change: { value: 15, type: 'increase' },
      icon: UsersIcon,
      color: 'info'
    },
    {
      title: 'Inactive Users',
      value: 691,
      change: { value: 3, type: 'decrease' },
      icon: UsersIcon,
      color: 'warning'
    }
  ];

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'moderator',
      status: 'inactive',
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'user',
      status: 'pending',
      createdAt: '2024-01-12'
    }
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <Link to="/users/create">
          <Button variant="primary">
            <Plus size={16} />
            Add New User
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
            
            <div className="flex items-center gap-3">
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
              <Button variant="secondary" size="sm">
                <Filter size={16} />
                Filter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
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
                        <Button variant="ghost" size="sm">
                          <Eye size={14} />
                          View
                        </Button>
                      </Link>
                      <Link to={`/users/${user.id}/edit`}>
                        <Button variant="ghost" size="sm">
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
        </div>
      </div>
    </div>
  );
};

export default Users;
