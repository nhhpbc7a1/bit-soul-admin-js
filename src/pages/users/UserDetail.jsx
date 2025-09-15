import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Calendar, Shield, User as UserIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const UserDetail = () => {
  const { id } = useParams();
  
  // Mock user data - in real app, fetch based on ID
  const [user] = useState({
    id: id || '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    role: 'admin',
    status: 'active',
    department: 'Engineering',
    jobTitle: 'Senior Software Engineer',
    bio: 'Experienced software engineer with 8+ years in full-stack development. Passionate about creating scalable solutions and mentoring junior developers.',
    address: '123 Tech Street',
    city: 'San Francisco',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    avatar: null,
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20 10:30 AM',
    totalOrders: 15,
    totalSpent: '$2,450',
    accountType: 'Premium'
  });

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

  const recentActivity = [
    { id: 1, action: 'Updated profile information', date: '2024-01-20', time: '10:30 AM' },
    { id: 2, action: 'Placed order #ORD-1234', date: '2024-01-19', time: '2:15 PM' },
    { id: 3, action: 'Changed password', date: '2024-01-18', time: '9:45 AM' },
    { id: 4, action: 'Logged in from new device', date: '2024-01-17', time: '11:20 AM' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-600 mt-1">View and manage user information</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/users">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Users
            </Button>
          </Link>
          <Link to={`/users/${user.id}/edit`}>
            <Button variant="primary">
              <Edit size={16} />
              Edit User
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4">
                {user.avatar ? (
                  <img src={user.avatar} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-primary-600">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                {getRoleBadge(user.role)}
                {getStatusBadge(user.status)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{user.email}</span>
              </div>
              
              {user.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{user.phone}</span>
                </div>
              )}
              
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{user.city}, {user.country}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Joined {user.createdAt}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Last login: {user.lastLogin}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button variant="danger" className="w-full">
                <Trash2 size={16} />
                Delete User
              </Button>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Name</label>
                    <p className="mt-1 text-gray-900">{user.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Name</label>
                    <p className="mt-1 text-gray-900">{user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="mt-1 text-gray-900">{user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p className="mt-1 text-gray-900">{user.department || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Job Title</label>
                    <p className="mt-1 text-gray-900">{user.jobTitle || 'Not specified'}</p>
                  </div>
                </div>
                
                {user.bio && (
                  <div className="mt-6">
                    <label className="text-sm font-medium text-gray-500">Bio</label>
                    <p className="mt-1 text-gray-900">{user.bio}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Account Statistics */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Account Statistics</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{user.totalOrders}</div>
                    <div className="text-sm text-gray-500">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{user.totalSpent}</div>
                    <div className="text-sm text-gray-500">Total Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.accountType}</div>
                    <div className="text-sm text-gray-500">Account Type</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.date} at {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

