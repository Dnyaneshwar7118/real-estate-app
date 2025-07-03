import { useState } from 'react';
import { postProperty } from '../api/axios';
import { Link } from 'react-router-dom';
import '../Styles/Addproperty/style.css';

const AddProperty = () => {
  const [property, setProperty] = useState({
    title: '',
    city: '',
    rent: '',
    type: '',
    description: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('title', property.title);
      formData.append('city', property.city);
      formData.append('rent', property.rent);
      formData.append('type', property.type);
      formData.append('description', property.description);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      await postProperty(formData);
      alert('Property added successfully!');

      // Reset form
      setProperty({
        title: '',
        city: '',
        rent: '',
        type: '',
        description: ''
      });
      setImageFile(null);
      setImagePreview(null);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      console.error(err);
      alert('Failed to add property');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addproperty-wrapper">
      <div className="addproperty-label-wrapper">
        <h2 className="addproperty-heading-wrapper">Add New Property</h2>

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
          <label>Property Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Property preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
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

        <div className="mb-4 link-wrapper">
          <Link to="/listings" className="text-blue-600 hover:underline font-medium text-center">
            Show Existing Property's Details 🔙
          </Link>
        </div>

        <button type="submit" className="gradient-btn w-full">
          Add Property →
        </button>
      </div>
    </form>
  );
};

export default AddProperty;