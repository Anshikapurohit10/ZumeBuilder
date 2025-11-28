import React, { useState } from "react";
import "./UpgradePlan.css";


const UpgradePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");


  const plans = [
    { id: "daily", price: 49, duration: "for 24 hours" },
    { id: "monthly", price: 149, duration: "for 1 month", popular: true },
    { id: "weekly", price: 249, duration: "for 7 days" },
  ];

  const handleContinue = () => {
    alert(`You selected ₹${plans.find(p => p.id === selectedPlan).price} plan`);
  
  };

  return (
    <div className="upgrade-page">
      <h2>🚀 Upgrade Your Plan</h2>
      <p className="subtext">
       
        Don’t miss out — purchase a plan to unlock full features.
      </p>

      <div className="plans-container">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? "active" : ""}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && <span className="tag">Most Popular</span>}
            <h3>₹{plan.price}</h3>
            <p>{plan.duration}</p>
          </div>
        ))}
      </div>

      <div className="features">
        <h4>Purchase & Unlock:</h4>
        <ul>
          <li>📄 Unlimited PDF Resume Downloads</li>
          <li>🎨 10+ Professional Resume Templates</li>
          <li>🔗 Shareable Resume Web Links</li>
          <li>💡 Expert Tips to Improve Job Applications</li>
          <li>📝 Update & Edit Your Resume Anytime</li>
          <li>💬 24/7 Customer Support</li>
        </ul>
      </div>

      <button className="continue-btn" onClick={handleContinue}>
        Continue
      </button>

      <p className="footer-text">
        Secure & Multiple Payment Options <br />
        For any queries, contact us at{" "}
        {/* <a href="mailto:hello@gobudge.io">hello@gobudge.io</a> */}
      </p>
    </div>
  );
};

export default UpgradePlan;
