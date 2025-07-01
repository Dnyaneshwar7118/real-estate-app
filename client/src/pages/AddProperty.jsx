// src/pages/AddProperty.jsx
import { useState } from 'react';
import { postProperty } from '../api/axios';
import { Link } from 'react-router-dom'; // Required for navigation
import '../Styles/Addproperty/style.css';

const AddProperty = () => {
  const [property, setProperty] = useState({
    title: '',
    city: '',
    rent: '',
    type: '',
    description: ''
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postProperty(property);
      alert('✅ Property added successfully!');

      // Reset form after success
      setProperty({
        title: '',
        city: '',
        rent: '',
        type: '',
        description: ''
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add property');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-bold mb-4">Add New Property</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={property.title}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Enter title"
        />
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={property.city}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Enter city"
        />
      </div>

      <div>
        <label>Rent (₹)</label>
        <input
          type="number"
          name="rent"
          value={property.rent}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Enter rent amount"
        />
      </div>

      <div>
        <label>Type</label>
        <select
          name="type"
          value={property.type}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="">Select Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={property.description}
          onChange={handleChange}
          required
          rows={4}
          className="form-control"
          placeholder="Describe the property"
        ></textarea>
      </div>

      {/* 🔗 Link to Listings page */}
      <div className="mb-4 link-wrapper">
        <Link to="/listings" className="text-blue-600 hover:underline font-medium text-center">
          Show Existing Property's Details 🔙
        </Link>
      </div>

      <button type="submit" className="gradient-btn w-full">
        Add Property →
      </button>
    </form>
  );
};

export default AddProperty;
