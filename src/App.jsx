import { Login } from "./components/login";
import './App.css'
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { Signup } from "./components/signup";
import { Home } from "./components/home";
import { Message } from "./components/message";
import { SendMsg } from "./components/sendMsg";
import { useEffect, useState } from "react";

export function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('username'));
    
  const expiredToken = () => {
    const location = useLocation();

    useEffect(() => {
      const loginTime = localStorage.getItem('loginTime');
      const thirtyDays = 1000 * 60 * 60 * 24 * 30; // 30 days in ms
      const now = Date.now();

      if (loginTime && now - parseInt(loginTime) >= thirtyDays) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }, [location]);
  };


  const router = createBrowserRouter([
    {
      path : '/signup',
      element : (
        <div>
          <Signup />
        </div>
      )
    },
    {
      path : '/login',
      element : (
        <div>
          <Login/>
        </div>
      )
    },
    {
      path : '/',
      element : (
        <div>
          <Home expiredToken={expiredToken}/>
        </div>
      )
    },
    {
      path : '/messages',
      element : (
        <div>
          <Message expiredToken={expiredToken}/>
        </div>
      )
    },
    {
      path : `/:username`,
      element : (
        <div>
          <SendMsg/>
        </div>
      )
    },
  ])

  return (
    <RouterProvider router={router}/>
  )
}