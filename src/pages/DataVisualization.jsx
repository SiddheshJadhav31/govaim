import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileUp, BarChart2, PieChart as PieChartIcon, RefreshCw } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Sample dataset (we'll use COVID-19 data as an example)
const sampleData = [
  { country: 'USA', cases: 1000000, deaths: 50000, recovered: 900000 },
  { country: 'India', cases: 800000, deaths: 40000, recovered: 720000 },
  { country: 'Brazil', cases: 600000, deaths: 30000, recovered: 540000 },
  { country: 'UK', cases: 400000, deaths: 20000, recovered: 360000 },
  { country: 'France', cases: 300000, deaths: 15000, recovered: 270000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DataVisualization = () => {
  const [data, setData] = useState(sampleData);
  const [activeChart, setActiveChart] = useState('bar');
  const { toast } = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real application, you would process the CSV file here
      toast({
        title: "File uploaded",
        description: "Your data has been processed successfully.",
      });
    }
  };

  const pieData = data.map(item => ({
    name: item.country,
    value: item.cases
  }));

  return (
    <div className="space-y-8 p-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Visualization Dashboard</h1>
          <p className="text-gray-600 mt-2">Interactive visualization of your dataset</p>
        </div>
        <div className="flex gap-4">
          <label className="btn-primary flex items-center gap-2 cursor-pointer">
            <FileUp className="w-4 h-4" />
            Upload Dataset
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>
          <button 
            className="btn-secondary flex items-center gap-2"
            onClick={() => setData(sampleData)}
          >
            <RefreshCw className="w-4 h-4" />
            Reset Data
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Cases by Country</h2>
            <div className="flex gap-2">
              <button
                className={`p-2 rounded ${activeChart === 'bar' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => setActiveChart('bar')}
              >
                <BarChart2 className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded ${activeChart === 'pie' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => setActiveChart('pie')}
              >
                <PieChartIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="h-[400px]">
            {activeChart === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cases" fill="#0088FE" name="Total Cases" />
                  <Bar dataKey="recovered" fill="#00C49F" name="Recovered" />
                  <Bar dataKey="deaths" fill="#FF8042" name="Deaths" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Statistics Overview</h2>
          <div className="space-y-4">
            {Object.entries(data.reduce((acc, curr) => ({
              'Total Cases': (acc['Total Cases'] || 0) + curr.cases,
              'Total Recovered': (acc['Total Recovered'] || 0) + curr.recovered,
              'Total Deaths': (acc['Total Deaths'] || 0) + curr.deaths,
              'Recovery Rate': ((acc['Total Recovered'] || 0) + curr.recovered) / 
                             ((acc['Total Cases'] || 0) + curr.cases) * 100,
            }), {})).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{key}</span>
                <span className="text-lg">
                  {key.includes('Rate') ? 
                    `${value.toFixed(2)}%` : 
                    value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;