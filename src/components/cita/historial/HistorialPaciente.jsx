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
import { HistorialProvider } from '../../../context/HistorialProvider'

//importar componentes
import Alerta from './Alerta';
import HistorialCita from './HistorialCita';
import Load from './Load';

//importar funciones
import useAuth from '../../../hooks/useAuth';

export default function Cita() {

    const { validarToken, setVentana } = useAuth()
    useEffect(() => {
        validarToken()
        setVentana('/modulos')
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <HistorialProvider>
                <Load/>
                <Alerta/>
                <HistorialCita />
            </HistorialProvider>
        </div>
    )
}