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
import { HistorialMedicoProvider } from '../../../context/HistorialMedicoProvider'

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
        setVentana('NA')
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <HistorialMedicoProvider>
                <Load/>
                <Alerta/>
                <HistorialCita />
            </HistorialMedicoProvider>
        </div>
    )
}