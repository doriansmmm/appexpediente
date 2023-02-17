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
import { HistorialCitasPacienteProvider } from '../../../context/HistorialCitasPacienteProvider'

//importar componentes
import Alerta from './Alerta';
import HistorialCita from './HistorialCita';
import Load from './Load';

//importar funciones
import useAuth from '../../../hooks/useAuth';

export default function HistorialCitasPaciente() {

    const { validarToken, setVentana } = useAuth()
    useEffect(() => {
        validarToken()
        setVentana('/pacientes')
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <HistorialCitasPacienteProvider>
                <Load/>
                <Alerta/>
                <HistorialCita />
            </HistorialCitasPacienteProvider>
        </div>
    )
}