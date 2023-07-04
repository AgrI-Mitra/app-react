import React from 'react';
import './styles/globals.css';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ContextProvider from './context/ContextProvider';
import { useEffect, useState } from 'react';
import 'chatui/dist/index.css';
import { Toaster } from 'react-hot-toast';
// import { useCookies } from 'react-cookie';
// import { useLogin } from './hooks';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import LaunchPage from './components/LaunchPage';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
// import Menu from './components/menu';
import { useContext } from 'react';
import { AppContext } from './context';
import styles from './components/dialer-popup/index.module.css';
import DialerPopUp from './components/dialer-popup';
import ChatUiWindow from './components/PhoneView/ChatWindow/ChatUiWindow';

const App = () => {
  const context = useContext(AppContext);
  // const { isAuthenticated, login } = useLogin();
  const [launch, setLaunch] = useState(true);
  // const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    setTimeout(() => {
      setLaunch(false);
    }, 2500);

    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    (async () => {
      // Get the visitor identifier when you need it.
      const fp = await fpPromise;
      const result = await fp.get();
      const stringToUuid = (str: any) => {
        str = str.replace('-', '');
        return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(
          /[x]/g,
          function (c, p) {
            return str[p % str.length];
          }
        );
      };
      localStorage.setItem('userID', stringToUuid(result?.visitorId));
    })();
  }, []);

  // const handleLoginRedirect = useCallback(() => {
  //   if (router.pathname === '/login' || router.pathname.startsWith('/otp')) {
  //     // already logged in then send to home
  //     if (cookie['access_token'] && localStorage.getItem('userID')) {
  //       router.push('/');
  //     }
  //   } else {
  //     // not logged in then send to login page
  //     if (!cookie['access_token'] || !localStorage.getItem('userID')) {
  //       localStorage.clear();
  //       sessionStorage.clear();
  //       router.push('/login');
  //     }
  //   }
  // }, [cookie, router]);

  // useEffect(() => {
  //   handleLoginRedirect();
  // }, [handleLoginRedirect]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     login();
  //   }
  // }, [isAuthenticated, login]);

  if (process.env.NODE_ENV === 'production') {
    globalThis.console.log = () => {};
  }

  if (launch) {
    return <LaunchPage />;
  } else {
    return (
      <ChakraProvider>
        <ContextProvider>
          <div style={{ height: '100%' }}>
            <Toaster position="top-center" reverseOrder={false} />
            <NavBar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div
                      style={{
                        position: 'fixed',
                        width: '100%',
                        bottom: '1vh',
                        top: '75px',
                      }}>
                      <HomePage />
                      {/* <DownTimePage/> */}
                    </div>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <>
                      {context?.showDialerPopup && (
                        <div
                          className={styles.overlay}
                          onClick={() => context?.setShowDialerPopup(false)}>
                          {/* Only render the DialerPopup component when showDialerPopup is true */}
                          {context?.showDialerPopup && (
                            <DialerPopUp
                              setShowDialerPopup={context?.setShowDialerPopup}
                            />
                          )}
                        </div>
                      )}
                      <div
                        style={{
                          position: 'fixed',
                          width: '100%',
                          bottom: '1vh',
                          top: '70px',
                        }}>
                        <ChatUiWindow />
                      </div>
                      {/* <Menu /> */}
                    </>
                  }
                />
              </Routes>
          </div>
        </ContextProvider>
      </ChakraProvider>
    );
  }
};

export default App;
