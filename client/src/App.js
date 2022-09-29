import React, { useContext } from 'react';
import Home from './pages/home/Home';
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Profile from "./pages/profile/Profile"
import { BrowserRouter, Routes,Route, Navigate } from "react-router-dom"
import NotFound from './pages/notFound/NotFound';
import { authContext } from './context/AuthContext';
const App = () => {
  let {user} = useContext(authContext);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home/> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={ <Profile /> } />
        <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;