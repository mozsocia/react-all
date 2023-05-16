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
