import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Phone, Mail, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { suppliers } from '../data/mockData';

const Suppliers = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDeliveryBadge = (percentage) => {
    if (percentage >= 95) return 'success';
    if (percentage >= 85) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Supplier Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage supplier relationships and performance metrics
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Supplier</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers by name or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {supplier.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {supplier.contact}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  <Star className={`w-4 h-4 fill-current ${getRatingColor(supplier.rating)}`} />
                  <span className={`ml-1 text-sm font-medium ${getRatingColor(supplier.rating)}`}>
                    {supplier.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({supplier.rating >= 4.5 ? 'Excellent' : supplier.rating >= 4.0 ? 'Good' : 'Needs Improvement'})
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  {supplier.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4 mr-2" />
                  {supplier.email}
                </div>
                <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{supplier.address}</span>
                </div>
              </div>

              {/* Products Supplied */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Products Supplied
                </h4>
                <div className="flex flex-wrap gap-1">
                  {supplier.products.map((product, idx) => (
                    <Badge key={idx} variant="info" size="sm">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    On-time Delivery
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getDeliveryBadge(supplier.onTimeDelivery)} size="sm">
                      {supplier.onTimeDelivery}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Lead Time
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {supplier.avgLeadTime} days
                  </span>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Performance Score
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {Math.round((supplier.rating / 5) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      supplier.rating >= 4.5 ? 'bg-green-500' :
                      supplier.rating >= 4.0 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(supplier.rating / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 px-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
                >
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  Contact
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600">
              {suppliers.length}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total Suppliers
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {suppliers.filter(s => s.rating >= 4.5).length}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Excellent Rating
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">
              {(suppliers.reduce((sum, s) => sum + s.onTimeDelivery, 0) / suppliers.length).toFixed(1)}%
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Avg On-time Delivery
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-600">
              {(suppliers.reduce((sum, s) => sum + s.avgLeadTime, 0) / suppliers.length).toFixed(1)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Avg Lead Time (days)
            </p>
          </div>
        </Card>
      </div>

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Supplier
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supplier Name</label>
                <input type="text" placeholder="e.g., StationeryHub" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person</label>
                <input type="text" placeholder="David Wilson" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input type="tel" placeholder="+1-555-0101" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" placeholder="david@stationeryhub.com" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <input type="text" placeholder="101 Supply Lane, Business Park" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Products Supplied (comma-separated)</label>
                <input type="text" placeholder="Office Supplies, Stationery" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" />
              </div>
              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Supplier
                </motion.button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
