import React, { useState } from 'react';
import { Cpu, Play, Pause, Settings, BarChart3, Zap, Brain, Activity } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const AIOperations = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4');

  const stats = [
    {
      title: 'API Requests',
      value: 12847,
      change: { value: 23, type: 'increase' },
      icon: Activity,
      color: 'primary'
    },
    {
      title: 'Active Models',
      value: 8,
      change: { value: 2, type: 'increase' },
      icon: Brain,
      color: 'success'
    },
    {
      title: 'Processing Time',
      value: '1.2s',
      change: { value: 15, type: 'decrease' },
      icon: Zap,
      color: 'warning'
    },
    {
      title: 'Success Rate',
      value: '99.7%',
      change: { value: 0.3, type: 'increase' },
      icon: BarChart3,
      color: 'info'
    }
  ];

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
          <Button variant="secondary">
            <Settings size={16} />
            Configure
          </Button>
          <Button variant="primary">
            <Play size={16} />
            Run Operation
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* AI Models Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Control Panel */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Controls</h3>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">Select Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="form-input"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude-3</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="primary" size="sm" className="w-full">
                  <Play size={14} />
                  Start
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  <Pause size={14} />
                  Pause
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">System Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
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

        {/* Models List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">AI Models</h3>
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
                      <Button variant="ghost" size="sm">
                        <Settings size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOperations;

