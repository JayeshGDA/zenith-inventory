import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import { 
  Scan, Plus, Camera, CheckCircle, XCircle, Clock, Download, RotateCcw, Zap, Loader
} from 'lucide-react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { products } from '../data/mockData';

const DataGauge = () => {
  const [activeTab, setActiveTab] = useState('manual');
  const [scanSession, setScanSession] = useState({
    scanned: 147, accuracy: 98.2, avgTime: 1.4, failed: 3
  });
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleStartScanning = () => {
    if (!isCameraOn) setIsCameraOn(true);
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        const product = products[Math.floor(Math.random() * products.length)];
        setScanResult({
          status: 'success',
          barcode: Math.random().toString(36).substring(2, 15).toUpperCase(),
          productName: product.name,
          time: (Math.random() * 1.5 + 0.5).toFixed(1)
        });
        setScanSession(prev => ({ ...prev, scanned: prev.scanned + 1 }));
      } else {
        setScanResult({ status: 'failed', message: 'Barcode not recognized' });
        setScanSession(prev => ({ ...prev, failed: prev.failed + 1 }));
      }
      setIsScanning(false);
    }, 2000);
  };

  const recentScans = [
    { id: 1, product: 'Wireless Mouse', barcode: '123456789012', timestamp: '14:23', status: 'success', user: 'John D.' },
    { id: 2, product: 'Office Chair Ergo', barcode: '234567890123', timestamp: '14:21', status: 'success', user: 'Sarah M.' },
    { id: 3, product: 'Desk Lamp LED', barcode: '345678901234', timestamp: '14:18', status: 'failed', user: 'Mike R.' },
    { id: 4, product: 'A4 Copy Paper', barcode: '456789012345', timestamp: '14:15', status: 'success', user: 'Lisa K.' },
    { id: 5, product: 'Standing Desk', barcode: '567890123456', timestamp: '14:12', status: 'success', user: 'Tom W.' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DATA GAUGE</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manual entry and barcode scanning for inventory management</p>
      </div>

      {/* Session Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scans Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{scanSession.scanned}</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl"><Scan className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{scanSession.accuracy}%</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl"><CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" /></div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{scanSession.avgTime}s</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl"><Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" /></div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed Scans</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{scanSession.failed}</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl"><XCircle className="w-6 h-6 text-red-600 dark:text-red-400" /></div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Entry */}
        <div className="space-y-6">
          <Card className="p-1">
            <div className="flex">
              <button onClick={() => setActiveTab('manual')} className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${activeTab === 'manual' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                <Plus className="w-4 h-4 inline mr-2" /> Manual Entry
              </button>
              <button onClick={() => setActiveTab('scanner')} className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${activeTab === 'scanner' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                <Camera className="w-4 h-4 inline mr-2" /> Barcode Scanner
              </button>
            </div>
          </Card>

          {activeTab === 'manual' ? (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manual Product Entry</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" placeholder="Enter product name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" placeholder="Enter SKU" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700">
                      <option>Select category</option>
                      <option>Office Use</option> <option>Furniture</option> <option>Electronics</option> <option>Apparel</option> <option>Appliances</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" placeholder="Enter quantity" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit Price</label>
                    <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" placeholder="Enter unit price" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" placeholder="Enter location" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supplier</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700" placeholder="Enter supplier name" />
                </div>
                <div className="flex gap-3 pt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium">Add Product</motion.button>
                  <button type="button" className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Clear</button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Barcode Scanner</h3>
              <div className="space-y-4">
                <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden">
                  {isCameraOn ? (
                    <Webcam audio={false} mirrored={true} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">Camera is off</p>
                    </div>
                  )}
                  {isScanning && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                      <Loader className="w-10 h-10 text-white animate-spin" />
                      <p className="text-white mt-2">Scanning...</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <motion.button onClick={handleStartScanning} disabled={isScanning} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50">
                    <Zap className="w-4 h-4 mr-2" /> {isScanning ? 'Scanning...' : 'Start Scan'}
                  </motion.button>
                  <button onClick={() => setIsCameraOn(!isCameraOn)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    {isCameraOn ? 'Stop Cam' : 'Start Cam'}
                  </button>
                </div>
                {scanResult && (
                  <div className={`rounded-lg p-4 ${scanResult.status === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Scan Result</span>
                      <Badge variant={scanResult.status === 'success' ? 'success' : 'danger'} size="sm">{scanResult.status === 'success' ? 'Valid' : 'Invalid'}</Badge>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      {scanResult.status === 'success' ? (
                        <>
                          <p>Barcode: {scanResult.barcode}</p>
                          <p>Product: {scanResult.productName}</p>
                          <p>Time: {scanResult.time}s</p>
                        </>
                      ) : (
                        <p>{scanResult.message}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Scan History</h3>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Download className="w-4 h-4" /></button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><RotateCcw className="w-4 h-4" /></button>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"><h4 className="font-medium text-gray-900 dark:text-white">Recent Scans</h4></div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentScans.map((scan) => (
                <motion.div key={scan.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Badge variant={scan.status === 'success' ? 'success' : 'danger'} size="sm">{scan.status === 'success' ? 'Success' : 'Failed'}</Badge>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{scan.product}</span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Barcode: {scan.barcode}</span><span className="mx-2">•</span><span>By: {scan.user}</span>
                      </div>
                    </div>
                    <div className="text-right"><p className="text-sm text-gray-500 dark:text-gray-400">{scan.timestamp}</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Session Actions</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"><Download className="w-4 h-4" /><span>Export Session Logs</span></button>
              <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"><RotateCcw className="w-4 h-4" /><span>Clear Session</span></button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataGauge;
