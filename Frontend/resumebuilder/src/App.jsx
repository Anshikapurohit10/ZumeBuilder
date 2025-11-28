import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Resume from "./components/ResumeBuilder";
import CompleteResume from "./components/CompleteResume";
import Portfolio from "./components/portfolio";
import Feedback from "./components/feedback";
import PortfolioPreview from "./components/PortfolioPreview";
import ChangeTemplatePage from "./components/ChangeTemplatePage";
import AccountSettings from "./components/AccountSettings";
import UpgradePlan from "./components/UpgradePlan";
import ATSAnalyzer from "./components/ATSAnalyzer";
function App() {
  // ✅ Hold form data in parent App
  const [portfolioData, setPortfolioData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ResumeBuilder" element={<Resume />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/complete-resume" element={<CompleteResume />} />
        <Route path="/change-template" element={<ChangeTemplatePage />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/upgrade" element={<UpgradePlan />} />
           <Route path="/ATS" element={<ATSAnalyzer />} />
        {/* ✅ Pass setPortfolioData to form */}
        <Route
          path="/portfolio"
          element={<Portfolio onSubmit={setPortfolioData} />}
        />

        {/* ✅ Pass data to preview page */}
        <Route
          path="/PortfolioPreview"
          element={<PortfolioPreview data={portfolioData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
