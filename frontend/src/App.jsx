import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Petitions from "./components/Petitions";
import CreatePetition from "./components/CreatePetition";
import DashboardContent from "./components/DashboardContent";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* --- PROTECTED ROUTES --- */}
          <Route element={<ProtectedRoute />}>
            {/* The Dashboard component is now the layout for all nested routes */}
            <Route element={<Dashboard />}>
              <Route path="/dashboard" element={<DashboardContent />} />
              <Route path="/petitions" element={<Petitions />} />
              <Route path="/petitions/create" element={<CreatePetition />} />
              {/* You can easily add more routes like "/polls" here */}
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
