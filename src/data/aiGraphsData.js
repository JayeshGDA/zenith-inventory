// Mock data specifically for the AI Graphs page

// 1. Demand Forecasting Data
export const demandForecastingData = [
  { date: '2025-08-01', actual: 40, predicted: 42, confidence: [38, 46] },
  { date: '2025-08-02', actual: 45, predicted: 48, confidence: [43, 53] },
  { date: '2025-08-03', actual: 60, predicted: 58, confidence: [52, 64] },
  { date: '2025-08-04', actual: 55, predicted: 50, confidence: [45, 55] },
  { date: '2025-08-05', actual: 30, predicted: 35, confidence: [30, 40] },
  { date: '2025-08-06', actual: 65, predicted: 62, confidence: [57, 67] },
  { date: '2025-08-07', actual: 70, predicted: 68, confidence: [63, 73] },
];

// 2. Inventory Optimization (EOQ) Data
const calculateCosts = (quantity, demand, holdingCost, orderCost) => {
  const holding = (quantity / 2) * holdingCost;
  const ordering = (demand / quantity) * orderCost;
  const total = holding + ordering;
  return { orderQuantity: quantity, holdingCost: holding, orderingCost: ordering, totalCost: total };
};

export const generateEoqData = () => {
  const annualDemand = 5000;
  const holdingCostPerUnit = 1.2;
  const costPerOrder = 45;
  const data = [];
  for (let i = 50; i <= 800; i += 25) {
    data.push(calculateCosts(i, annualDemand, holdingCostPerUnit, costPerOrder));
  }
  return data;
};

export const eoqData = generateEoqData();
export const optimalEoqPoint = eoqData.reduce((min, p) => p.totalCost < min.totalCost ? p : min, eoqData[0]);

// 3. Anomaly Detection Data
export const anomalyDetectionData = [
  { date: '2025-08-01', stockChange: -40, isAnomaly: false },
  { date: '2025-08-02', stockChange: -45, isAnomaly: false },
  { date: '2025-08-03', stockChange: -60, isAnomaly: false },
  { date: '2025-08-04', stockChange: -150, isAnomaly: true }, // Anomaly
  { date: '2025-08-05', stockChange: -30, isAnomaly: false },
  { date: '2025-08-06', stockChange: 200, isAnomaly: false }, // Restock
  { date: '2025-08-07', stockChange: -55, isAnomaly: false },
  { date: '2025-08-08', stockChange: 10, isAnomaly: true }, // Anomaly
];

// 4. Intelligent Restocking Data
export const restockingData = [
  { sku: 'SKU-501', priority: 'High', recommendedQuantity: 150 },
  { sku: 'SKU-101', priority: 'High', recommendedQuantity: 250 },
  { sku: 'SKU-321', priority: 'Medium', recommendedQuantity: 80 },
  { sku: 'SKU-445', priority: 'Medium', recommendedQuantity: 120 },
  { sku: 'SKU-209', priority: 'Low', recommendedQuantity: 50 },
].sort((a, b) => {
  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  return priorityOrder[b.priority] - priorityOrder[a.priority];
});

// 6. Real-Time Data Processing Data
export const realTimeStockData = [
  { time: '09:00', stock: 300, event: null },
  { time: '09:05', stock: 298, event: 'Sale' },
  { time: '09:10', stock: 295, event: 'Sale' },
  { time: '09:15', stock: 280, event: 'Sale' },
  { time: '09:20', stock: 281, event: 'Return' },
  { time: '09:25', stock: 275, event: 'Sale' },
  { time: '09:30', stock: 250, event: 'Sale' },
  { time: '09:35', stock: 249, event: 'Sale' },
  { time: '09:40', stock: 449, event: 'Restock' },
  { time: '09:45', stock: 448, event: 'Sale' },
];
