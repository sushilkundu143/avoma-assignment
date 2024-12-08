import React from "react";
import "./App.css";
import AppRoutes from "./router/Routes";

function App() {
  // deplying the avoma app
  return (
    <div className="container" data-testid="app">
      <AppRoutes />
    </div>
  );
}

export default App;
