import React from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, AlertTriangle, ShoppingCart, Clock, CheckCircle, Users } from 'lucide-react';
import FlashCard from '../components/UI/FlashCard';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { products, orders } from '../data/mockData';

const Overview = () => {
  // Calculate stats
  const totalProducts = products.length;
  const inStock = products.filter(p => p.status === 'In Stock').length;
  const lowStock = products.filter(p => p.status === 'Low Stock').length;
  const outOfStock = products.filter(p => p.status === 'Out of Stock').length;

  const dailyOrders = orders.length;
  const lateOrders = orders.filter(o => o.status === 'Late').length;
  const completedOrders = orders.filter(o => o.status === 'Done').length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Overview Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time inventory management and insights
        </p>
      </div>

      {/* Flash Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FlashCard
          title="Total Products"
          value={totalProducts}
          subtitle="Active inventory items"
          trend="up"
          trendValue="+5.2%"
          icon={Package}
          color="blue"
        />
        <FlashCard
          title="In Stock"
          value={inStock}
          subtitle="Ready for dispatch"
          trend="up"
          trendValue="+2.1%"
          icon={CheckCircle}
          color="green"
        />
        <FlashCard
          title="Low Stock"
          value={lowStock}
          subtitle="Needs restocking"
          trend="down"
          trendValue="+12.5%"
          icon={AlertTriangle}
          color="yellow"
        />
        <FlashCard
          title="Daily Orders"
          value={dailyOrders}
          subtitle="Orders today"
          trend="up"
          trendValue="+8.3%"
          icon={ShoppingCart}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Orders
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </h3>
                      <Badge
                        variant={
                          order.status === 'Done' ? 'success' :
                          order.status === 'Late' ? 'danger' :
                          order.status === 'Waiting' ? 'warning' : 'info'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {order.items.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${order.total.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Inventory Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  In Stock
                </span>
                <span className="font-semibold text-green-600">
                  {inStock} items
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Low Stock
                </span>
                <span className="font-semibold text-yellow-600">
                  {lowStock} items
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Out of Stock
                </span>
                <span className="font-semibold text-red-600">
                  {outOfStock} items
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Completed
                </span>
                <span className="font-semibold text-green-600">
                  {completedOrders}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Late
                </span>
                <span className="font-semibold text-red-600">
                  {lateOrders}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Today
                </span>
                <span className="font-semibold text-blue-600">
                  {dailyOrders}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
