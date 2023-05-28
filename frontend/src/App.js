// frontend\src\App.js

// Import packages
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

// Import pages
import { Home } from "./pages/Posts/Index";
import { Show } from "./pages/Posts/Show";
import { New } from "./pages/Posts/New";
import { Edit } from "./pages/Posts/Edit";
import { TagNew } from "./pages/Tags/New";
import { TagPosts } from './pages/Posts/TagPosts';
import { Information } from "./pages/Information";
import { Registration } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";

// Import styles
import "./styles/reset.css";
import "./styles/App.css";

// App component
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
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
