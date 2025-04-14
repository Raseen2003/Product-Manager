import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import Auth from './assets/pages/Auth'
import Products from './assets/pages/Products'
import Dashboard from './assets/pages/Dashboard'
import Footer from './assets/components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  

  return (
    <>
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth insideRegister={true} />} />
      <Route path="/products" element={<Products />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      
    </Routes>
    <Footer />


    </>
  )
}

export default App
