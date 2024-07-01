import { useEffect, useState } from 'react';
import './SubmittedData.css';

const SubmittedData = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/form');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data', error);
      }
    };

    fetchData();
  }, []);

  if (formData === null) {
    return <div className="loading">Loading...</div>;
  }

  // Filter out entries where any of the required fields (firstName, lastName, email, password) are missing
  const filteredData = formData.filter(data => data.firstName && data.lastName && data.email && data.password);

  return (
    <>
      <h1>Submitted Data</h1>
      <div className="submitted-data">
        {filteredData.length === 0 ? (
          <div className="no-data">No valid submitted data available</div>
        ) : (
          filteredData.map((data, index) => (
            <div className="form-data" key={index}>
              <p><strong>First Name:</strong> {data.firstName}</p>
              <p><strong>Last Name:</strong> {data.lastName}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Password:</strong> {data.password}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </>

  );
};

export default SubmittedData;
