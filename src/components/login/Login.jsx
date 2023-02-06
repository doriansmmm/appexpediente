import { useEffect } from 'react';

import { LoginProvider } from '../../context/LoginProvider'
import useAuth from '../../hooks/useAuth'
import Navbar from '../Navbar';
import Formulario from './Formulario';
import Load from './Load';

//import {validarToken} from '../../helpers/auth'

export default function Login() {
   const { validarTokenLogin } = useAuth()
    
    useEffect(() => {
        validarTokenLogin()
        // eslint-disable-next-line
      }, [])
      
    return (
        <div>            
            <LoginProvider>
            <Load/>
                <Navbar />
                <Formulario />
            </LoginProvider>
        </div>
    )
}