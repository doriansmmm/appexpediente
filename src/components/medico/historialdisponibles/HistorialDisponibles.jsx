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
import { HistorialCitasDisponiblesProvider } from '../../../context/HistorialCitasDisponiblesProvider'

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
        setVentana('/medico')
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <HistorialCitasDisponiblesProvider>
                <Load/>
                <Alerta/>
                <HistorialCita />
            </HistorialCitasDisponiblesProvider>
        </div>
    )
}