import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../services/firebaseConfig.js';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  TextField, Button, Typography, Link, Box
} from '@mui/material';
import AuthLayout from '../components/AuthLayout.jsx';

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
  confirm: yup.string()
    .oneOf([yup.ref('password')], 'Senhas não conferem')
    .required('Confirmação é obrigatória'),
}).required();

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);
      navigate('/login', { state: { message: 'Verifique seu e-mail para ativar a conta.' } });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthLayout title="Cadastro">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:'flex', flexDirection:'column', gap:2 }}>
        <TextField
          label="E-mail"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Senha"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        <TextField
          label="Confirme a senha"
          type="password"
          {...register('confirm')}
          error={!!errors.confirm}
          helperText={errors.confirm?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
          Criar Conta
        </Button>
      </Box>
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Já tem conta?{' '}
          <Link component={RouterLink} to="/login">
            Faça login
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
