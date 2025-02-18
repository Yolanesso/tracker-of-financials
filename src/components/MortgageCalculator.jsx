import React, { useState } from 'react';
import '../scss/mortgagecalculator.scss';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [overpayment, setOverpayment] = useState(0);

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const months = parseInt(loanTerm) * 12; 
    const monthlyRate = annualRate / 12;

    if (monthlyRate > 0) {
      const annuityFactor =
        (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const monthly = principal * annuityFactor;
      setMonthlyPayment(monthly.toFixed(2));
      setTotalPayment((monthly * months).toFixed(2));
      setOverpayment((monthly * months - principal).toFixed(2));
    } else {
      // Если процентная ставка = 0%
      const monthly = principal / months;
      setMonthlyPayment(monthly.toFixed(2));
      setTotalPayment(principal.toFixed(2));
      setOverpayment('0.00');
    }
  };

  return (
    <div className="mortgage__container">
      <h2>Ипотечный калькулятор</h2>
      <div className="mortgage__inputs">
        <label>Сумма кредита (₽):</label>
        <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />

        <label>Срок (лет):</label>
        <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />

        <label>Процентная ставка (%):</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />

        <button onClick={calculateMortgage}>Рассчитать</button>
      </div>

      <div className="mortgage__results">
        <h3>Результаты</h3>
        <p>
          📌 Ежемесячный платеж: <b>{monthlyPayment} ₽</b>
        </p>
        <p>
          💰 Общая сумма выплат: <b>{totalPayment} ₽</b>
        </p>
        <p>
          📉 Переплата по кредиту: <b>{overpayment} ₽</b>
        </p>
      </div>
    </div>
  );
}
