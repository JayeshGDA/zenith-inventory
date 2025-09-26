import React from 'react';
import {
  LineChart, Line, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot, LabelList
} from 'recharts';
import { motion } from 'framer-motion';
import { User, Cog, Database, Bot, ArrowRight } from 'lucide-react';
import Card from '../components/UI/Card';
import {
  demandForecastingData,
  eoqData,
  optimalEoqPoint,
  anomalyDetectionData,
  restockingData,
  realTimeStockData
} from '../data/aiGraphsData';

const AIGraphs = () => {
  const restockingPriorityColors = {
    High: '#EF4444',
    Medium: '#F59E0B',
    Low: '#10B981',
  };

  // Custom tooltip with stable keys
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="label font-bold text-gray-900 dark:text-white">{`${label}`}</p>
          {payload.map((p) => (
            <p key={p.dataKey} style={{ color: p.color }}>
              {`${p.name}: ${p.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Event dot for real-time chart with unique key
  const renderEventDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.event) {
      return (
        <g key={payload.id || payload.time || cx}>
          <circle cx={cx} cy={cy} r={5} fill="#F59E0B" stroke="#fff" strokeWidth={2} />
          <text x={cx} y={cy - 10} textAnchor="middle" fill="#F59E0B" fontSize={12}>
            {payload.event}
          </text>
        </g>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Model Visualizations</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Illustrating the outputs of the inventory intelligence engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Demand Forecasting */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">1. Demand Forecasting</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandForecastingData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="date" fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <YAxis fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <defs>
                  <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area key="confidence" type="monotone" dataKey="confidence" stroke={false} fill="url(#confidenceGradient)" name="Confidence Interval" />
                <Line key="actual" type="monotone" dataKey="actual" name="Actual Sales" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                <Line key="predicted" type="monotone" dataKey="predicted" name="Predicted Demand" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 2. Inventory Optimization (EOQ) */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">2. Inventory Optimization (EOQ)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={eoqData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="orderQuantity" type="number" name="Order Quantity" label={{ value: 'Order Quantity (Units)', position: 'insideBottom', offset: -5 }} fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <YAxis label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line key="holdingCost" type="monotone" dataKey="holdingCost" name="Holding Cost" stroke="#8884d8" strokeWidth={2} dot={false} />
                <Line key="orderingCost" type="monotone" dataKey="orderingCost" name="Ordering Cost" stroke="#82ca9d" strokeWidth={2} dot={false} />
                <Line key="totalCost" type="monotone" dataKey="totalCost" name="Total Cost" stroke="#ffc658" strokeWidth={3} dot={false} />
                <ReferenceDot x={optimalEoqPoint.orderQuantity} y={optimalEoqPoint.totalCost} r={5} fill="#ffc658" stroke="white" strokeWidth={2}>
                  <LabelList value={`EOQ: ${optimalEoqPoint.orderQuantity}`} position="top" fill="#ffc658" />
                </ReferenceDot>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 3. Anomaly Detection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">3. Anomaly Detection</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={anomalyDetectionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="date" fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <YAxis fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="stockChange" name="Stock Change">
                  {anomalyDetectionData.map((entry) => (
                    <Cell key={entry.date} fill={entry.isAnomaly ? '#EF4444' : '#3B82F6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 4. Intelligent Restocking */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">4. Intelligent Restocking Priority</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={restockingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis type="number" fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <YAxis dataKey="sku" type="category" width={80} fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="recommendedQuantity" name="Recommended Qty">
                  {restockingData.map((entry) => (
                    <Cell key={entry.sku} fill={restockingPriorityColors[entry.priority]} />
                  ))}
                  <LabelList dataKey="recommendedQuantity" position="right" fill="#fff" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 5. NLP Chatbot Flow */}
        <Card className="p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">5. NLP Chatbot Flow</h3>
          <div className="flex-grow flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
              <div className="flex flex-col items-center">
                <User className="w-8 h-8 text-blue-500" />
                <p className="text-sm mt-1">User Query</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center">
                <Cog className="w-8 h-8 text-purple-500" />
                <p className="text-sm mt-1">Intent Classification</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center">
                <Database className="w-8 h-8 text-yellow-500" />
                <p className="text-sm mt-1">DB Lookup</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center">
                <Bot className="w-8 h-8 text-green-500" />
                <p className="text-sm mt-1">Bot Reply</p>
              </div>
            </div>
          </div>
        </Card>

        {/* 6. Real-Time Data Processing */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">6. Real-Time Stock Level (Flash Sale)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realTimeStockData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="time" fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <YAxis domain={['dataMin - 20', 'dataMax + 20']} fontSize={12} tick={{ fill: 'rgb(107 114 128)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  key="stock"
                  type="step"
                  dataKey="stock"
                  name="Stock Level"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={renderEventDot}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIGraphs;
