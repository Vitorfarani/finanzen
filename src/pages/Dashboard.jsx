import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';
import Charts from '../components/Charts.jsx';
import { formatCurrency } from '../utils/formatters.js';

export default function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (tx) => setTransactions([tx, ...transactions]);
  const handleRemove = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  const totalEntrada = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'entrada')
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );
  const totalSaida = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'saida')
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );
  const saldo = totalEntrada - totalSaida;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Saldo Total</Typography>
              <Typography variant="h5">{formatCurrency(saldo)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Entradas</Typography>
              <Typography variant="h5">{formatCurrency(totalEntrada)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Saídas</Typography>
              <Typography variant="h5">{formatCurrency(totalSaida)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <TransactionForm onAdd={handleAdd} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransactionList transactions={transactions} onRemove={handleRemove} />
        </Grid>
        <Grid item xs={12}>
          <Charts entrada={totalEntrada} saida={totalSaida} />
        </Grid>
      </Grid>
    </Box>
  );
}
