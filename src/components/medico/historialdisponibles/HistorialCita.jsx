//importar librerias
import { useEffect } from 'react'
import {
    Container,
    Box,
    Grid,
    CssBaseline,
    Typography,
    Button,
    TextField
} from '@mui/material';
import dateformat from 'dateformat'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

//importar componentes
import Navbar from '../Navbar';
import TablaHistorial from './TablaHistorial'

//importar funciones
import useAuth from '../../../hooks/useAuth';
import useHistorialCitasDisponibles from '../../../hooks/useHistorialCitasDisponibles';
import { useState } from 'react';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
        redcolor: createColor('#ba000d')
    }
});

const HistorialCita = () => {

    const navigate = useNavigate()

    const { validarToken } = useAuth()

    const {  } = useHistorialCitasDisponibles()
    

    

    

    useEffect(() => {
        validarToken()
        // eslint-disable-next-line
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h4">
                        Citas disponibles
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 5,
                }}>
                    <Grid container spacing={2}>
                        
                        <Grid item lg={12} sm={12} xs={12}>
                            <TablaHistorial />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>

                        </Grid>

                    </Grid>

                </Box>

            </Container>

        </ThemeProvider>
    )
}

export default HistorialCita