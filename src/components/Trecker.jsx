import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useInView } from 'react-intersection-observer';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../scss/trecker.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Trecker = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');
  const [message, setMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isChartVisible, setIsChartVisible] = useState(false);

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

    setMessage(`Вы добавили ${amount} за: ${description} как ${type === 'expense' ? 'расход' : 'доход'}.`);
    setAmount('');
    setDescription('');
    setType('expense');
  };

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const generateChartData = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(transaction => {
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
          backgroundColor: ['#00df82', '#ff4444'],
          hoverBackgroundColor: ['#27ae60', '#e74c3c'],
        }
      ]
    };
  };

  const getStatistics = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;
    let expenseCount = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeTotal += parseFloat(transaction.amount);
      } else {
        expenseTotal += parseFloat(transaction.amount);
        expenseCount++;
      }
    });

    const averageExpense = expenseCount > 0 ? (expenseTotal / expenseCount).toFixed(2) : 0;

    return {
      incomeTotal,
      expenseTotal,
      expenseCount,
      averageExpense
    };
  };

  const { incomeTotal, expenseTotal, expenseCount, averageExpense } = getStatistics();

  return (
    <div className="parent">
      <div className="div1">
        <div className="transaction-input-section">
          <h3>Трекер финансов</h3>
          {message && <p className="message">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="number"
                className="input-field"
                placeholder="Сумма"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="input-field"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <select
                className="input-field"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="expense">Расход</option>
                <option value="income">Доход</option>
              </select>
            </div>

            <button type="submit" className="btnADD">Добавить</button>
          </form>
        </div>
      </div>

      <div className="div2">
        <button 
          className="btn toggle-btn" 
          onClick={() => setIsChartVisible(!isChartVisible)}
        >
          {isChartVisible ? 'История транзакций' : 'Диаграмма'}
        </button>
        
        {/* Контейнер для диаграммы и статистики */}
        {isChartVisible ? (
          <div className="transaction-chart-container">
            {/* Блок с диаграммой */}
            <div className="transaction-chart" ref={ref}>
              {inView && <Pie data={generateChartData()} />}
            </div>

            {/* Блок со статистикой (справа от диаграммы) */}
            <div className="chart-statistics">
              <h4>Общая информация о транзакциях</h4>
              <p><strong>Общий доход:</strong> {incomeTotal} руб.</p>
              <p><strong>Общий расход:</strong> {expenseTotal} руб.</p>
              <p><strong>Средний расход:</strong> {averageExpense} руб.</p>
              <p><strong>Количество расходов:</strong> {expenseCount}</p>
            </div>
          </div>
        ) : (
          <div className="transaction-history">
            {transactions.length > 0 ? (
              <ul className="transaction-list">
                {transactions.map((transaction) => (
                  <li key={transaction.id} className={transaction.type}>
                    <span className="amount">{transaction.amount} руб.</span>
                    <span className="description">{transaction.description}</span>
                    <span className="type">
                      {transaction.type === 'expense' ? 'Расход' : 'Доход'}
                    </span>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>История транзакций пуста.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trecker;
