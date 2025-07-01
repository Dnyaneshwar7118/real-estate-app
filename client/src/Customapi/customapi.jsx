import { useState, useEffect } from "react";
import './Styles/registration/style.css';
import { Link, useNavigate } from 'react-router-dom';
import Eye from '/eye.svg';
import CircleLoad from "/LoadingSvg/Infinity.svg";
import CustomApi from "../../CustomApi/CustomApi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailVerified, setEmailVerified] = useState(true);
  const [passwordMatching, setPasswordMatching] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const navigate = useNavigate();

  const {
    data: allUsers,
    loading,
    error
  } = CustomApi({ url: "http://localhost:3000/Sign_Up_Data" });

  // 👁 Check if password matches and email exists
  useEffect(() => {
    if (email && password && confirmPassword) {
      let emailFound = allUsers?.some((user) => user.email === email);
      if (emailFound) {
        setEmailVerified(false);
        setDisableSubmit(true);
      } else if (password !== confirmPassword) {
        setPasswordMatching(false);
        setDisableSubmit(true);
      } else {
        setEmailVerified(true);
        setPasswordMatching(true);
        setDisableSubmit(false);
      }
    } else {
      setDisableSubmit(true);
    }
  }, [email, password, confirmPassword, allUsers]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/Sign_Up_Data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert("Failed to register. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      {error ? (
        <h2 className="Error">Error loading users: {error}</h2>
      ) : loading ? (
        <img src={CircleLoad} alt="Loading" className="circleLoader" />
      ) : (
        <div className="min-h-screen flex items-center justify-center gradient-bg">
          <form
            onSubmit={handleRegister}
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
              {!emailVerified && (
                <small className="text-red-600 font-semibold">
                  ⚠️ Email already registered
                </small>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <img
                  src={Eye}
                  alt="Toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-2 cursor-pointer w-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <img
                  src={Eye}
                  alt="Toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-2 right-2 cursor-pointer w-6"
                />
              </div>
              {confirmPassword && !passwordMatching && (
                <small className="text-red-600 font-semibold">
                  ⚠️ Passwords do not match
                </small>
              )}
            </div>

            <button
              type="submit"
              disabled={disableSubmit}
              className={`w-full py-2 font-semibold text-white rounded-lg gradient-btn transition-all duration-300 ${disableSubmit ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              Register →
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
