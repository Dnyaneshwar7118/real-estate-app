import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserByEmail } from '../api/axios';
import '../Styles/Login/style.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailExists, setEmailExists] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false); // <-- New loader state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const users = await fetchUserByEmail(formData.email);

      if (users.length === 0) {
        setEmailExists(false);
        setPasswordMatch(true);
        setLoading(false); // Hide loader
        return;
      }

      setEmailExists(true);
      const user = users[0];

      if (user.password === formData.password) {
        setPasswordMatch(true);
        setTimeout(() => {
          alert('Logged in successfully!');
          navigate('/add-property');
        }, 3000); // Delay for effect
      } else {
        setPasswordMatch(false);
        setLoading(false); // Hide loader
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong while logging in.');
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="gradient-bg">
      <form onSubmit={handleSubmit} className="form-card-wrapper">
        <h2 className="form-title">Welcome Back!</h2>

        <div>
          <label className="input-label">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
          {!emailExists && (
            <p style={{ color: 'red', fontSize: '0.9rem' }}>
              Account does not exist.
            </p>
          )}
        </div>

        <div>
          <label className="input-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
          {!passwordMatch && emailExists && (
            <p style={{ color: 'red', fontSize: '0.9rem' }}>
              Password does not match.
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
    </div>
  );
};

export default Login;
