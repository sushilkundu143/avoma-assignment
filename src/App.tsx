import React from "react";
import "./App.css";
import AppRoutes from "./router/Routes";

function App() {
  return (
    <div className="container" data-testid="app">
      <AppRoutes />
    </div>
  );
}

export default App;
