// App.js
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Map from './map'; // Corrected to './map.js' 
import Data from './data'; // Corrected to './data.js' 
import './index.css'; // Importing CSS for styling

function App() {
  const [covidData, setCovidData] = useState([]);
  const [tbData, setTbData] = useState([]);
  const [malariaData, setMalariaData] = useState([]);

  useEffect(() => {
    // Fetch COVID-19 data for India
    fetch('https://disease.sh/v3/covid-19/countries/IN')
      .then((response) => response.json())
      .then((data) => setCovidData([data])) // Wrapping data in an array
      .catch((error) => {
        console.error('Error fetching COVID-19 data:', error);
        // Fallback to mock data
        setCovidData([
          {
            country: 'India',
            cases: 34345875,
            lat: 20.5937,
            long: 78.9629,
          },
        ]);
      });

    // Fetch TB data
    fetch('https://ghoapi.azureedge.net/api/TB_cases')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => setTbData(data.value))
      .catch((error) => {
        console.error('Error fetching TB data:', error);
        // Fallback to mock data
        setTbData([
          { SpatialDim: 'India', NumericValue: 2700000, lat: 20.5937, long: 78.9629 },
        ]);
      });

    // Fetch Malaria data
    fetch('https://ghoapi.azureedge.net/api/MALARIA_cases')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => setMalariaData(data.value))
      .catch((error) => {
        console.error('Error fetching Malaria data:', error);
        // Fallback to mock data
        setMalariaData([
          { SpatialDim: 'India', NumericValue: 500000, lat: 20.5937, long: 78.9629 },
        ]);
      });
  }, []);

  return (
    <div>
      <h1>Epidemic Disease Tracker</h1>
      <Map covidData={covidData} tbData={tbData} malariaData={malariaData} />
      <Data covidData={covidData} tbData={tbData} malariaData={malariaData} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;