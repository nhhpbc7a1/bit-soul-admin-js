import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, RotateCcw, Download, Calendar, User, FileText, GitCompare } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const StaticPageHistory = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState(null);
  const [versions, setVersions] = useState([]);
  const [selectedVersions, setSelectedVersions] = useState([]);

  // Mock data loading
  useEffect(() => {
    // Simulate API call to load page data and version history
    const mockPageData = {
      id: id,
      title: id === 'about' ? 'About Us' : id === 'privacy' ? 'Privacy Policy' : 'Terms of Service',
      currentVersion: 3
    };

    const mockVersions = [
      {
        version: 3,
        date: '2024-01-10T15:30:00Z',
        author: 'Admin User',
        status: 'published',
        changes: 'Updated company mission and contact information',
        isCurrent: true,
        size: 2456,
        changeType: 'major'
      },
      {
        version: 2,
        date: '2024-01-09T10:15:00Z',
        author: 'Content Manager',
        status: 'published',
        changes: 'Fixed typos and improved formatting',
        isCurrent: false,
        size: 2398,
        changeType: 'minor'
      },
      {
        version: 1,
        date: '2024-01-08T10:00:00Z',
        author: 'Admin User',
        status: 'published',
        changes: 'Initial page creation',
        isCurrent: false,
        size: 2234,
        changeType: 'initial'
      }
    ];

    setPageData(mockPageData);
    setVersions(mockVersions);
  }, [id]);

  const handleVersionSelect = (version) => {
    if (selectedVersions.includes(version)) {
      setSelectedVersions(selectedVersions.filter(v => v !== version));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, version]);
    }
  };

  const handleRestore = (version) => {
    if (window.confirm(`Are you sure you want to restore version ${version}? This will create a new version with the content from version ${version}.`)) {
      console.log('Restoring version:', version);
      // Here you would typically make an API call
    }
  };

  const getChangeTypeColor = (changeType) => {
    switch (changeType) {
      case 'major':
        return 'danger';
      case 'minor':
        return 'warning';
      case 'initial':
        return 'success';
      default:
        return 'info';
    }
  };

  const getChangeTypeLabel = (changeType) => {
    switch (changeType) {
      case 'major':
        return 'Major';
      case 'minor':
        return 'Minor';
      case 'initial':
        return 'Initial';
      default:
        return 'Update';
    }
  };

  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading version history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/ui-content/pages/${id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Version History</h1>
            <p className="text-gray-600 mt-1">
              {pageData.title} - {versions.length} versions
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedVersions.length === 2 && (
            <Button variant="secondary">
              <GitCompare size={16} />
              Compare Versions
            </Button>
          )}
          <Button variant="ghost">
            <Download size={16} />
            Export History
          </Button>
        </div>
      </div>

      {/* Comparison Info */}
      {selectedVersions.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">
                  {selectedVersions.length === 1 
                    ? `Version ${selectedVersions[0]} selected`
                    : `Versions ${selectedVersions.join(' and ')} selected for comparison`
                  }
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedVersions([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Version History */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Versions</h3>
            <p className="text-sm text-gray-600">
              Select up to 2 versions to compare
            </p>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {versions.map((version) => (
            <div key={version.version} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Selection Checkbox */}
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      checked={selectedVersions.includes(version.version)}
                      onChange={() => handleVersionSelect(version.version)}
                      disabled={!selectedVersions.includes(version.version) && selectedVersions.length >= 2}
                      className="rounded border-gray-300"
                    />
                  </div>
                  
                  {/* Version Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Version {version.version}
                      </h4>
                      {version.isCurrent && (
                        <Badge variant="success">Current</Badge>
                      )}
                      <Badge variant={getChangeTypeColor(version.changeType)}>
                        {getChangeTypeLabel(version.changeType)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(version.date).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {version.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {version.size} characters
                      </div>
                    </div>
                    
                    <p className="text-gray-700">{version.changes}</p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye size={14} />
                    Preview
                  </Button>
                  
                  {!version.isCurrent && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleRestore(version.version)}
                    >
                      <RotateCcw size={14} />
                      Restore
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <Download size={14} />
                    Export
                  </Button>
                </div>
              </div>
              
              {/* Version Diff Preview */}
              {version.version < pageData.currentVersion && (
                <div className="mt-4 pl-8">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Changes from previous version:</h5>
                    <div className="text-xs space-y-1">
                      <div className="text-green-600">+ Added new contact information</div>
                      <div className="text-red-600">- Removed outdated mission statement</div>
                      <div className="text-blue-600">~ Modified company values section</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Version Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{versions.length}</div>
            <div className="text-sm text-gray-600">Total Versions</div>
          </div>
        </div>
        
        <div className="card">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {versions.filter(v => v.changeType === 'major').length}
            </div>
            <div className="text-sm text-gray-600">Major Updates</div>
          </div>
        </div>
        
        <div className="card">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {new Set(versions.map(v => v.author)).size}
            </div>
            <div className="text-sm text-gray-600">Contributors</div>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="card bg-gray-50">
        <div className="p-6">
          <h4 className="font-medium text-gray-900 mb-2">About Version History</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Each time you save changes to a page, a new version is created</p>
            <p>• You can restore any previous version, which will create a new version with that content</p>
            <p>• Use the comparison feature to see differences between versions</p>
            <p>• Version history is preserved indefinitely for audit purposes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPageHistory;
