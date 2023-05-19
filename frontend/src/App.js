// src/App.js

import React from 'react';
import "./styles/reset.css";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Posts/Index";
import Show from "./pages/Posts/Show";
import New from "./pages/Posts/New";
import Edit from "./pages/Posts/Edit";
import TagNew from "./pages/Tags/New";
import Information from "./pages/Information";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import TagPosts from './pages/Posts/TagPosts';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/new" element={<New />} />
            <Route path="/post/:id" element={<Show />} />
            <Route path="/post/:id/edit" element={<Edit />} />
            <Route path="/tag/new" element={<TagNew />} />
            <Route path="/tag/:tagId" element={<TagPosts />} />

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

