import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    setIsAuthenticated(!!accessToken);
  }, []);

  const setCookies = (accessToken: string, refreshToken: string) => {
    Cookies.set('accessToken', accessToken, {
      expires: 7, // 7일간 유지
      secure: true, // HTTPS에서만 작동
      sameSite: 'None' // CSRF 방지
    });

    Cookies.set('refreshToken', refreshToken, {
      expires: 30, // 30일간 유지
      secure: true,
      sameSite: 'None'
    });
    setIsAuthenticated(true);
  }



  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return { isAuthenticated, logout, setCookies };
}; 