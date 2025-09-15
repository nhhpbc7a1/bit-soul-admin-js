import React, { useState } from 'react';
import { Cpu, Play, Pause, Settings, BarChart3, Zap, Brain, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const AIOperations = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [configData, setConfigData] = useState({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    timeout: 30,
    retryAttempts: 3
  });

  const aiModels = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Advanced language model for complex reasoning tasks',
      status: 'active',
      usage: 8547,
      accuracy: 98.5,
      lastUsed: '2 minutes ago'
    },
    {
      id: 'gpt-3.5',
      name: 'GPT-3.5 Turbo',
      description: 'Fast and efficient model for general text generation',
      status: 'active',
      usage: 15234,
      accuracy: 96.2,
      lastUsed: '1 minute ago'
    },
    {
      id: 'claude-3',
      name: 'Claude-3',
      description: 'Constitutional AI model with strong safety measures',
      status: 'active',
      usage: 3421,
      accuracy: 97.8,
      lastUsed: '5 minutes ago'
    }
  ];

  const handleConfigChange = (key, value) => {
    setConfigData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveConfig = () => {
    console.log('Saving AI configuration:', configData);
    // Handle save configuration
    alert('AI Configuration saved successfully!');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'maintenance':
        return <Badge variant="warning">Maintenance</Badge>;
      case 'training':
        return <Badge variant="info">Training</Badge>;
      case 'inactive':
        return <Badge variant="neutral">Inactive</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Operations Center</h1>
          <p className="text-gray-600 mt-1">Monitor and manage AI models and operations</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/ai-operations/configure">
            <Button variant="secondary">
              <Settings size={16} />
              Configure
            </Button>
          </Link>
          <Button variant="primary">
            <Play size={16} />
            Run Operation
          </Button>
        </div>
      </div>


      {/* AI Configuration & Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Actions & Configuration */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Admin Actions */}
            <div className="card bg-gray-50">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Admin Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <Button variant="primary" className="w-full" onClick={handleSaveConfig}>
                  <Settings size={16} />
                  Save AI Configuration
                </Button>
                <Button variant="secondary" className="w-full">
                  <Play size={16} />
                  Run Test Operation
                </Button>
                <Button variant="warning" className="w-full">
                  <Pause size={16} />
                  Emergency Stop
                </Button>
              </div>
            </div>

            {/* Current AI Configuration */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Current AI Configuration</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Active Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="form-input mt-1"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5">GPT-3.5 Turbo</option>
                    <option value="claude-3">Claude-3</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Version</label>
                  <p className="text-gray-900 mt-1">v1.2.3</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* System Metrics */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">System Metrics</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">12,847</div>
                    <div className="text-sm text-gray-600">API Requests</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">99.7%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">1.2s</div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-gray-600">Active Models</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">CPU Usage</span>
                    <span className="font-medium text-gray-900">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Parameters & Models */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Edit AI Parameters */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Edit AI Parameters</h3>
                <p className="text-sm text-gray-600 mt-1">Adjust key parameters for the selected AI model</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={configData.temperature}
                      onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Controls randomness (0.0 - 2.0)</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Tokens</label>
                    <input
                      type="number"
                      min="1"
                      max="4096"
                      value={configData.maxTokens}
                      onChange={(e) => handleConfigChange('maxTokens', parseInt(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum response length</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Top P</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={configData.topP}
                      onChange={(e) => handleConfigChange('topP', parseFloat(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Nucleus sampling parameter</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency Penalty</label>
                    <input
                      type="number"
                      step="0.1"
                      min="-2"
                      max="2"
                      value={configData.frequencyPenalty}
                      onChange={(e) => handleConfigChange('frequencyPenalty', parseFloat(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Reduces repetition (-2.0 to 2.0)</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timeout (seconds)</label>
                    <input
                      type="number"
                      min="5"
                      max="300"
                      value={configData.timeout}
                      onChange={(e) => handleConfigChange('timeout', parseInt(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Request timeout duration</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Retry Attempts</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={configData.retryAttempts}
                      onChange={(e) => handleConfigChange('retryAttempts', parseInt(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Number of retry attempts on failure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Models List */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Available AI Models</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {aiModels.map((model) => (
                  <div key={model.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{model.name}</h4>
                          <p className="text-sm text-gray-600">{model.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Usage: {model.usage.toLocaleString()}</span>
                            <span>Accuracy: {model.accuracy}%</span>
                            <span>Last used: {model.lastUsed}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {getStatusBadge(model.status)}
                        <Button variant="primary" size="sm">
                          <Play size={14} />
                        </Button>
                        <Link to={`/ai-operations/configure/${model.id}`}>
                          <Button variant="ghost" size="sm">
                            <Settings size={14} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOperations;

