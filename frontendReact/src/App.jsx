import { useState } from "react";
import { Routes, Route, Link, Router } from "react-router-dom";
import "./css/index.css";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
