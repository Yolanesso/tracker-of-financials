import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
} from '@mui/material';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [overpayment, setOverpayment] = useState(0);

  const handleInputChange = (setter) => (e) => {
    const value = parseFloat(e.target.value);
    setter(isNaN(value) || value < 0 ? 0 : value);
  };

  const calculateMortgage = () => {
    if (loanAmount <= 0 || loanTerm <= 0 || interestRate < 0) {
      alert('Введите корректные значения (больше 0)');
      return;
    }

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
      const monthly = principal / months;
      setMonthlyPayment(monthly.toFixed(2));
      setTotalPayment(principal.toFixed(2));
      setOverpayment('0.00');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}
          >
            Ипотечный калькулятор
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Сумма кредита (₽)"
                type="number"
                fullWidth
                variant="outlined"
                value={loanAmount}
                onChange={handleInputChange(setLoanAmount)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Срок (лет)"
                type="number"
                fullWidth
                variant="outlined"
                value={loanTerm}
                onChange={handleInputChange(setLoanTerm)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Процентная ставка (%)"
                type="number"
                fullWidth
                variant="outlined"
                value={interestRate}
                onChange={handleInputChange(setInterestRate)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={calculateMortgage}
                sx={{ fontSize: '1rem', fontWeight: 'bold', mt: 2 }}
              >
                Рассчитать
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              Результаты
            </Typography>
            <Typography sx={{ mt: 2 }}>
              📌 Ежемесячный платеж: <b>{monthlyPayment} ₽</b>
            </Typography>
            <Typography>
              💰 Общая сумма выплат: <b>{totalPayment} ₽</b>
            </Typography>
            <Typography>
              📉 Переплата по кредиту: <b>{overpayment} ₽</b>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
