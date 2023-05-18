// src/App.js

import React from 'react';
import "./styles/reset.css";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Posts/Home";
import Single from "./pages/Posts/Single";
import Write from "./pages/Posts/Write";
import Edit from "./pages/Posts/Edit"; // Don't forget to import the Edit component
import Information from "./pages/Information";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/post/:id/edit" element={<Edit />} />  {/* New route for editing a post */}
            <Route path="/information" element={<Information />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

