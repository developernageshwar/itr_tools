import { useState, useEffect } from 'react';

// Hook to manage authentication state
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    setLoading(false);
  }, []);

  return { user, loading };
};
