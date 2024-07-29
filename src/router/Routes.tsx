// src/Routes.tsx
import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Posts from "../pages/Posts";
import Post from "../pages/Post";
import PageNotFound from "../pages/PageNotFound";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default AppRoutes;
