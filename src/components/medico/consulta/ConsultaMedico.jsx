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

//importar funciones
import useAuth from '../../../hooks/useAuth';
import useConsulta from '../../../hooks/useConsulta';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
        redcolor: createColor('#ba000d')
    }
});

const steps = ['Datos del paciente', 'Consulta', 'Medicamentos'];
const ConsultaMedico = () => {

    const navigate = useNavigate()

    const { validarToken } = useAuth()

    const { getDetallesCita, datos, crearCita, setError } = useConsulta()

    useEffect(() => {
        validarToken()
        const idcitacreada = localStorage.getItem('idcita')
        console.log(idcitacreada);
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
        const {
            pacienteEdad,
            pacienteTa,
            pacienteFrecCar,
            pacienteFrecResp,
            pacienteSato,
            pacienteTemp,
            pacientePeso,
            pacienteTalla,
            alergias,
            pacienteExploracion,
            pacientePlan,
            diagnosticos,
            sintomas,
            medicamentos
        } = datos
        
        if (activeStep === 0) {
            
            if (pacienteEdad == "" || pacienteEdad == 0) {
                setError({ band: true, texto: "Debes ingresar la edad" })
                return
            }else  if (pacienteTa == "") {
                setError({ band: true, texto: "Debes ingresar la T/A" })
                return
            }else  if (pacienteFrecCar == "") {
                setError({ band: true, texto: "Debes ingresar la frecuencia cardíaca" })
                return
            }else  if (pacienteFrecResp == "") {
                setError({ band: true, texto: "Debes ingresar la frecuencia respiratoria" })
                return
            }else  if (pacienteSato == "") {
                setError({ band: true, texto: "Debes ingresar el campo SATO 2%" })
                return
            }else  if (pacienteTemp == "") {
                setError({ band: true, texto: "Debes ingresar la temperatura" })
                return
            }else  if (pacientePeso == "") {
                setError({ band: true, texto: "Debes ingresar el peso" })
                return
            }else  if (pacienteTalla == "") {
                setError({ band: true, texto: "Debes ingresar la Talla" })
                return
            }else  if (alergias.length <=0 || alergias.length == undefined) {
                setError({ band: true, texto: "Debes ingresar al menos una alergia" })
                return
            }
        }else if (activeStep === 1) {
            if (pacienteExploracion=="") {
                setError({ band: true, texto: "Debes ingresar la exploración física" })
                return
            }else  if (pacientePlan=="") {
                setError({ band: true, texto: "Debes ingresar el plan" })
                return
            }else  if (diagnosticos.length <=0 || diagnosticos.length == undefined) {
                setError({ band: true, texto: "Debes ingresar al menos un diagnostico" })
                return
            }else  if (sintomas.length <=0 || sintomas.length == undefined) {
                setError({ band: true, texto: "Debes ingresar al menos un síntoma" })
                return
            }
        }else if (activeStep === 2) {
            if (medicamentos.length <=0 || medicamentos.length == undefined) {
                setError({ band: true, texto: "Debes ingresar al menos un medicamento" })
                return
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        const imagenn= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC"
        const {
            medicoFirma
        } = datos
        console.log(medicoFirma);
        if(medicoFirma == imagenn || medicoFirma == ""){
            setError({ band: true, texto: "Debes ingresar la firma" })
            return
        }
        crearCita()

        //setActiveStep(0);
    };

    const Componentes = () => {
        switch (activeStep + 1) {
            case 1:
                return <DatosPaciente />
                break;
            case 2:
                return <DatosConsulta />
                break;
            case 3:
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

                                <Button onClick={handleReset}>Registrar</Button>
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
                                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
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