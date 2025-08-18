import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import StudentForm from "./components/studentForm.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function AppWrapper() {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    setIsAdminLoggedIn(!!localStorage.getItem("admin_token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAdminLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-white shadow-md py-4 px-8 flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Complete Your Profile
        </h1>

        <nav className="space-x-6 flex items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/admin"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
          >
            Admin
          </Link>

          {isAdminLoggedIn && (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

// Wrap in Router
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
