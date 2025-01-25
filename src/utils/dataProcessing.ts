import { TitanicData } from '../types/data';

export const processDataForVisualization = (data: TitanicData[]) => {
  // Process categorical data (similar to Python's value_counts)
  const processCategoricalData = (key: keyof TitanicData) => {
    const counts: { [key: string]: number } = {};
    data.forEach(item => {
      const value = String(item[key]);
      counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  // Process numerical data for histograms
  const processNumericalData = (key: keyof TitanicData) => {
    const values = data.map(item => Number(item[key])).filter(val => !isNaN(val));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binCount = 10;
    const binSize = (max - min) / binCount;
    
    const bins = Array(binCount).fill(0);
    values.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
      bins[binIndex]++;
    });

    return bins.map((count, i) => ({
      range: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
      count
    }));
  };

  return {
    // Categorical distributions
    passengerClass: processCategoricalData('Pclass'),
    gender: processCategoricalData('Sex'),
    embarked: processCategoricalData('Embarked'),
    survived: processCategoricalData('Survived'),
    
    // Numerical distributions
    age: processNumericalData('Age'),
    fare: processNumericalData('Fare'),
  };
};