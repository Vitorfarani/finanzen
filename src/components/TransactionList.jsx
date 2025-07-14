import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency, formatDate } from '../utils/formatters.js';

export default function TransactionList({ transactions, onRemove }) {
  if (!transactions.length) {
    return <Typography>Nenhuma transação.</Typography>;
  }
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{formatDate(tx.date)}</TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell align="right">{formatCurrency(tx.amount)}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onRemove(tx.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
