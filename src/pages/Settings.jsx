import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Link, 
  Palette, 
  Save,
  Users,
  Mail,
  Smartphone,
  Key
} from 'lucide-react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Link },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure your application preferences and integrations
        </p>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="p-4 lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                General Settings
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Application Name
                    </label>
                    <input
                      type="text"
                      defaultValue="ZENITH"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Logo URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Default Currency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700">
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700">
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="PST">Pacific Time</option>
                    <option value="GMT">Greenwich Mean Time</option>
                  </select>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'users' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  User Management
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Invite User
                </motion.button>
              </div>

              <div className="space-y-4">
                {/* User List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">John Doe</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="success" size="sm">Admin</Badge>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <SettingsIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Sarah Johnson</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">sarah@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="info" size="sm">Manager</Badge>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <SettingsIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Role Management */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Role Permissions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">View Inventory</span>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">Admin</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">Manager</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Staff</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Edit Products</span>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">Admin</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">Manager</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Staff</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Notification Settings
              </h3>
              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                  </div>
                  <div className="space-y-3 ml-8">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Low stock alerts</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Order status updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Weekly reports</span>
                    </label>
                  </div>
                </div>

                {/* SMS Notifications */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h4 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h4>
                  </div>
                  <div className="space-y-3 ml-8">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Critical alerts only</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Emergency notifications</span>
                    </label>
                  </div>
                </div>

                {/* Alert Levels */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Alert Levels</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Low Stock Threshold
                      </label>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Critical Stock Threshold
                      </label>
                      <input
                        type="number"
                        defaultValue="5"
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Integrations
              </h3>
              <div className="space-y-6">
                {/* API Keys */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">API Keys</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Barcode Scanner API
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="password"
                          placeholder="Enter API key"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Key className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Analytics Service API
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="password"
                          placeholder="Enter API key"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Key className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ERP Integration */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">ERP System</h4>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">SAP Integration</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sync inventory data with SAP</p>
                    </div>
                    <Badge variant="danger" size="sm">Disconnected</Badge>
                  </div>
                </div>

                {/* Third-party Services */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Third-party Services</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">Google Analytics</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Track usage analytics</p>
                      </div>
                      <Badge variant="success" size="sm">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">Slack Notifications</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Send alerts to Slack</p>
                      </div>
                      <Badge variant="warning" size="sm">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Appearance Settings
              </h3>
              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Theme</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        checked={!isDark}
                        onChange={() => isDark && toggleTheme()}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Light Mode</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        checked={isDark}
                        onChange={() => !isDark && toggleTheme()}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                    </label>
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Accent Color</h4>
                  <div className="flex space-x-3">
                    <button className="w-8 h-8 bg-blue-600 rounded-full border-2 border-blue-800"></button>
                    <button className="w-8 h-8 bg-green-600 rounded-full"></button>
                    <button className="w-8 h-8 bg-purple-600 rounded-full"></button>
                    <button className="w-8 h-8 bg-red-600 rounded-full"></button>
                    <button className="w-8 h-8 bg-yellow-600 rounded-full"></button>
                  </div>
                </div>

                {/* Layout Options */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Layout</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Compact sidebar</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Fixed header</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Animations enabled</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
