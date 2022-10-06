import Head from 'next/head'
import Image from 'next/image'
import { TextField, Box, Button, Alert, Snackbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';

import logo from '../public/assets/images/Logo-DQD-Fundo-Claro.png';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isSendingEmail, setIsSendingEmail] = useState();
  const [message, setMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [isError, setIsError] = useState(false);

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = snackbarState;

  const sendMail = async() => {
    setIsSendingEmail(true);
    try {
      await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
        user_id: 'user_YWHRL5p0UldXqQkZxq8QE',
        service_id: 'service_gxkb4se',
        template_id: 'template_gtqt9vr',
        template_params: {
          name,
          email,
        }
      });

      const response = await axios.post('http://localhost:3000/api/user', {
        name,
        email,
      });

      console.log('response', response);

      setSnackbarState({ open: true, vertical: 'top', horizontal: 'right' });
      setIsError(false);
      setShowAlert(true);
      setMessage('Email enviado com sucesso!');
    } catch (err) {
      console.error(err);
      setSnackbarState({ open: true, vertical: 'top', horizontal: 'right' });
      setIsError(true);
      setShowAlert(true);
      setMessage('Falha ao enviar o email');
    } finally {
      setIsSendingEmail(false);
    }
  }

  const closeAlert = () => {
    setMessage('');
    setShowAlert(false);
  }

  function validateEmail(email) {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (email?.length === undefined) return false;
    if (reg.test(email)) {
      return false; 
    }
    else {
      return true;
    }
  }

  function validateName(validName) {
    if (validName?.length === 0) return false;
    if (validName?.length < 3) {
      return true;
    } else {
      return false;
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarState({ ...snackbarState, open: false });
  };

  const theme = createTheme({
    components: {
      // Name of the component
      MuiGrid: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: '6rem'
          },
        },
      },
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Fale inglês como um nativo - Lorena Brandão</title>
        
      </Head>

      <ThemeProvider theme={theme}>
        {
          showAlert &&
          (
            isError ? 
            <Snackbar 
              anchorOrigin={{ vertical, horizontal }}
              open={open} 
              autoHideDuration={3000} 
              onClose={handleClose}
              key={vertical + horizontal}
            >
              <Alert onClose={() => closeAlert()} variant="filled" severity="error">{ message }</Alert>
            </Snackbar> : 
            <Snackbar 
              anchorOrigin={{ vertical, horizontal }}
              open={open} 
              autoHideDuration={3000} 
              onClose={handleClose}
              key={vertical + horizontal}
            >
              <Alert onClose={() => closeAlert()} variant="filled" severity="success">{ message }</Alert>
            </Snackbar>
          )
        }
          <div className={styles.title}>
            <div className={styles.teste}>
              <Image src={logo} alt="Logo Lorenabandaosoueu" />
              <h1>
                LISTA DE ESPERA PARA CURSO FALE INGLÊS COMO UM NATIVO, COM LORENA BRANDÃO
              </h1> 
            </div>
          </div>
          <div className={styles.formulario}>
            <h2>
              CADASTRE-SE ABAIXO PARA ENTRAR NA LISTA DE ESPERA E RECEBER INFORMAÇÕES SOBRE O CURSO:
            </h2>
            <Box
              component="form"
              method='POST'
              sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                '@media (min-width: 601px)': { width: '70%' },
              }}
              noValidate
              autoComplete="off"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              padding="2rem"
              margin="0 auto"
            >
              <TextField 
                id="name"
                className="inputs"
                label="Como você gostaria de ser chamado?"
                variant="outlined" 
                color='success'
                value={name}
                onChange={e => setName(e.target.value)}
                error={validateName(name)}
                helperText={validateName(name) && 'O nome deve conter no mínimo 3 e no máximo 15 caracteres e somente letras.'}
                required
                fullWidth
              />
              <TextField 
                id="email"
                className="inputs" 
                label="Deixe seu melhor e-mail."
                variant="outlined"
                color='success'
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={validateEmail(email)}
                helperText={validateEmail(email) && 'E-mail inválido!'}
                required 
                fullWidth
              />
              <Button 
                className="inputs"
                variant="contained" 
                color="success"
                onClick={() => sendMail()}
                disabled={(name?.length > 2) && (!validateEmail(email)) ? false : true}
              >
                { isSendingEmail ? 'CADASTRANDO...' : 'QUERO ENTRAR PARA A LISTA DE ESPERA' }
              </Button>
            </Box>
          </div>
      </ThemeProvider>
    </div>
  )
}
