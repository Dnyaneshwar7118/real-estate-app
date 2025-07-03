import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserByEmail } from '../api/axios';

import '../Styles/Login/style.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetchUserByEmail(formData.email, formData.password);

      if (!response.token) {
        setPasswordMatch(false);
        setLoading(false);
        return;
      }

      setPasswordMatch(true);
      setTimeout(() => {
        alert('Logged in successfully!');
        navigate('/add-property');
      }, 3000);

    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong while logging in.');
      setLoading(false);
    }
  };

  return (
    <section className='login-wrapper'>
      <form onSubmit={handleSubmit} className="login-form-wrapper">
        <h2 className="login-form-title">Welcome Back!</h2>

        <div>
          <label className="login-input-wrapper">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div>
          <label className="login-password-wrapper">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
          {!passwordMatch && (
            <p style={{ color: 'red', fontSize: '0.9rem' }}>
              Invalid credentials.
            </p>
          )}
        </div>

        <button type="submit" className="gradient-btn-wrapper" disabled={loading}>
          {loading ? 'Logging in...' : 'Submit →'}
        </button>

        <p className="login-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        <p className="login-link">
          <Link to="/listings">View listings without login</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
