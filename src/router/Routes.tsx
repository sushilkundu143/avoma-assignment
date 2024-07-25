// src/Routes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../pages/Posts";
import Post from "../pages/Post";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRoutes;
