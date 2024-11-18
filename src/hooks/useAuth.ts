import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('ACCESS_TOKEN');
    setIsAuthenticated(!!accessToken);
  }, []);

  const logout = () => {
    Cookies.remove('ACCESS_TOKEN');
    Cookies.remove('REFRESH_TOKEN');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return { isAuthenticated, logout };
}; 