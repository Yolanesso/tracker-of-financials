import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useInView } from 'react-intersection-observer';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Modal,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

ChartJS.register(ArcElement, Tooltip, Legend);

const Trecker = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');
  const [message, setMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) {
      setMessage('Пожалуйста, заполните все поля.');
      return;
    }

    const newTransaction = {
      amount,
      description,
      type,
      id: Date.now(),
    };
    setTransactions([...transactions, newTransaction]);
    setMessage(`Добавлено: ${amount} руб. (${type === 'expense' ? 'Расход' : 'Доход'})`);
    setAmount('');
    setDescription('');
    setType('expense');
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const generateChartData = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        incomeTotal += parseFloat(transaction.amount);
      } else {
        expenseTotal += parseFloat(transaction.amount);
      }
    });

    return {
      labels: ['Доходы', 'Расходы'],
      datasets: [
        {
          data: [incomeTotal, expenseTotal],
          backgroundColor: ['#3498db', '#bdc3c7'],
          hoverBackgroundColor: ['#2980b9', '#95a5a6'],
        },
      ],
    };
  };

  const getSummary = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        incomeTotal += parseFloat(transaction.amount);
      } else {
        expenseTotal += parseFloat(transaction.amount);
      }
    });

    return { incomeTotal, expenseTotal, balance: incomeTotal - expenseTotal };
  };

  const { incomeTotal, expenseTotal, balance } = getSummary();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: '#e3f2fd' }}>
            <Typography variant="h5">Статистика</Typography>
            <Typography>
              Доходы: <b>{incomeTotal} руб.</b>
            </Typography>
            <Typography>
              Расходы: <b>{expenseTotal} руб.</b>
            </Typography>
            <Typography>
              Баланс: <b>{balance} руб.</b>
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Трекер финансов
          </Typography>
          {message && <Typography color="primary">{message}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="number"
              label="Сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
            />
            <Select
              fullWidth
              value={type}
              onChange={(e) => setType(e.target.value)}
              displayEmpty
              sx={{ mt: 1, mb: 2 }}
            >
              <MenuItem value="expense">Расход</MenuItem>
              <MenuItem value="income">Доход</MenuItem>
            </Select>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Добавить
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">История транзакций</Typography>
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {transactions.length > 0 ? (
                  <List>
                    {transactions.map((transaction) => (
                      <ListItem key={transaction.id}>
                        <ListItemText
                          primary={`${transaction.amount} руб. - ${transaction.description}`}
                          secondary={
                            <Typography
                              sx={{ color: transaction.type === 'income' ? 'green' : 'red' }}
                            >
                              {transaction.type === 'expense' ? 'Расход' : 'Доход'}
                            </Typography>
                          }
                        />
                        <IconButton edge="end" onClick={() => handleDelete(transaction.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>История транзакций пуста.</Typography>
                )}
              </Box>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => setIsChartModalOpen(true)}
                sx={{ mt: 2 }}
              >
                Показать диаграмму
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Trecker;
