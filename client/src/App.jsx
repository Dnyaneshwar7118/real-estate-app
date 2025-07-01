import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AddProperty from './pages/AddProperty';
import Listings from './pages/Listings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Show Login page first when visiting '/' */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </Router>
  );
}

export default App;
