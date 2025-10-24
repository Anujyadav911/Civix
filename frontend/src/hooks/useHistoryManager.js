import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useHistoryManager = (isAuthenticated, loading) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only run this effect when authentication state is determined
    if (loading) return;

    // If user is not authenticated and trying to access protected routes
    if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register') {
      // Replace current history entry to prevent back button issues
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  // Prevent back button when on login page and user is authenticated
  useEffect(() => {
    if (!loading && isAuthenticated && location.pathname === '/login') {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);
};
