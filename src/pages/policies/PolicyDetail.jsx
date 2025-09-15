import React, { useState } from 'react';
import { ArrowLeft, Edit, Eye, History, Archive, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const PolicyDetail = () => {
  const { id } = useParams();
  
  // Mock policy data - in real app, fetch based on ID
  const [policy] = useState({
    id: id || '1',
    title: 'Terms of Service',
    description: 'Platform terms and conditions for all users',
    category: 'Legal',
    content: `# Terms of Service

## 1. Introduction

Welcome to our platform. By using our services, you agree to these terms and conditions. Please read them carefully before using our services.

## 2. User Accounts

### 2.1 Account Creation
Users must provide accurate and complete information when creating accounts. You are responsible for maintaining the security of your account credentials.

### 2.2 Account Responsibilities
- Keep your login information secure
- Notify us immediately of any unauthorized access
- You are responsible for all activities under your account

## 3. Prohibited Activities

The following activities are strictly prohibited on our platform:

- **Spam or unsolicited communications** - Do not send unwanted messages
- **Illegal activities** - Any activity that violates local, state, or federal laws
- **Harassment** - Do not harass, abuse, or harm other users
- **Intellectual property violations** - Respect copyrights and trademarks
- **False information** - Do not provide misleading or false information

## 4. Intellectual Property

All content on this platform, including but not limited to text, graphics, logos, images, and software, is protected by copyright and other intellectual property laws.

### 4.1 User Content
By uploading content to our platform, you grant us a non-exclusive license to use, display, and distribute your content.

### 4.2 Platform Content
Our platform content is proprietary and may not be used without express permission.

## 5. Privacy and Data Protection

We take your privacy seriously. Please review our Privacy Policy to understand how we collect, use, and protect your information.

## 6. Service Modifications

We reserve the right to modify or discontinue our services at any time with or without notice.

## 7. Limitation of Liability

Our liability is limited to the maximum extent permitted by law. We are not responsible for indirect, incidental, or consequential damages.

## 8. Dispute Resolution

Any disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.

## 9. Termination

We reserve the right to terminate accounts that violate these terms. Users may also terminate their accounts at any time.

## 10. Changes to Terms

We may update these terms from time to time. Continued use of our services constitutes acceptance of the updated terms.

## 11. Contact Information

For questions about these terms, please contact us at:

**Email:** legal@platform.com  
**Phone:** +1 (555) 123-4567  
**Address:** 123 Legal Street, City, State 12345

---

**Effective Date:** January 1, 2024  
**Last Updated:** January 10, 2024  
**Version:** 2.1`,
    status: 'published',
    version: '2.1',
    wordCount: 2450,
    metaTitle: 'Terms of Service - Platform Name',
    metaDescription: 'Read our terms of service to understand your rights and responsibilities when using our platform.',
    keywords: 'terms, service, legal, agreement, user rights',
    createdAt: '2023-06-15',
    lastUpdated: '2024-01-10',
    publishedAt: '2024-01-10',
    author: 'Legal Team',
    approvedBy: 'Chief Legal Officer',
    nextReview: '2024-07-10'
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge variant="success"><CheckCircle size={12} /> Published</Badge>;
      case 'draft':
        return <Badge variant="warning"><Edit size={12} /> Draft</Badge>;
      case 'review':
        return <Badge variant="info"><Clock size={12} /> Under Review</Badge>;
      case 'archived':
        return <Badge variant="neutral"><Archive size={12} /> Archived</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Legal':
        return 'bg-red-100 text-red-800';
      case 'Business':
        return 'bg-blue-100 text-blue-800';
      case 'Customer Service':
        return 'bg-green-100 text-green-800';
      case 'Community':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{policy.title}</h1>
          <p className="text-gray-600 mt-1">{policy.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/policies">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Policies
            </Button>
          </Link>
          <Link to={`/policies/${policy.id}/edit`}>
            <Button variant="primary">
              <Edit size={16} />
              Edit Policy
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Policy Status */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Policy Status</h3>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(policy.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(policy.category)}`}>
                      {policy.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Version</label>
                    <p className="text-lg font-semibold text-gray-900">v{policy.version}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Word Count</label>
                    <p className="text-lg font-semibold text-gray-900">{policy.wordCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-lg font-semibold text-gray-900">{policy.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Content */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Policy Content</h3>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {policy.content}
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">SEO Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Meta Title</label>
                  <p className="text-gray-900">{policy.metaTitle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Meta Description</label>
                  <p className="text-gray-900">{policy.metaDescription}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Keywords</label>
                  <p className="text-gray-900">{policy.keywords}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Admin Actions */}
            <div className="card bg-gray-50">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Admin Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <Link to={`/policies/${policy.id}/edit`}>
                  <Button variant="primary" className="w-full">
                    <Edit size={16} />
                    Edit Policy
                  </Button>
                </Link>
                
                <Link to={`/policies/${policy.id}/history`}>
                  <Button variant="secondary" className="w-full">
                    <History size={16} />
                    View History
                  </Button>
                </Link>
                
                <Button variant="secondary" className="w-full">
                  <Eye size={16} />
                  Preview Live
                </Button>
                
                {policy.status === 'published' && (
                  <Button variant="warning" className="w-full">
                    <Archive size={16} />
                    Archive Policy
                  </Button>
                )}
                
                {policy.status === 'draft' && (
                  <Button variant="success" className="w-full">
                    <CheckCircle size={16} />
                    Publish Policy
                  </Button>
                )}
              </div>
            </div>

            {/* Policy Details */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Policy Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900">{policy.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Author</label>
                  <p className="text-gray-900">{policy.author}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Approved By</label>
                  <p className="text-gray-900">{policy.approvedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created Date</label>
                  <p className="text-gray-900">{policy.createdAt}</p>
                </div>
                {policy.publishedAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Published Date</label>
                    <p className="text-gray-900">{policy.publishedAt}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500">Next Review</label>
                  <p className="text-gray-900">{policy.nextReview}</p>
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Version History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-green-900">v2.1 (Current)</p>
                      <p className="text-sm text-green-700">Updated terms section</p>
                    </div>
                    <Badge variant="success">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">v2.0</p>
                      <p className="text-sm text-gray-600">Major revision</p>
                    </div>
                    <span className="text-xs text-gray-500">Dec 15, 2023</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">v1.5</p>
                      <p className="text-sm text-gray-600">Minor updates</p>
                    </div>
                    <span className="text-xs text-gray-500">Nov 20, 2023</span>
                  </div>
                </div>
                <Link to={`/policies/${policy.id}/history`}>
                  <Button variant="secondary" size="sm" className="w-full mt-4">
                    <History size={14} />
                    View All Versions
                  </Button>
                </Link>
              </div>
            </div>

            {/* Review Alert */}
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-900">Review Due</h4>
                </div>
                <p className="text-sm text-yellow-800">
                  This policy is scheduled for review on {policy.nextReview}. 
                  Regular reviews ensure compliance and accuracy.
                </p>
                <Button variant="warning" size="sm" className="w-full mt-3">
                  Schedule Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;
