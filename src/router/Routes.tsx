// src/Routes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../pages/Posts";
import Post from "../pages/Post";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
};

export default AppRoutes;
