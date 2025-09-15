import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, Clock, MessageSquare, Paperclip, AlertTriangle, CheckCircle, XCircle, Edit, Send, FileText, Package, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [activeTab, setActiveTab] = useState('conversation');

  // Mock data loading
  useEffect(() => {
    // Simulate API call
    const mockComplaint = {
      id: id || 'COMP-001',
      complaintNumber: id === 'comp001' ? 'COMP-001' : id === 'comp002' ? 'COMP-002' : 'COMP-001',
      title: 'Payment not processed correctly',
      description: 'I made a payment for the premium package but it shows as pending for over 24 hours. I have tried refreshing multiple times and checking my bank account.',
      status: 'in_progress',
      priority: 'high',
      category: 'Payment Issues',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z',
      customer: {
        id: 'CUST-001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        joinDate: '2023-06-15',
        totalOrders: 12,
        totalSpent: 2847.50,
        status: 'active'
      },
      assignedTo: 'Admin User',
      assignedAt: '2024-01-15T11:00:00Z',
      relatedOrder: {
        id: 'ord001',
        number: 'ORD-001',
        amount: 299.99,
        date: '2024-01-14',
        status: 'pending'
      },
      attachments: [
        {
          id: 1,
          name: 'payment_screenshot.png',
          type: 'image',
          size: '245 KB',
          uploadedAt: '2024-01-15T10:35:00Z'
        },
        {
          id: 2,
          name: 'bank_statement.pdf',
          type: 'document',
          size: '1.2 MB',
          uploadedAt: '2024-01-15T10:40:00Z'
        }
      ],
      conversation: [
        {
          id: 1,
          type: 'customer',
          author: 'John Doe',
          message: 'I made a payment for the premium package but it shows as pending for over 24 hours. I have tried refreshing multiple times and checking my bank account. The money has been deducted but the package is not activated.',
          timestamp: '2024-01-15T10:30:00Z',
          attachments: ['payment_screenshot.png']
        },
        {
          id: 2,
          type: 'admin',
          author: 'Admin User',
          message: 'Thank you for contacting us. I can see your payment has been received but there seems to be a processing delay. I am investigating this issue and will update you shortly.',
          timestamp: '2024-01-15T11:15:00Z'
        },
        {
          id: 3,
          type: 'internal',
          author: 'Admin User',
          message: 'Payment gateway shows successful transaction but webhook failed. Need to manually process.',
          timestamp: '2024-01-15T11:20:00Z'
        },
        {
          id: 4,
          type: 'admin',
          author: 'Admin User',
          message: 'I have identified the issue - there was a technical problem with our payment processing system. Your payment has been confirmed and I am now activating your premium package. You should see the changes within the next 10 minutes.',
          timestamp: '2024-01-15T14:20:00Z'
        }
      ],
      timeline: [
        {
          id: 1,
          action: 'Complaint Created',
          description: 'Customer submitted complaint via support form',
          timestamp: '2024-01-15T10:30:00Z',
          author: 'System'
        },
        {
          id: 2,
          action: 'Assigned to Admin',
          description: 'Complaint assigned to Admin User',
          timestamp: '2024-01-15T11:00:00Z',
          author: 'System'
        },
        {
          id: 3,
          action: 'Status Changed',
          description: 'Status changed from "open" to "in_progress"',
          timestamp: '2024-01-15T11:15:00Z',
          author: 'Admin User'
        },
        {
          id: 4,
          action: 'Internal Note Added',
          description: 'Added internal investigation note',
          timestamp: '2024-01-15T11:20:00Z',
          author: 'Admin User'
        }
      ]
    };
    
    setComplaint(mockComplaint);
  }, [id]);

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
      case 'low':
        return <Badge variant="info">Low Priority</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Priority</Badge>;
      case 'high':
        return <Badge variant="danger">High Priority</Badge>;
      case 'urgent':
        return <Badge variant="danger">🚨 Urgent</Badge>;
      default:
        return <Badge variant="neutral">{priority}</Badge>;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: complaint.conversation.length + 1,
      type: 'admin',
      author: 'Admin User',
      message: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setComplaint(prev => ({
      ...prev,
      conversation: [...prev.conversation, message]
    }));
    
    setNewMessage('');
  };

  const handleAddInternalNote = () => {
    if (!internalNote.trim()) return;
    
    const note = {
      id: complaint.conversation.length + 1,
      type: 'internal',
      author: 'Admin User',
      message: internalNote,
      timestamp: new Date().toISOString()
    };
    
    setComplaint(prev => ({
      ...prev,
      conversation: [...prev.conversation, note]
    }));
    
    setInternalNote('');
  };

  const handleStatusChange = (newStatus) => {
    setComplaint(prev => ({
      ...prev,
      status: newStatus,
      updatedAt: new Date().toISOString()
    }));
  };

  if (!complaint) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading complaint details...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'conversation', label: 'Conversation', icon: MessageSquare },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'attachments', label: 'Attachments', icon: Paperclip }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/complaints">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complaint #{complaint.complaintNumber}</h1>
            <div className="flex items-center gap-4 mt-1">
              {getStatusBadge(complaint.status)}
              {getPriorityBadge(complaint.priority)}
              <span className="text-gray-600 text-sm">
                Created: {new Date(complaint.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Edit size={16} />
            Edit Details
          </Button>
          <select
            value={complaint.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="form-input"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Complaint Summary */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Complaint Summary</h3>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-medium text-gray-900 mb-3">{complaint.title}</h4>
              <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
              
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>Category: <span className="font-medium">{complaint.category}</span></span>
                <span>•</span>
                <span>Assigned to: <span className="font-medium">{complaint.assignedTo}</span></span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'conversation' && (
                <div className="space-y-6">
                  {/* Conversation Thread */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {complaint.conversation.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'customer' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-2xl ${
                          message.type === 'customer' ? 'bg-gray-100' : 
                          message.type === 'internal' ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-primary-50'
                        } rounded-lg p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-sm">
                              {message.author}
                              {message.type === 'internal' && <span className="text-yellow-600 ml-1">(Internal)</span>}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-900">{message.message}</p>
                          {message.attachments && (
                            <div className="mt-2">
                              {message.attachments.map((attachment, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                  <Paperclip size={12} />
                                  {attachment}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Section */}
                  <div className="border-t pt-6 space-y-4">
                    <div>
                      <label className="form-label">Reply to Customer</label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="form-input min-h-[100px]"
                        placeholder="Type your response to the customer..."
                      />
                      <div className="flex justify-end mt-2">
                        <Button variant="primary" onClick={handleSendMessage}>
                          <Send size={16} />
                          Send Reply
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Internal Note</label>
                      <textarea
                        value={internalNote}
                        onChange={(e) => setInternalNote(e.target.value)}
                        className="form-input min-h-[80px]"
                        placeholder="Add internal note (not visible to customer)..."
                      />
                      <div className="flex justify-end mt-2">
                        <Button variant="secondary" onClick={handleAddInternalNote}>
                          <FileText size={16} />
                          Add Note
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  {complaint.timeline.map((event) => (
                    <div key={event.id} className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{event.action}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{event.description}</p>
                        <p className="text-xs text-gray-500 mt-1">by {event.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'attachments' && (
                <div className="space-y-4">
                  {complaint.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-sm text-gray-500">
                          {attachment.size} • Uploaded {new Date(attachment.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="secondary" size="sm">Download</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{complaint.customer.name}</p>
                  <p className="text-sm text-gray-500">Customer since {new Date(complaint.customer.joinDate).getFullYear()}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{complaint.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{complaint.customer.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{complaint.customer.totalOrders}</div>
                    <div className="text-xs text-gray-500">Total Orders</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">${complaint.customer.totalSpent}</div>
                    <div className="text-xs text-gray-500">Total Spent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Order */}
          {complaint.relatedOrder && (
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Related Order</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <Link to={`/orders/${complaint.relatedOrder.id}`} className="font-medium text-primary-600 hover:text-primary-800">
                    {complaint.relatedOrder.number}
                  </Link>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Amount: <span className="font-medium">${complaint.relatedOrder.amount}</span></div>
                  <div>Date: <span className="font-medium">{complaint.relatedOrder.date}</span></div>
                  <div>Status: <Badge variant="warning">{complaint.relatedOrder.status}</Badge></div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <Button variant="success" className="w-full" onClick={() => handleStatusChange('resolved')}>
                <CheckCircle size={16} />
                Mark as Resolved
              </Button>
              
              <Button variant="danger" className="w-full" onClick={() => handleStatusChange('closed')}>
                <XCircle size={16} />
                Close Complaint
              </Button>
              
              <Button variant="warning" className="w-full">
                <AlertTriangle size={16} />
                Escalate Priority
              </Button>
            </div>
          </div>

          {/* Complaint Stats */}
          <div className="card bg-gray-50">
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-3">Complaint Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="text-gray-900">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Update:</span>
                  <span className="text-gray-900">{new Date(complaint.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Response Time:</span>
                  <span className="text-gray-900">45 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Messages:</span>
                  <span className="text-gray-900">{complaint.conversation.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;

