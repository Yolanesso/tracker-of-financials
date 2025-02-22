import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Box,
} from '@mui/material';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export default function CurrencyConverter() {
  const [currencies] = useState(['RUB', 'USD', 'EUR', 'GBP']);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(`${API_URL}${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.error('Ошибка получения данных:', err));
  }, [fromCurrency]);

  useEffect(() => {
    if (!rates[toCurrency]) return;
    setAmountTo((amountFrom * rates[toCurrency]).toFixed(4));
  }, [amountFrom, toCurrency, rates]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}
          >
            Конвертер валют
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Select
                fullWidth
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencies.map((curr) => (
                  <MenuItem key={curr} value={curr}>
                    {curr}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                value={amountFrom}
                onChange={(e) => setAmountFrom(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Select fullWidth value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {currencies.map((curr) => (
                  <MenuItem key={curr} value={curr}>
                    {curr}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" variant="outlined" value={amountTo} disabled />
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              Результат
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {amountFrom} {fromCurrency} ={' '}
              <b>
                {amountTo} {toCurrency}
              </b>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
