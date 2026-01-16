import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hero from "./pages/Hero"
import Home from "./pages/Home"
import NoPage from "./pages/NoPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} /> {/* Landing hero */}
        <Route path="/home" element={<Home />} /> {/* Main home page */}
        <Route path="*" element={<NoPage />} /> {/* 404 page */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
