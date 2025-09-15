import React, { useState } from 'react';
import { ArrowLeft, History, Eye, Download, RotateCcw, Calendar, User, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const PolicyHistory = () => {
  const { id } = useParams();
  
  const [selectedVersion, setSelectedVersion] = useState(null);
  
  // Mock policy data
  const [policy] = useState({
    id: id || '1',
    title: 'Terms of Service',
    currentVersion: '2.1'
  });

  // Mock version history data
  const [versions] = useState([
    {
      id: 'v2.1',
      version: '2.1',
      status: 'published',
      title: 'Updated terms section',
      description: 'Revised user responsibilities and added new privacy clauses',
      author: 'Legal Team',
      authorEmail: 'legal@platform.com',
      createdAt: '2024-01-10T14:30:00Z',
      publishedAt: '2024-01-10T15:00:00Z',
      wordCount: 2450,
      changes: [
        'Added section 2.3 about data retention',
        'Updated privacy policy references',
        'Clarified user account termination procedures',
        'Fixed typos in section 4.2'
      ],
      changesSummary: '4 changes made',
      isCurrent: true,
      downloadUrl: '/api/policies/1/versions/2.1/download'
    },
    {
      id: 'v2.0',
      version: '2.0',
      status: 'archived',
      title: 'Major revision for GDPR compliance',
      description: 'Comprehensive update to comply with GDPR regulations and modern privacy standards',
      author: 'Chief Legal Officer',
      authorEmail: 'clo@platform.com',
      createdAt: '2023-12-15T10:00:00Z',
      publishedAt: '2023-12-15T16:30:00Z',
      archivedAt: '2024-01-10T15:00:00Z',
      wordCount: 2380,
      changes: [
        'Complete rewrite of privacy section',
        'Added GDPR compliance clauses',
        'Updated data processing terms',
        'Revised user rights section',
        'Added cookie policy integration',
        'Updated contact information'
      ],
      changesSummary: '6 major changes',
      isCurrent: false,
      downloadUrl: '/api/policies/1/versions/2.0/download'
    },
    {
      id: 'v1.5',
      version: '1.5',
      status: 'archived',
      title: 'Minor updates and clarifications',
      description: 'Small improvements to language and clarity',
      author: 'Legal Team',
      authorEmail: 'legal@platform.com',
      createdAt: '2023-11-20T09:15:00Z',
      publishedAt: '2023-11-20T11:00:00Z',
      archivedAt: '2023-12-15T16:30:00Z',
      wordCount: 2250,
      changes: [
        'Clarified refund policy language',
        'Updated support contact methods',
        'Fixed grammatical errors'
      ],
      changesSummary: '3 minor changes',
      isCurrent: false,
      downloadUrl: '/api/policies/1/versions/1.5/download'
    },
    {
      id: 'v1.4',
      version: '1.4',
      status: 'archived',
      title: 'Platform expansion updates',
      description: 'Updates related to new platform features and services',
      author: 'Product Legal Team',
      authorEmail: 'product-legal@platform.com',
      createdAt: '2023-10-05T13:45:00Z',
      publishedAt: '2023-10-05T17:00:00Z',
      archivedAt: '2023-11-20T11:00:00Z',
      wordCount: 2180,
      changes: [
        'Added marketplace terms',
        'Updated seller agreement references',
        'Added dropshipping specific clauses',
        'Updated payment processing terms'
      ],
      changesSummary: '4 feature updates',
      isCurrent: false,
      downloadUrl: '/api/policies/1/versions/1.4/download'
    },
    {
      id: 'v1.3',
      version: '1.3',
      status: 'archived',
      title: 'Initial public version',
      description: 'First public release of terms of service',
      author: 'Founding Team',
      authorEmail: 'founders@platform.com',
      createdAt: '2023-06-15T08:00:00Z',
      publishedAt: '2023-06-15T12:00:00Z',
      archivedAt: '2023-10-05T17:00:00Z',
      wordCount: 1980,
      changes: [
        'Initial terms of service creation',
        'Basic user agreement structure',
        'Standard legal clauses'
      ],
      changesSummary: 'Initial version',
      isCurrent: false,
      downloadUrl: '/api/policies/1/versions/1.3/download'
    }
  ]);

  const getStatusBadge = (version) => {
    if (version.isCurrent) {
      return <Badge variant="success"><CheckCircle size={12} /> Current</Badge>;
    }
    switch (version.status) {
      case 'published':
        return <Badge variant="success"><CheckCircle size={12} /> Published</Badge>;
      case 'archived':
        return <Badge variant="neutral">Archived</Badge>;
      case 'draft':
        return <Badge variant="warning"><Clock size={12} /> Draft</Badge>;
      case 'rejected':
        return <Badge variant="danger"><XCircle size={12} /> Rejected</Badge>;
      default:
        return <Badge variant="neutral">{version.status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleRevertToVersion = (version) => {
    if (confirm(`Are you sure you want to revert to version ${version.version}? This will create a new version based on the selected one.`)) {
      console.log('Reverting to version:', version.version);
      alert(`Reverted to version ${version.version}. A new version ${parseFloat(policy.currentVersion) + 0.1} has been created.`);
    }
  };

  const handleDownloadVersion = (version) => {
    console.log('Downloading version:', version.version);
    // In real implementation, trigger download
    alert(`Downloading ${policy.title} v${version.version}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Version History</h1>
          <p className="text-gray-600 mt-1">{policy.title} - All versions and changes</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to={`/policies/${id}`}>
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to Policy
            </Button>
          </Link>
          <Link to={`/policies/${id}/edit`}>
            <Button variant="primary">
              <FileText size={16} />
              Edit Current Version
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Version List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Versions</h3>
              <p className="text-sm text-gray-600 mt-1">Click on any version to view details</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {versions.map((version, index) => (
                <div 
                  key={version.id} 
                  className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedVersion?.id === version.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedVersion(version)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Version {version.version}
                        </h4>
                        {getStatusBadge(version)}
                        {index === 0 && (
                          <Badge variant="primary">Latest</Badge>
                        )}
                      </div>
                      
                      <h5 className="font-medium text-gray-800 mb-1">{version.title}</h5>
                      <p className="text-sm text-gray-600 mb-3">{version.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          <span>{version.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>Created: {formatDate(version.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText size={14} />
                          <span>{version.wordCount} words</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <History size={14} />
                          <span>{version.changesSummary}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadVersion(version);
                        }}
                      >
                        <Download size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVersion(version);
                        }}
                      >
                        <Eye size={14} />
                      </Button>
                      {!version.isCurrent && (
                        <Button 
                          variant="warning" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRevertToVersion(version);
                          }}
                        >
                          <RotateCcw size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Version Details Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {selectedVersion ? (
              <>
                {/* Selected Version Details */}
                <div className="card">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Version {selectedVersion.version}
                      </h3>
                      {getStatusBadge(selectedVersion)}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Title</label>
                      <p className="text-gray-900">{selectedVersion.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Description</label>
                      <p className="text-gray-900">{selectedVersion.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Author</label>
                      <p className="text-gray-900">{selectedVersion.author}</p>
                      <p className="text-sm text-gray-500">{selectedVersion.authorEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Created</label>
                      <p className="text-gray-900">{formatDate(selectedVersion.createdAt)}</p>
                    </div>
                    {selectedVersion.publishedAt && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Published</label>
                        <p className="text-gray-900">{formatDate(selectedVersion.publishedAt)}</p>
                      </div>
                    )}
                    {selectedVersion.archivedAt && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Archived</label>
                        <p className="text-gray-900">{formatDate(selectedVersion.archivedAt)}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">Word Count</label>
                      <p className="text-gray-900">{selectedVersion.wordCount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Version Actions */}
                <div className="card bg-gray-50">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Version Actions</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => handleDownloadVersion(selectedVersion)}
                    >
                      <Download size={16} />
                      Download Version
                    </Button>
                    
                    <Button variant="secondary" className="w-full">
                      <Eye size={16} />
                      Preview Version
                    </Button>
                    
                    {!selectedVersion.isCurrent && (
                      <Button 
                        variant="warning" 
                        className="w-full"
                        onClick={() => handleRevertToVersion(selectedVersion)}
                      >
                        <RotateCcw size={16} />
                        Revert to This Version
                      </Button>
                    )}
                  </div>
                </div>

                {/* Changes Made */}
                <div className="card">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Changes Made</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2">
                      {selectedVersion.changes.map((change, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              /* No Version Selected */
              <div className="card">
                <div className="p-6 text-center">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Version</h3>
                  <p className="text-gray-500">Click on any version from the list to view its details and changes.</p>
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">History Summary</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{versions.length}</div>
                    <div className="text-sm text-gray-600">Total Versions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">1</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">
                      {versions.reduce((sum, v) => sum + v.changes.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Changes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((Date.now() - new Date(versions[versions.length - 1].createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-sm text-gray-600">Days Since First</div>
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

export default PolicyHistory;
