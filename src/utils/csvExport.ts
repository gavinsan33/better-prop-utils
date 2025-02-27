import { SensorData } from "../types/SensorData";

export const convertSensorDataToCSV = (data: SensorData[]): string => {
  if (!data || data.length === 0) {
    return '';
  }
  
  // Get the first data point to determine structure
  const sampleData = data[0];
  
  // Create headers
  let headers = ['timestamp'];
  
  // Add pressure sensor headers
  Object.keys(sampleData.data.pressureSensors).forEach(sensor => {
    headers.push(`pressure_${sensor}`);
  });
  
  // Add temperature sensor headers
  Object.keys(sampleData.data.tempSensors).forEach(sensor => {
    headers.push(`temp_${sensor}`);
  });
  
  // Create CSV content
  const csvContent = [headers.join(',')];
  
  // Add data rows
  data.forEach(sensorData => {
    const row = [sensorData.timeStamp.toString()];
    
    // Add pressure sensor values
    Object.values(sensorData.data.pressureSensors).forEach(sensor => {
      row.push(sensor.sensorReading.toString());
    });
    
    // Add temperature sensor values
    Object.values(sensorData.data.tempSensors).forEach(sensor => {
      row.push(sensor.sensorReading.toString());
    });
    
    csvContent.push(row.join(','));
  });
  
  return csvContent.join('\n');
};

export const downloadCSV = (csvContent: string, filename: string = 'sensor-data.csv'): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set link properties
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  // Add to DOM, trigger download and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
