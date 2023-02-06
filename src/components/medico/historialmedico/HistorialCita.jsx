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
import useHistorialMedico from '../../../hooks/useHistorialMedico';
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

    const { citasUsuario, consultarCitas, datos, setError } = useHistorialMedico()
    //const { fechaInicio } = datos
    const [fechas, setFechas] = useState({
        fechaInicioFiltro: dateformat(new Date(), "yyyy-mm-dd"),
        fechaFinFiltro: dateformat(new Date(), "yyyy-mm-dd")
    })

    const { fechaInicioFiltro, fechaFinFiltro } = fechas





    useEffect(() => {
        validarToken()
        // eslint-disable-next-line
    }, [])
    function validarFechas() {
        if (new Date(fechaFinFiltro) < new Date(fechaInicioFiltro)) {

            setError({ band: true, texto: 'La fecha fin debe ser igual o superior a la fecha inicio' })
            setFechas({
                ...fechas,
                fechaFinFiltro: fechaInicioFiltro
            })
            return true

        } else {
            consultarCitas(fechaInicioFiltro, fechaFinFiltro)
            setError({ band: false, texto: '' })
            return false
        }
    }
    useEffect(() => {
        validarFechas()
    }, [fechaInicioFiltro, fechaFinFiltro])


    const handleChange = (event) => {
        setFechas({
            ...fechas,
            [event.target.name]: event.target.value
        });
    };

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
                        Historial citas del médico
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 5,
                }}>
                    <Grid container spacing={2}>
                        <Grid item lg={3} sm={6} xs={12}>

                            <TextField
                                id="fecha"
                                name="fechaInicioFiltro"
                                label="Fecha inicio"
                                type="date"
                                value={fechaInicioFiltro}
                                fullWidth
                                style={{ height: '50px' }}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }
                                } />

                        </Grid>
                        <Grid item lg={3} sm={6} xs={12}>

                            <TextField
                                id="fecha"
                                name="fechaFinFiltro"
                                label="Fecha fin"
                                type="date"
                                value={fechaFinFiltro}
                                fullWidth
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }
                                } />

                        </Grid>
                        <Grid item lg={2} sm={6} xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: "#008aa7" }}
                                onClick={() => navigate('/citasdisponibles')}
                            >
                                Citas disponibles
                            </Button>
                        </Grid>
                        
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