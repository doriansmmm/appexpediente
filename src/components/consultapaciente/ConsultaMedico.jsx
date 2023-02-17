//importar librerias
import { useEffect, useState, Fragment } from 'react'
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


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import { useNavigate } from 'react-router-dom';

//importar componentes
import Navbar from '../Navbar';
import Firmar from './Firmar'
import DatosPaciente from './DatosPaciente';
import DatosConsulta from './DatosConsulta';
import DatosMedicamentos from './DatosMedicamentos';
import DatosMedico from './DatosMedico';


//importar funciones
import useAuth from '../../hooks/useAuth';
import useConsultaPaciente from '../../hooks/useConsultaPaciente';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
        redcolor: createColor('#ba000d')
    }
});

const steps = ['Datos del médico', 'Datos del paciente', 'Consulta', 'Medicamentos'];
const ConsultaMedico = () => {

    const navigate = useNavigate()

    const { validarToken } = useAuth()

    const { getDetallesCita, datos, setError, setBandUltDiagn } = useConsultaPaciente()

    useEffect(() => {
        validarToken()
        const idcitacreada = localStorage.getItem('idCitaMabe')     
        getDetallesCita(idcitacreada)
        // eslint-disable-next-line
    }, [])

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        activeStep === steps.length - 1 ? setActiveStep(0): setActiveStep((prevActiveStep) => prevActiveStep + 1);
        
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const Componentes = () => {
        
        switch (activeStep + 1) {
            case 1:
                return <DatosMedico/>
            case 2:
                return <DatosPaciente />
                break;
            case 3:
                return <DatosConsulta />
                break;
            case 4:
                return <DatosMedicamentos />
                break
        }

    }


    return (
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
                        Consulta
                    </Typography>
                </Box>
               
                <Box>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <Firmar />
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Atrás
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                <Button onClick={handleReset}>Inicio</Button>
                            </Box>

                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>

                                {Componentes()}


                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Atrás
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Inicio' : 'Siguiente'}
                                </Button>
                            </Box>
                        </Fragment>
                    )}
                </Box>

            </Container>

        </ThemeProvider>
    )
}

export default ConsultaMedico