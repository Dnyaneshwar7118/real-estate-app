import { useEffect, useState } from 'react';
import { getAllProperties } from '../api/axios';

import '../Styles/Listings/style.css';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minRent: '',
    maxRent: ''
  });

  const fetchProperties = async () => {
    try {
      const data = await getAllProperties();
      setProperties(data);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filtered = properties.filter((prop) => {
    console.log("####", prop);

    const { city, type, minRent, maxRent } = filters;
    const rent = parseInt(prop.rent, 10);
    const min = parseInt(minRent) || 0;
    const max = parseInt(maxRent) || Infinity;

    return (
      (!city || prop.city.toLowerCase().includes(city.toLowerCase())) &&
      (!type || prop.type === type) &&
      rent >= min &&
      rent <= max
    );
  });

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="listing-container gradient-bg min-h-screen p-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-xl p-4 max-w-6xl mx-auto shadow-xl">

        {/* Filters */}
        <div className="input-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Search Property's Details 🏡</h1>
          <input
            name="city"
            placeholder="Search by City"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="minRent"
            placeholder="Min Rent"
            onChange={handleChange}
            type="number"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="maxRent"
            placeholder="Max Rent"
            onChange={handleChange}
            type="number"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="type"
            onChange={handleChange}
            className="select-wrapper border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>
        </div>
      </div>
      {/* Property Cards */}
      <div className="property-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <h1>Existing Property List 🏡</h1>
        {filtered.length === 0 ? (
          <p className="input-wrapper col-span-full text-gray-500">
            No properties match your filters.
          </p>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="property-card bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="p-4 details-wrapper">
                {/* <h3 className="text-xl font-semibold text-gray-800 mb-1">{p.title || 'No Title'}</h3> */}
                <div className="existing-details-wrapper">
                  <div className="img-wrapper">
                    <img src={`http://localhost:5000${p.imageUrl}`} alt="" />
                  </div>
                  <div className="info-wrapper">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{p.title || 'No Title'}</h3>
                    <p className="text-gray-600">{p.city} | {p.type}</p>
                    <p className="text-blue-600 font-bold mt-2 text-lg">₹{p.rent}</p>
                    <p className="text-gray-500 mt-1">{p.description}</p>
                    {p.contact && <p className="text-gray-500 mt-1">Contact: {p.contact}</p>}
                  </div>
                  <div className="delete-wrapper">
                    <button>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Listings;
