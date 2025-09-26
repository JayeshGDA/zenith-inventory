import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

// Pages
import Overview from './pages/Overview';
import Products from './pages/Products';
import Warehouse from './pages/Warehouse';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import DataGauge from './pages/DataGauge';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AIModels from './pages/AIModels';
import AIGraphs from './pages/AIGraphs';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          {/* Desktop Sidebar */}
          <div className="hidden lg:flex lg:flex-shrink-0">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900">
                <Sidebar />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            
            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/products" element={<Products />} />
                <Route path="/warehouse" element={<Warehouse />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/data-gauge" element={<DataGauge />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/ai-models" element={<AIModels />} />
                <Route path="/ai-graphs" element={<AIGraphs />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
