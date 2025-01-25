import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartBar, ChartPie, Users } from 'lucide-react';
import titanicData from '../data/titanic.json';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DataVisualization = () => {
  const { toast } = useToast();
  const [survivalData, setSurvivalData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageDistribution, setAgeDistribution] = useState([]);

  useEffect(() => {
    try {
      // Process survival statistics
      const survivalStats = processData(titanicData, 'Survived');
      setSurvivalData(survivalStats);

      // Process passenger class statistics
      const classStats = processData(titanicData, 'Pclass');
      setClassData(classStats);

      // Process gender statistics
      const genderStats = processData(titanicData, 'Sex');
      setGenderData(genderStats);

      // Process age distribution
      const ageGroups = processAgeData(titanicData);
      setAgeDistribution(ageGroups);

    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to process the dataset",
        variant: "destructive",
      });
    }
  }, []);

  const processData = (data, field) => {
    const counts = data.reduce((acc, curr) => {
      const key = curr[field].toString();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([name, value]) => ({
      name: field === 'Survived' ? (name === '1' ? 'Survived' : 'Did not survive') :
            field === 'Pclass' ? `Class ${name}` : name,
      value
    }));
  };

  const processAgeData = (data) => {
    const ageRanges = {
      '0-15': 0,
      '16-30': 0,
      '31-45': 0,
      '46-60': 0,
      '60+': 0
    };

    data.forEach(passenger => {
      const age = passenger.Age;
      if (age <= 15) ageRanges['0-15']++;
      else if (age <= 30) ageRanges['16-30']++;
      else if (age <= 45) ageRanges['31-45']++;
      else if (age <= 60) ageRanges['46-60']++;
      else ageRanges['60+']++;
    });

    return Object.entries(ageRanges).map(([range, count]) => ({
      name: range,
      value: count
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Titanic Dataset Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Survival Statistics */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Survival Statistics</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={survivalData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {survivalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Passenger Class Distribution */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ChartBar className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Passenger Class Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Gender Distribution */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ChartPie className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Gender Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Age Distribution */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ChartBar className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Age Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default DataVisualization;