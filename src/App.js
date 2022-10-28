import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Dashboard } from "./pages";

const App = () => {
  return (
    <main>
      <Routes>
        <Route exact path="/" element={<Navbar />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
};

export default App;
