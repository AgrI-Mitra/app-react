import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

type User = {
  username: string;
  expiredAt: number;
  accessToken: string;
  avatar?: string;
  id: string;
};

export const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter();

  const login = useCallback(() => {
    // No need to check for auth if access token is not present
    if (cookies.access_token) {
      const decodedToken: JwtPayload = jwt.decode(cookies.access_token) as JwtPayload;
      const expires = new Date(decodedToken?.exp || 0 * 1000);
      // if token not expired then check for auth
      if (expires > new Date()) {
        const token = cookies.access_token;
        axios
          .get(`/api/auth?token=${token}`)
          .then((response) => {
            if (response.data === null) {
              toast.error('Invalid Access Token');
              removeCookie('access_token', { path: '/' });
              localStorage.clear();
              sessionStorage.clear();
              // router.push('/login');
              console.log('response null');
            } else {
              setIsAuthenticated(true);
              console.log('authenticated true');
            }
          })
          .catch((err) => {
            removeCookie('access_token', { path: '/' });
            localStorage.clear();
            sessionStorage.clear();
            // router.push('/login');
            console.log('catch err');
          });
      } else {
        removeCookie('access_token', { path: '/' });
        localStorage.clear();
        sessionStorage.clear();
        // router.push('/login');
        if (typeof window !== 'undefined') window?.location.reload();
      }
    }
  }, [cookies.access_token, removeCookie]);

  return { isAuthenticated, login };
};
