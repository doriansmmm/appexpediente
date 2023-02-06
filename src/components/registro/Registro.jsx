import { RegistroUsuarioProvider } from '../../context/RegistroUsuarioProvider'

import Navbar from '../Navbar';
import FormularioRegistro from './FormularioRegistro';

export default function Registro() {
    return (
        <div>
            <RegistroUsuarioProvider>
                <Navbar />
                <FormularioRegistro />
            </RegistroUsuarioProvider>
        </div>
    )
}