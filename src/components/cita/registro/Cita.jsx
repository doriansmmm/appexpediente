//importar librerias
import { useEffect } from 'react';
import { CitaProvider } from '../../../context/CitaProvider'

//importar componentes
import Navbar from '../../Navbar';
import RegistroCita from './RegistroCita';
import Alerta from './Alerta';
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
            <CitaProvider>
                <Alerta/>
                
                <Navbar />
                <RegistroCita />
                <Load/>
            </CitaProvider>
        </div>
    )
}