import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert
} from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import useLogin from '../../hooks/useLogin';

const theme = createTheme();

export default function Login() {

  const { loginUser, error } = useLogin()


  const [user, setUser] = React.useState({
    correo: '',
    contrasena: ''
  })

  const { correo, contrasena } = user;

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

  };

  const handleClickOpen = () => {
    loginUser(correo, contrasena)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClickOpen()
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {error !== '' ? <Alert severity="error">{error}</Alert> : null}
          <Typography component="h1" variant="h5">
            Inicio de sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo"
              name="correo"
              autoComplete="correo"
              autoFocus
              value={correo}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contrasena"
              label="Contraseña"
              type="password"
              id="contrasena"
              value={contrasena}
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#008aa7" }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/registro" variant="body2">
                  {"Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}