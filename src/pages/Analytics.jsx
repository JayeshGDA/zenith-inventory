import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Package, AlertTriangle, MessageCircle, Bot } from 'lucide-react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { products } from '../data/mockData';

const Analytics = () => {
  // Process data for charts
  const categoryData = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = { category, total: 0, value: 0 };
    }
    acc[category].total += product.quantity;
    acc[category].value += product.quantity * product.unitPrice;
    return acc;
  }, {});

  const chartData = Object.values(categoryData);

  const PIE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const pieData = chartData.map((item, index) => ({
    ...item,
    name: item.category,
    fill: PIE_COLORS[index % PIE_COLORS.length]
  }));

  const topItems = products
    .map(p => ({ ...p, value: p.quantity * p.unitPrice }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const lowStockItems = products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock');

  const totalInventoryValue = products.reduce((sum, p) => sum + (p.quantity * p.unitPrice), 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Inventory insights, forecasting, and intelligent recommendations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Inventory Value
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${totalInventoryValue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Lead Time
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                4.2 days
              </p>
              <p className="text-sm text-blue-600 mt-1">Improved by 8%</p>
            </div>
             <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Reorder Alerts
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {lowStockItems.length}
              </p>
              <p className="text-sm text-red-600 mt-1">Needs attention</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Forecast Accuracy
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                94.2%
              </p>
              <p className="text-sm text-green-600 mt-1">Above target</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sales by Category
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                  <XAxis dataKey="category" fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                  <YAxis fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Sales Value']}
                  />
                  <Bar dataKey="value" fill="#3B82F6" name="Sales Value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Items by Value
            </h3>
            <div className="space-y-3">
              {topItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.quantity} units × ${item.unitPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${item.value.toLocaleString()}
                    </p>
                    <Badge variant="info" size="sm">
                      {item.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Value Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                  <Legend iconSize={10} wrapperStyle={{fontSize: '12px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Intelligent Restocking
            </h3>
            <div className="space-y-3">
              {lowStockItems.slice(0, 5).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 border border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/20 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Current: {item.quantity} | Suggested: {item.unitsForecasted}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={item.status === 'Out of Stock' ? 'danger' : 'warning'} 
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Priority: High
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* AI Chatbot Section */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bot className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Assistant
          </h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">
                <strong className="dark:text-blue-400">AI:</strong> I found {lowStockItems.length} items that need restocking. Would you like me to generate purchase orders for the top priority items?
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Ask me about inventory, forecasts, or get recommendations..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </motion.button>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
