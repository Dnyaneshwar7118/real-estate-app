import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Find user by email (Login)
export const fetchUserByEmail = async (email, password) => {
  const data = {
    email,
    password,
  };
  const res = await API.post('/login', data);

  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }

  return res.data;
};

// Register new user
export const registerUser = async (data) => {
  const res = await API.post('/register', data);
  return res.data;
};

//  Add new property (Send token manually)
export const postProperty = async (data) => {
  const token = localStorage.getItem('token');

  const res = await API.post('/properties', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};

// Get all properties (Send token manually)
export const getAllProperties = async () => {
  const token = localStorage.getItem('token');

  const res = await API.get('/properties', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};
