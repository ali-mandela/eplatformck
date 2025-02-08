import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { ToastContainer } from 'react-toastify';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EventPage from "./pages/EventPage";

import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import axios from "axios";

// ✅ Set default base URL for Axios globally
axios.defaults.baseURL = import.meta.env.VITE_API_KEYBASE_URL;

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes (Accessible when NOT logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes (Only accessible when LOGGED IN) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>

        {/* Public Routes (Always Accessible) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/e/:id" element={<EventPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
