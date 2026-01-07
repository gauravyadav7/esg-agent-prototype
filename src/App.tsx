import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import TopNav from './components/Layout/TopNav';
import SummaryCard from './components/Dashboard/SummaryCard';
import EmissionsDonut from './components/Dashboard/EmissionsDonut';
import EmissionsBarChart from './components/Dashboard/EmissionsBarChart';
import AgentSidebar from './components/Copilot/AgentSidebar';
import Login from './components/Layout/Login';
import { dashboardData } from './data/mockData';
import { ChevronDown, RefreshCw } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav onChatToggle={() => setIsCopilotOpen(!isCopilotOpen)} />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Top Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded text-sm font-medium">Scope 1</button>
              <button className="px-4 py-1.5 text-gray-500 hover:bg-gray-100 rounded text-sm font-medium">Scope 2</button>
              <button className="px-4 py-1.5 bg-white text-gray-700 rounded shadow-sm text-sm font-medium">Results</button>
              <button className="px-4 py-1.5 text-gray-500 hover:bg-gray-100 rounded text-sm font-medium">Reports</button>
            </div>

            <div className="flex gap-2 text-sm text-gray-500 items-center">
              <div className="bg-white border border-gray-200 rounded px-3 py-1.5 flex items-center gap-2 cursor-pointer">
                2025 <ChevronDown size={14} />
              </div>
              <button className="bg-brand-green hover:bg-brand-darkGreen text-white px-4 py-1.5 rounded font-medium flex items-center gap-2 transition-colors">
                <RefreshCw size={14} /> Calculate Emissions
              </button>
            </div>
          </div>
          <div className="text-right text-xs text-gray-400 mb-2">Calculated Date: 07/01/2026</div>

          {/* Summary Cards Row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <SummaryCard title="Total Emissions" subTitle="Total Emissions" value={dashboardData.totalEmissions} unit="Tons CO₂e" />
            <SummaryCard title="Scope - 1" subTitle="Scope - 1" value={dashboardData.scope1} unit="Tons CO₂e" />
            <SummaryCard title="Scope - 2" subTitle="Scope - 2" value={dashboardData.scope2} unit="Tons CO₂e" />
            <SummaryCard title="Scope - 3" subTitle="Scope - 3" value={dashboardData.scope3} unit="Tons CO₂e" />
          </div>

          {/* Donut Charts Row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <EmissionsDonut value={dashboardData.totalEmissions} />
            <EmissionsDonut value={dashboardData.scope1} />
            {/* Empty placeholders for Scope 2 & 3 as per screenshot */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-80 flex flex-col">
              <h3 className="font-bold text-gray-700 mb-4">Scope - 2</h3>
              <div className="flex-1 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-gray-800">0</span>
                <span className="text-xs text-gray-500">Tons CO₂e</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-80 flex flex-col">
              <h3 className="font-bold text-gray-700 mb-4">Scope - 3</h3>
              <div className="flex-1 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-gray-800">0</span>
                <span className="text-xs text-gray-500">Tons CO₂e</span>
              </div>
            </div>
          </div>

          {/* Bar Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            <EmissionsBarChart title="Parameter-wise Emissions" data={dashboardData.parameterEmissions} yAxisWidth={140} />
            <EmissionsBarChart title="Entity-wise Emissions" data={dashboardData.entityEmissions} yAxisWidth={60} />
          </div>
        </main>
      </div>

      <AgentSidebar isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </div>
  );
}

export default App;
