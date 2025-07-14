import React, { useState } from 'react';
import { auth } from '../services/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch {
      setErro('Email ou senha incorretos');
    }
  };

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ width: 360 }}>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Login
          </Typography>
          {erro && (
            <Typography color="error" mb={1}>
              {erro}
            </Typography>
          )}
          <form
            onSubmit={login}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
