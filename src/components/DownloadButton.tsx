import { getCurrentSessionData } from '../services/indexedDB';
import { convertSensorDataToCSV, downloadCSV } from '../utils/csvExport';
import Button from './Button';

interface DownloadButtonProps {
    className?: string;
}


const DownloadButton = ({className} : DownloadButtonProps) => {
  const handleDownload = async () => {
    try {
      // Get current session data
      const sessionData = await getCurrentSessionData();
      
      if (sessionData.length === 0) {
        console.warn('No data available to download');
        alert('No data available to download');
        return;
      }
      
      // Convert to CSV format
      const csvData = convertSensorDataToCSV(sessionData.map(item => item.data));
      
      // Generate filename with timestamp
      const now = new Date();
      const filename = `sensor-data-${now.toISOString().split('T')[0]}-${now.toTimeString().split(' ')[0].replace(/:/g, '-')}.csv`;
      
      // Download the CSV
      downloadCSV(csvData, filename);
      
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Error downloading data. Please try again.');
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      color="blue" 
      className={`font-semibold mx-10 text-black ${className}`}
    >
      DOWNLOAD DATA
    </Button>
  );
};

export default DownloadButton;
