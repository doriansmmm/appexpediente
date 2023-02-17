//importar librerias
import { useEffect } from 'react';
import {
    Container,
    Box,
    Grid,
    CssBaseline,
    Typography,
    Button
} from '@mui/material';
import { ConsultaPacienteProvider } from '../../context/ConsultaPacienteProvider'

//importar componentes
import Alerta from './Alerta';
import ConsultaMedico from './ConsultaMedico';
import Load from './Load';
 import Navbar from '../Navbar';
//import UltimosDiagnosticos from './UltimosDiagnosticos'

//importar funciones
import useAuth from '../../hooks/useAuth';

export default function ConsultaPaciente() {

    const { validarToken, setVentana } = useAuth()
    useEffect(() => {
        validarToken()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <ConsultaPacienteProvider>
                <Load />
                <Alerta />
                <Navbar />
                <ConsultaMedico />   
            </ConsultaPacienteProvider>
        </div>
    )
}