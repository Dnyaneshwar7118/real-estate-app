import axios from "axios";

const USER_API = "http://localhost:3000/users";
const PROPERTY_API = "http://localhost:3000/rentProperties";

// 🔍 Get all users
export const getAllUsers = async () => {
  const res = await axios.get(USER_API);
  return res.data;
};

// 🔍 Find user by email
export const fetchUserByEmail = async (email) => {
  const res = await axios.get(`${USER_API}?email=${email}`);
  return res.data;
};

// 📝 Register new user
export const registerUser = async (data) => {
  const res = await axios.post(USER_API, data);
  return res.data;
};

// 🏠 Add new property
export const postProperty = async (data) => {
  const res = await axios.post(PROPERTY_API, data);
  return res.data;
};

// 📄 Get all properties
export const getAllProperties = async () => {
  const res = await axios.get(PROPERTY_API);
  return res.data;
};
