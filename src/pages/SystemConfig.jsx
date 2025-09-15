import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Shield, Database, Bell, DollarSign, CreditCard, Globe, History } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState('business');
  const [configData, setConfigData] = useState({
    // Business Rules
    defaultCommissionRate: 10,
    listingFee: 0.99,
    withdrawalFee: 2.50,
    minWithdrawal: 10,
    // Payment Gateways
    paymentMethods: {
      momo: { enabled: true, apiKey: '••••••••••••••••', secretKey: '••••••••••••••••' },
      zalopay: { enabled: true, apiKey: '••••••••••••••••', secretKey: '••••••••••••••••' },
      cod: { enabled: true },
      bankTransfer: { enabled: false }
    },
    // Technical Settings
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      username: 'noreply@platform.com',
      password: '••••••••••••••••'
    },
    defaultLanguage: 'en',
    supportedCurrencies: ['USD', 'VND'],
    defaultCurrency: 'USD'
  });

  const handleConfigChange = (section, key, value) => {
    if (section) {
      setConfigData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    } else {
      setConfigData(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSaveConfig = () => {
    console.log('Saving system configuration:', configData);
    alert('System configuration saved successfully!');
  };

  const tabs = [
    { id: 'business', label: 'Business Rules', icon: DollarSign },
    { id: 'payments', label: 'Payment Gateways', icon: CreditCard },
    { id: 'technical', label: 'Technical Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'audit', label: 'Audit Log', icon: History }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'business':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Core Business Parameters</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Default Commission Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="form-input" 
                    value={configData.defaultCommissionRate}
                    onChange={(e) => handleConfigChange(null, 'defaultCommissionRate', parseFloat(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 mt-1">Commission rate charged to sellers</p>
                </div>
                <div>
                  <label className="form-label">Listing Fee ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-input" 
                    value={configData.listingFee}
                    onChange={(e) => handleConfigChange(null, 'listingFee', parseFloat(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 mt-1">Fee for listing new products</p>
                </div>
                <div>
                  <label className="form-label">Withdrawal Fee ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-input" 
                    value={configData.withdrawalFee}
                    onChange={(e) => handleConfigChange(null, 'withdrawalFee', parseFloat(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 mt-1">Fee for seller withdrawals</p>
                </div>
                <div>
                  <label className="form-label">Minimum Withdrawal ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-input" 
                    value={configData.minWithdrawal}
                    onChange={(e) => handleConfigChange(null, 'minWithdrawal', parseFloat(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum amount for withdrawals</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Gateway Integrations</h4>
              <div className="space-y-6">
                {/* MoMo */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="font-medium text-gray-900">MoMo Wallet</h5>
                      <p className="text-sm text-gray-500">Vietnamese mobile payment</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configData.paymentMethods.momo.enabled}
                        onChange={(e) => handleConfigChange('paymentMethods', 'momo', {
                          ...configData.paymentMethods.momo,
                          enabled: e.target.checked
                        })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  {configData.paymentMethods.momo.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">API Key</label>
                        <input type="password" className="form-input" value={configData.paymentMethods.momo.apiKey} readOnly />
                      </div>
                      <div>
                        <label className="form-label">Secret Key</label>
                        <input type="password" className="form-input" value={configData.paymentMethods.momo.secretKey} readOnly />
                      </div>
                    </div>
                  )}
                </div>

                {/* ZaloPay */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="font-medium text-gray-900">ZaloPay</h5>
                      <p className="text-sm text-gray-500">Vietnamese digital wallet</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configData.paymentMethods.zalopay.enabled}
                        onChange={(e) => handleConfigChange('paymentMethods', 'zalopay', {
                          ...configData.paymentMethods.zalopay,
                          enabled: e.target.checked
                        })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  {configData.paymentMethods.zalopay.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">API Key</label>
                        <input type="password" className="form-input" value={configData.paymentMethods.zalopay.apiKey} readOnly />
                      </div>
                      <div>
                        <label className="form-label">Secret Key</label>
                        <input type="password" className="form-input" value={configData.paymentMethods.zalopay.secretKey} readOnly />
                      </div>
                    </div>
                  )}
                </div>

                {/* COD */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">Cash on Delivery (COD)</h5>
                      <p className="text-sm text-gray-500">Pay when receiving the product</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configData.paymentMethods.cod.enabled}
                        onChange={(e) => handleConfigChange('paymentMethods', 'cod', {
                          enabled: e.target.checked
                        })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                {/* Bank Transfer */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">Bank Transfer</h5>
                      <p className="text-sm text-gray-500">Direct bank account transfer</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configData.paymentMethods.bankTransfer.enabled}
                        onChange={(e) => handleConfigChange('paymentMethods', 'bankTransfer', {
                          enabled: e.target.checked
                        })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'technical':
        return (
          <div className="space-y-6">
            {/* SMTP Settings */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">SMTP Server Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="form-label">SMTP Host</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={configData.smtp.host}
                    onChange={(e) => handleConfigChange('smtp', 'host', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">SMTP Port</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={configData.smtp.port}
                    onChange={(e) => handleConfigChange('smtp', 'port', parseInt(e.target.value))}
                  />
              </div>
              <div>
                  <label className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={configData.smtp.username}
                    onChange={(e) => handleConfigChange('smtp', 'username', e.target.value)}
                  />
              </div>
              <div>
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    value={configData.smtp.password}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Language & Currency */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Language & Currency Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Default System Language</label>
                  <select 
                    className="form-input"
                    value={configData.defaultLanguage}
                    onChange={(e) => handleConfigChange(null, 'defaultLanguage', e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="vi">Vietnamese</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                  </select>
              </div>
              <div>
                  <label className="form-label">Default Currency</label>
                  <select 
                    className="form-input"
                    value={configData.defaultCurrency}
                    onChange={(e) => handleConfigChange(null, 'defaultCurrency', e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="VND">VND (₫)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="JPY">JPY (¥)</option>
                </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Session Timeout (minutes)</label>
                <input type="number" className="form-input" defaultValue="30" />
              </div>
              <div>
                <label className="form-label">Max Login Attempts</label>
                <input type="number" className="form-input" defaultValue="5" />
              </div>
              <div>
                <label className="form-label">Password Min Length</label>
                <input type="number" className="form-input" defaultValue="8" />
              </div>
              <div>
                <label className="form-label">Two-Factor Authentication</label>
                <select className="form-input">
                  <option value="optional">Optional</option>
                  <option value="required">Required</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'audit':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Configuration Changes</h4>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Default Commission Rate</p>
                      <p className="text-sm text-gray-600">Changed from 8% to 10%</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>By: Admin User</span>
                        <span>•</span>
                        <span>2024-01-15 14:30:00</span>
                      </div>
                    </div>
                    <Badge variant="info">Business Rules</Badge>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
              <div>
                      <p className="font-medium text-gray-900">MoMo Payment Gateway</p>
                      <p className="text-sm text-gray-600">Enabled MoMo payment method</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>By: System Admin</span>
                        <span>•</span>
                        <span>2024-01-14 09:15:00</span>
                      </div>
                    </div>
                    <Badge variant="success">Payment Gateway</Badge>
                  </div>
              </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
              <div>
                      <p className="font-medium text-gray-900">SMTP Configuration</p>
                      <p className="text-sm text-gray-600">Updated SMTP host settings</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>By: Tech Admin</span>
                        <span>•</span>
                        <span>2024-01-13 16:45:00</span>
                      </div>
                    </div>
                    <Badge variant="warning">Technical</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-gray-600 mt-1">Configure core business rules, payment gateways, and technical settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Admin Actions */}
        <div className="lg:col-span-1">
          <div className="card bg-gray-50">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Admin Actions</h3>
        </div>
            <div className="p-6 space-y-3">
              <Button variant="primary" className="w-full" onClick={handleSaveConfig}>
                <Save size={16} />
                Save Configuration
              </Button>
              <Button variant="warning" className="w-full">
            <RotateCcw size={16} />
            Reset to Defaults
          </Button>
              <Button variant="secondary" className="w-full">
                <History size={16} />
                View Audit Log
          </Button>
        </div>
            
            {/* System Status */}
            <div className="mt-6 p-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">System Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Uptime</span>
                  <Badge variant="success">99.9%</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active Configs</span>
                  <span className="font-medium text-gray-900">47</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Backup</span>
                  <span className="font-medium text-gray-900">2h ago</span>
                </div>
              </div>
        </div>
      </div>
      </div>

      {/* Configuration Tabs */}
        <div className="lg:col-span-3">
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
          {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;

