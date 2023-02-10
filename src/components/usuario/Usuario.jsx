import { UserProvider } from '../../context/UserProvider'

import Navbar from '../Navbar';
import FormularioUsuario from './FormularioUsuario';
import Load from './Load';
import PopupArchivos from './PopupArchivos';

export default function Usuario() {
    return (
        <div>
            <UserProvider>
                <Navbar />
                <Load/>
                <PopupArchivos/>
                <FormularioUsuario />
            </UserProvider>
        </div>
    )
}