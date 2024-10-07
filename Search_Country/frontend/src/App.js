import './App.css';
import React, { useState, useEffect} from 'react';

function App() {

  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/countries?q=${search}`)
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, [search]);

  return (
    <div className="App">
      <h1>Country Searcher</h1>
      <input 
        type = "text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {countries.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
