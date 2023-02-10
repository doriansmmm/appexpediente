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
import { ConsultaProvider } from '../../../context/ConsultaProvider'

//importar componentes
import Alerta from './Alerta';
import ConsultaMedico from './ConsultaMedico';
import Load from './Load';
import AgregarSintoma from './AgregarSintoma';
import Navbar from './Navbar';
import UltimosDiagnosticos from './UltimosDiagnosticos'

//importar funciones
import useAuth from '../../../hooks/useAuth';

export default function Consulta() {

    const { validarToken, setVentana } = useAuth()
    useEffect(() => {
        validarToken()
        setVentana('/medico')
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <ConsultaProvider>
                <UltimosDiagnosticos />
                <Navbar />
                <AgregarSintoma />
                <Load />
                <Alerta />
                <ConsultaMedico />
            </ConsultaProvider>
        </div>
    )
}