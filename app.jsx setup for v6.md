```js
import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthLayout from './components/Layout';
import Chat from './pages/Chat';
import GuestLayout from './components/Layout/GuesLayout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>

      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/chat/:chatId" element={<Chat />} />
          {/* <Route path="/chat/:chatId/:memberId" element={<Chat />} /> */}

        </Route>

        <Route path="/" element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
```

```js

import React, { useEffect} from 'react'
import {  Outlet , useNavigate } from 'react-router-dom';
import { useAuth } from "../../hook/useAuth";


function GuestLayout() {
  const { authData } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (authData.user){
      navigate("/")
    }
  }, [authData.user])
  
  return (
    <>
        <Outlet/>
    </>
  )
}

export default GuestLayout

```

```js

import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import SidePanel from './SidePanel.jsx';
import { useAuth } from "../../hook/useAuth";
import Header from './Header.jsx';



function AuthLayout() {
  const { authData } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!authData.user) {
      navigate("/login")
    }
  }, [authData.user])

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div>
          <section >
            <div className="container pb-5 pt-2">
              <div className="row">
                <SidePanel />
                <Outlet />
                
              </div>
            </div>
          </section>
        </div>
      </div>


    </>
  )
}

export default AuthLayout
```



