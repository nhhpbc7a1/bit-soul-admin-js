import React, { useState } from 'react';
import { ArrowLeft, Save, RefreshCw, AlertTriangle, CheckCircle, Settings, Brain, Zap, Shield } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const AIConfiguration = () => {
  const { modelId } = useParams();
  
  const [configData, setConfigData] = useState({
    // Model Selection
    activeModel: modelId || 'gpt-4',
    modelVersion: '1.2.3',
    fallbackModel: 'gpt-3.5',
    
    // Core Parameters
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1.0,
    topK: 50,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    
    // Performance Settings
    timeout: 30,
    retryAttempts: 3,
    batchSize: 10,
    concurrentRequests: 5,
    
    // Safety & Moderation
    contentFilter: true,
    toxicityThreshold: 0.8,
    biasDetection: true,
    outputModeration: true,
    
    // API & Integration
    apiEndpoint: 'https://api.openai.com/v1',
    apiKey: '••••••••••••••••••••••••••••••••',
    rateLimitPerMinute: 60,
    rateLimitPerHour: 3600,
    
    // Logging & Monitoring
    enableLogging: true,
    logLevel: 'info',
    metricsCollection: true,
    errorReporting: true,
    
    // Cache Settings
    enableCache: true,
    cacheExpiry: 3600,
    maxCacheSize: 1000
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('2024-01-15 14:30:00');

  const handleConfigChange = (key, value) => {
    setConfigData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Saving AI configuration:', configData);
      setLastSaved(new Date().toLocaleString());
      alert('AI Configuration saved successfully!');
    } catch (error) {
      alert('Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      setConfigData({
        ...configData,
        temperature: 0.7,
        maxTokens: 2048,
        topP: 1.0,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0,
        timeout: 30,
        retryAttempts: 3
      });
    }
  };

  const modelOptions = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
    { id: 'claude-3', name: 'Claude-3', description: 'Constitutional AI' },
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google\'s advanced model' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Configuration</h1>
          <p className="text-gray-600 mt-1">
            {modelId ? `Configure settings for ${modelId.toUpperCase()}` : 'Configure AI system parameters and settings'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/ai-operations">
            <Button variant="secondary">
              <ArrowLeft size={16} />
              Back to AI Operations
            </Button>
          </Link>
          <Button variant="warning" onClick={handleResetToDefaults}>
            <RefreshCw size={16} />
            Reset to Defaults
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Forms */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Model Selection */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Model Selection</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Active Model</label>
                    <select
                      value={configData.activeModel}
                      onChange={(e) => handleConfigChange('activeModel', e.target.value)}
                      className="form-input"
                    >
                      {modelOptions.map(model => (
                        <option key={model.id} value={model.id}>
                          {model.name} - {model.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fallback Model</label>
                    <select
                      value={configData.fallbackModel}
                      onChange={(e) => handleConfigChange('fallbackModel', e.target.value)}
                      className="form-input"
                    >
                      {modelOptions.map(model => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Version</label>
                  <input
                    type="text"
                    value={configData.modelVersion}
                    onChange={(e) => handleConfigChange('modelVersion', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 1.2.3"
                  />
                </div>
              </div>
            </div>

            {/* Core Parameters */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Core Parameters</h3>
                </div>
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
                    <p className="text-xs text-gray-500 mt-1">Controls randomness (0.0 = deterministic, 2.0 = very random)</p>
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
                    <p className="text-xs text-gray-500 mt-1">Maximum response length in tokens</p>
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
                    <p className="text-xs text-gray-500 mt-1">Nucleus sampling parameter (0.1 = focused, 1.0 = diverse)</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Top K</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={configData.topK}
                      onChange={(e) => handleConfigChange('topK', parseInt(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Limits vocabulary to top K tokens</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Presence Penalty</label>
                    <input
                      type="number"
                      step="0.1"
                      min="-2"
                      max="2"
                      value={configData.presencePenalty}
                      onChange={(e) => handleConfigChange('presencePenalty', parseFloat(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Encourages topic diversity (-2.0 to 2.0)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Settings */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Performance Settings</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch Size</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={configData.batchSize}
                      onChange={(e) => handleConfigChange('batchSize', parseInt(e.target.value))}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Concurrent Requests</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={configData.concurrentRequests}
                      onChange={(e) => handleConfigChange('concurrentRequests', parseInt(e.target.value))}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Moderation */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Safety & Moderation</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Toxicity Threshold</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={configData.toxicityThreshold}
                      onChange={(e) => handleConfigChange('toxicityThreshold', parseFloat(e.target.value))}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">Content flagged above this threshold (0.0 - 1.0)</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Content Filter</label>
                      <p className="text-xs text-gray-500">Enable content filtering for harmful content</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configData.contentFilter}
                        onChange={(e) => handleConfigChange('contentFilter', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Bias Detection</label>
                      <p className="text-xs text-gray-500">Detect and flag potentially biased responses</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configData.biasDetection}
                        onChange={(e) => handleConfigChange('biasDetection', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Output Moderation</label>
                      <p className="text-xs text-gray-500">Moderate AI outputs before delivery</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configData.outputModeration}
                        onChange={(e) => handleConfigChange('outputModeration', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
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
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={handleSaveConfig}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Configuration
                    </>
                  )}
                </Button>
                
                <Button variant="warning" className="w-full" onClick={handleResetToDefaults}>
                  <RefreshCw size={16} />
                  Reset to Defaults
                </Button>
                
                <Button variant="secondary" className="w-full">
                  <CheckCircle size={16} />
                  Test Configuration
                </Button>
              </div>
            </div>

            {/* Configuration Status */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Configuration Status</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Model</label>
                  <p className="text-gray-900">{configData.activeModel.toUpperCase()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Saved</label>
                  <p className="text-gray-900">{lastSaved}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Version</label>
                  <p className="text-gray-900">{configData.modelVersion}</p>
                </div>
              </div>
            </div>

            {/* Validation Warnings */}
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-900">Configuration Warnings</h4>
                </div>
                <div className="space-y-2">
                  {configData.temperature > 1.5 && (
                    <p className="text-sm text-yellow-800">⚠️ High temperature may produce unpredictable results</p>
                  )}
                  {configData.maxTokens > 3000 && (
                    <p className="text-sm text-yellow-800">⚠️ High token limit may increase costs</p>
                  )}
                  {configData.timeout < 10 && (
                    <p className="text-sm text-yellow-800">⚠️ Low timeout may cause request failures</p>
                  )}
                </div>
              </div>
            </div>

            {/* Configuration Tips */}
            <div className="card bg-blue-50">
              <div className="p-6">
                <h4 className="font-medium text-blue-900 mb-2">💡 Configuration Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Lower temperature for consistent outputs</li>
                  <li>• Higher temperature for creative tasks</li>
                  <li>• Use Top P for better quality control</li>
                  <li>• Enable safety filters for production</li>
                  <li>• Test changes before saving</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConfiguration;
