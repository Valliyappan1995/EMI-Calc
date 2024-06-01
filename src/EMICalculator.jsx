import React, { useState } from "react";
import "./EMICalculator.css";

const EMICalculator = () => {
  const [totalCost, setTotalCost] = useState(100000);
  const [interestRate, setInterestRate] = useState(100);
  const [processingFee, setProcessingFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);

  const calculateEMI = (principal, rate, tenureMonths) => {
    const monthlyRate = rate / (12 * 100);
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    );
  };

  const downPaymentAmount = (totalCost * downPayment) / 100;
  const loanAmount = totalCost - downPaymentAmount;
  const processingFeeAmount = (loanAmount * processingFee) / 100;
  const totalDownPayment = downPaymentAmount + processingFeeAmount;
  const emi = calculateEMI(loanAmount, interestRate, tenure);

  return (
    <div className="emi-calculator">
      <h2>EMI Calculator</h2>
      <div className="input-group">
        <label>Total Cost of Asset</label>
        <input
          type="number"
          value={totalCost}
          onChange={(e) => setTotalCost(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Interest Rate (in %)</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Processing Fee (in %)</label>
        <input
          type="number"
          value={processingFee}
          onChange={(e) => setProcessingFee(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Down Payment</label>
        <input
          type="range"
          min="0"
          max="100"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
        />
        <div className="range-values">
          <span>0%</span>
          <span>{downPayment}%</span>
          <span>100%</span>
        </div>
        <div>Total Down Payment - ₹ {totalDownPayment.toFixed(2)}</div>
      </div>
      <div className="input-group">
        <label>Loan per Month</label>
        <input
          type="range"
          min="0"
          max="totalCost"
          value={emi.toFixed(2)}
          readOnly
        />
        <div className="range-values">
          <span>₹ 0</span>
          <span>₹ {emi.toFixed(2)}</span>
          <span>₹ {(totalCost / tenure).toFixed(2)}</span>
        </div>
        <div>
          Total Loan Amount - ₹ {(loanAmount + processingFeeAmount).toFixed(2)}
        </div>
      </div>
      <div className="tenure-buttons">
        {[12, 24, 36, 48, 60].map((t) => (
          <button
            key={t}
            className={tenure === t ? "active" : ""}
            onClick={() => setTenure(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EMICalculator;
