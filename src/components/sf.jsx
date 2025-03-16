import React, { useEffect, useState } from 'react';

const Sf = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Data from MongoDB</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name} - {item.age}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sf;
