import { useState, useEffect } from 'react';

function App() {
  // 1. حالة تخزين بيانات العقار
  const [formData, setFormData] = useState({
    carpet_area_sqft: 1200,
    floor_num: 3,
    bathroom: 2,
    balcony: 1,
    location_grouped: 'other',
    Furnishing: 'Unfurnished',
    Transaction: 'Resale',
    Ownership: 'Freehold',
    facing: 'East'
  });

  const [locations, setLocations] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. جلب المناطق تلقائياً من الـ Backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/locations')
      .then((res) => res.json())
      .then((data) => {
        if (data.locations) setLocations(data.locations);
      })
      .catch((err) => console.error('Error fetching locations:', err));
  }, []);

  // 3. تحديث البيانات عند إدخال المستخدم
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 4. إرسال طلب التوقع للـ Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictedPrice(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setPredictedPrice(data.predicted_price);
      } else {
        alert('Error: ' + JSON.stringify(data.detail));
      }
    } catch (error) {
      alert('Cannot connect to the backend server!');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>🏡 House Price Prediction</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        
        <div>
          <label style={{ fontWeight: 'bold' }}>Carpet Area (sqft):</label>
          <input type="number" name="carpet_area_sqft" value={formData.carpet_area_sqft} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>Floor Number:</label>
          <input type="number" name="floor_num" value={formData.floor_num} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>Bathrooms:</label>
          <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>Balconies:</label>
          <input type="number" name="balcony" value={formData.balcony} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>Location:</label>
          <select name="location_grouped" value={formData.location_grouped} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>Furnishing:</label>
          <select name="Furnishing" value={formData.Furnishing} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Furnished">Furnished</option>
          </select>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
          {loading ? 'Predicting...' : 'Predict Price'}
        </button>
      </form>

      {predictedPrice !== null && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f8f5', border: '1px solid #2ecc71', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: 0, color: '#27ae60' }}>Estimated Price:</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#2c3e50' }}>
            ₹ {predictedPrice.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;