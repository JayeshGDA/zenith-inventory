import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BrainCircuit, AlertTriangle, Zap, Target, Package, Clock, Database, Calendar, Play, Loader } from 'lucide-react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { products, anomalyData, liveEvents } from '../data/mockData';

const AIModels = () => {
  const [dataSource, setDataSource] = useState('historicalSales');
  const [timeframe, setTimeframe] = useState(30);
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [analysisResults, setAnalysisResults] = useState({
    forecast: [],
    reorderPoint: 0,
    eoq: 0,
  });

  const getSeverityVariant = (severity) => {
    switch (severity) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'default';
    }
  };

  const generateDynamicForecast = (product, days, dataSource) => {
    const data = [];
    const startDate = new Date('2025-08-01');
    let lastHistorical = product.quantity > 0 ? product.quantity / 2 : 50;

    const multipliers = {
      historicalSales: 1,
      supplierLeadTimes: 0.8,
      realTimeTransactions: 1.2,
      marketTrends: 1.5,
    };
    const multiplier = multipliers[dataSource];

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0];
      
      const historicalValue = i < 10 ? Math.round(lastHistorical * (1 + (Math.random() - 0.45) * 0.2) * multiplier) : null;
      if (historicalValue) {
        lastHistorical = historicalValue;
      }

      const predictedValue = Math.round(lastHistorical * (1 + (Math.random() - 0.48) * 0.25) * multiplier);

      data.push({
        date: dateString,
        historical: historicalValue,
        predicted: predictedValue,
      });
    }
    return data;
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const product = products.find(p => p.id === selectedProductId) || products[0];
      setSelectedProduct(product);

      const newForecast = generateDynamicForecast(product, timeframe, dataSource);

      const baseReorder = product.unitsOnHold + 5;
      const reorderPoint = baseReorder + Math.floor(timeframe / 3) + (Object.keys(product.productMoves).indexOf(dataSource) * 10);
      const eoq = (product.unitsForecasted * 2) + Math.floor(timeframe * 1.5) + (Object.keys(product.productMoves).indexOf(dataSource) * 20);

      setAnalysisResults({
        forecast: newForecast,
        reorderPoint,
        eoq,
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  useEffect(() => {
    handleRunAnalysis();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI & Predictive Models
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Forecasting, optimization, and real-time intelligence
          </p>
        </div>
      </div>

      {/* Controls */}
      <Card className="p-4" hover={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data Source</label>
            <div className="relative">
              <Database className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="historicalSales">Historical Sales</option>
                <option value="supplierLeadTimes">Supplier Lead Times</option>
                <option value="realTimeTransactions">Real-time Transactions</option>
                <option value="marketTrends">Market Trends</option>
              </select>
            </div>
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeframe</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(parseInt(e.target.value, 10))}
                className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7">Next 7 Days</option>
                <option value="30">Next 30 Days</option>
                <option value="90">Next Quarter</option>
                <option value="180">Next 6 Months</option>
              </select>
            </div>
          </div>
          <div className="lg:col-span-1">
            <motion.button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
              whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Analysis'}</span>
            </motion.button>
          </div>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Forecasting) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BrainCircuit className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Demand Forecasting ({selectedProduct.name})
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysisResults.forecast} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                  <XAxis dataKey="date" fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                  <YAxis fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line key="historical" type="monotone" dataKey="historical" name="Historical Sales" stroke="#8884d8" strokeWidth={2} dot={false} />
                  <Line key="predicted" type="monotone" dataKey="predicted" name="Predicted Demand" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Reorder Point
                </h3>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{analysisResults.reorderPoint} <span className="text-xl font-medium">units</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                When stock for {selectedProduct.name} hits this level, a new order should be placed.
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Package className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Economic Order Qty (EOQ)
                </h3>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{analysisResults.eoq} <span className="text-xl font-medium">units</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                The optimal quantity of {selectedProduct.name} to order to minimize inventory costs.
              </p>
            </Card>
          </div>
        </div>

        {/* Right Column (Anomalies & Live Feed) */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Anomaly Detection
              </h3>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {anomalyData.map((anomaly, index) => (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant={getSeverityVariant(anomaly.severity)} size="sm">
                          {anomaly.severity}
                        </Badge>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {anomaly.type}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {anomaly.description}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 ml-2 flex-shrink-0">
                      {anomaly.timestamp.split(' ')[1]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Live Event Feed
              </h3>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {liveEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <Clock className="w-3 h-3 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{event.type}:</span> {event.details}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {event.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIModels;
