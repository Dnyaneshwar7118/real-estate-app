
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, fetchUserByEmail } from '../api/axios';
import '../Styles/registration/style.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { name, email, password } = formData;
    setIsDisabled(!(name && email && password && confirmPassword && password === confirmPassword));
    setPasswordMatch(password === confirmPassword);
  }, [formData, confirmPassword]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Account created successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Failed to register. Try again.');
    }
  };

  return (
    <section className='register-container'>
      <form onSubmit={handleSubmit} className="register-form-wrapper">
        <h2 className="register-heading-wrapper">Register</h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="register-input-wrapper">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="register-form-input"
          />
        </div>
        <div>
          <label className="register-password-wrapper">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            required
            className='register-form-input'
          />
        </div>
        <div>
          <label className="register-password-wrapper">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='register-password-wrapper'
          />
          {!passwordMatch && (
            <p className="register-password-wrapper">Passwords do not match</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className="register-gradient-btn-wrapper"
        >
          Register →
        </button>
        <p className="register-link">
          Already have an account?{' '}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
