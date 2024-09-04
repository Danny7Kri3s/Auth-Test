import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ClientDashboard from "./components/ClientDashboard";
import AgentDashboard from "./components/AgentDashboard";
import AdminDasboard from './components/AdminDasboard';
import Login from "./components/Login";
import { useAuth } from "./context/Auth";
import Register from './components/Register';

const Router = () => {
  const { user } = useAuth(); // Get the authenticated user from context

  // Define routes for different user roles
  const agentRoutes = [
    {
      path: '/agent',
      element: user && user.role.toLowerCase() === 'agent' ? <AgentDashboard /> : <Navigate to="/" replace />,
    },
  ];

  const clientRoutes = [
    {
      path: '/client',
      element: user && user.role.toLowerCase() === 'client' ? <ClientDashboard /> : <Navigate to="/" replace />,
    },
  ];

  const adminRoutes = [
    {
      path: '/admin',
      element: user && user.role.toLowerCase() === 'admin' ? <AdminDasboard /> : <Navigate to="/" replace />,
    },
  ];

  // Main route configuration
  const config = createBrowserRouter([
    {
      path: '/',
      element: user ? <Navigate to={`/${user.role.toLowerCase()}`} replace /> : <Login />,  // Redirect to user's role dashboard if authenticated
    },
    {
      path: '/register',
      element: <Register /> 
    },
    ...agentRoutes,
    ...clientRoutes,
    ...adminRoutes,
  ]);

  return <RouterProvider router={config} />;
};

export default Router;