import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Roles from './pages/Roles';
import Files from './pages/Files';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import InstructorDashboard from './pages/InstructorDashboard';
import { useTeam, TeamProvider } from './context/TeamContext';

const AppRoutes = () => {
  const { currentUser } = useTeam();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={currentUser ? <Navigate to="/app/dashboard" replace /> : <Login />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
        
        <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="roles" element={<Roles />} />
          <Route path="files" element={<Files />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <TeamProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <AppRoutes />
    </TeamProvider>
  );
}

export default App;
