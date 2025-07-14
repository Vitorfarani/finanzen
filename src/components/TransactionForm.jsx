import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';

export default function TransactionForm({ onAdd }) {
  const [description, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('entrada');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      setError('Preencha todos os campos.');
      return;
    }
    onAdd({ id: uuid(), description, amount: parseFloat(amount), date, type });
    setDesc('');
    setAmount('');
    setDate('');
    setError('');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Adicionar Transação
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            select
            label="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            <MenuItem value="entrada">Entrada</MenuItem>
            <MenuItem value="saida">Saída</MenuItem>
          </TextField>
          <TextField
            label="Descrição"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
          />
          <TextField
            label="Valor"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          <TextField
            label="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained">
            Adicionar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
