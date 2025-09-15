import React, { useState } from 'react';
import { AlertTriangle, Plus, Search, Filter, Eye, MessageSquare, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const stats = [
    {
      title: 'Total Complaints',
      value: 127,
      change: { value: 8, type: 'increase' },
      icon: AlertTriangle,
      color: 'primary'
    },
    {
      title: 'Open Complaints',
      value: 23,
      change: { value: 12, type: 'increase' },
      icon: AlertTriangle,
      color: 'danger'
    },
    {
      title: 'In Progress',
      value: 15,
      change: { value: 3, type: 'decrease' },
      icon: Clock,
      color: 'warning'
    },
    {
      title: 'Resolved Today',
      value: 8,
      change: { value: 15, type: 'increase' },
      icon: AlertTriangle,
      color: 'success'
    }
  ];

  const complaints = [
    {
      id: 'comp001',
      complaintNumber: 'COMP-001',
      customer: 'John Doe',
      email: 'john.doe@example.com',
      title: 'Payment not processed correctly',
      description: 'I made a payment for the premium package but it shows as pending for over 24 hours.',
      status: 'open',
      priority: 'high',
      assignedTo: 'support-agent-1',
      createdAt: '2024-01-15'
    },
    {
      id: 'comp002',
      complaintNumber: 'COMP-002',
      customer: 'Jane Smith',
      email: 'jane.smith@example.com',
      title: 'Unable to access premium features',
      description: 'After upgrading to premium, I still cannot access the advanced analytics dashboard.',
      status: 'in_progress',
      priority: 'medium',
      assignedTo: 'support-agent-2',
      createdAt: '2024-01-14'
    },
    {
      id: 'comp003',
      complaintNumber: 'COMP-003',
      customer: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      title: 'Account suspension without notice',
      description: 'My account was suspended suddenly without any prior warning or explanation.',
      status: 'open',
      priority: 'urgent',
      assignedTo: 'support-manager-1',
      createdAt: '2024-01-13'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge variant="danger">Open</Badge>;
      case 'in_progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'closed':
        return <Badge variant="neutral">Closed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger">Urgent</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'medium':
        return <Badge variant="info">Medium</Badge>;
      case 'low':
        return <Badge variant="neutral">Low</Badge>;
      default:
        return <Badge variant="neutral">{priority}</Badge>;
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const complaintDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - complaintDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Complaints Management</h1>
          <p className="text-gray-600 mt-1">Handle customer complaints and support tickets</p>
        </div>
        <Button variant="primary">
          <Plus size={16} />
          Create Ticket
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Complaints List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900">All Complaints</h3>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 w-64"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input w-32"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              
              <Button variant="secondary" size="sm">
                <Filter size={16} />
                Filter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Link to={`/complaints/${complaint.id}`} className="font-medium text-primary-600 hover:text-primary-800">
                      #{complaint.complaintNumber || complaint.id}
                    </Link>
                    {getPriorityBadge(complaint.priority)}
                    {getStatusBadge(complaint.status)}
                  </div>
                  
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {complaint.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {complaint.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{complaint.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{getTimeAgo(complaint.createdAt)}</span>
                    </div>
                    {complaint.assignedTo && (
                      <div className="flex items-center gap-2">
                        <MessageSquare size={14} />
                        <span>Assigned to {complaint.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Link to={`/complaints/${complaint.id}`}>
                    <Button variant="primary" size="sm">
                      <Eye size={14} />
                      View
                    </Button>
                  </Link>
                  <Link to={`/complaints/${complaint.id}`}>
                    <Button variant="secondary" size="sm">
                      <MessageSquare size={14} />
                      Reply
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;

