//importar librerias
import { useEffect } from 'react';
import {
    Container,
    Box,
    Grid,
    CssBaseline,
    Typography,
    Button,
    TextField
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//importar componentes
import Alerta from './Alerta';
import Load from './Load';
import Filtros from './Filtros';
import Navbar from '../Navbar'

import { PacientesProvider } from '../../context/PacientesProvider'

//importar funciones
import useAuth from '../../hooks/useAuth';

import TablaUsuarios from './TablaUsuarios'

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
        redcolor: createColor('#ba000d')
    }
});

export default function Pacientes() {

    const { validarToken, setVentana } = useAuth()
    useEffect(() => {
        validarToken()
        setVentana('/medico')
        // eslint-disable-next-line
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <div>

            <PacientesProvider>
                <Load />
                <Alerta />
                <Navbar />
                <ThemeProvider theme={theme}>

                    <Container component="main">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h4">
                                Pacientes
                            </Typography>
                        </Box>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid style={{ marginBottom: '10px' }} container spacing={2}>
                                <Filtros />
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item lg={12} sm={12} xs={12}>
                                    <TablaUsuarios />
                                </Grid>
                            </Grid>
                        </Box>
                        
                    </Container>
                </ThemeProvider>
            </PacientesProvider>
        </div>
    )
}