
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserByEmail, registerUser, getAllUsers } from '../api/axios';
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
      const existingUser = await fetchUserByEmail(formData.email);
      if (existingUser.length > 0) {
        alert('User already exists with this email!');
        return;
      }

      await registerUser(formData);
      alert('Account created successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Failed to register. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>

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
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {!passwordMatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="w-full py-2 font-semibold text-white rounded-lg gradient-btn transition-all duration-300 disabled:opacity-50"
        >
          Register →
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
