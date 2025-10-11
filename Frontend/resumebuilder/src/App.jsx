import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"
import Login from "./components/login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard";
import Resume from "./components/ResumeBuilder";
import CompleteResume from "./components/CompleteResume";
import Blogs from "./components/Blogs";
function App() {


  return (
        <Router>
     
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ResumeBuilder" element={<Resume />} />
          <Route path="/blogs" element={<Blogs />} />
         <Route path="/complete-resume" element={<CompleteResume />} />

      </Routes>
    </Router>

    // <>
    //   <HomePage />

    // </>
  )
}

export default App
