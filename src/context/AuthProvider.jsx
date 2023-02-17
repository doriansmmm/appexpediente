import { createContext, useState, useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [validToken, setValidToken] = useState(false)
    const [ventana, setVentana] = useState('')
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: ''
    })

    const [datosConsulta, setDatosConsulta] = useState({
        medicoNombre: 'Dorian',
        medicoPApellido: 'Mendoza',
        medicoSApellido: 'Martinez',
        medicoTitulo: 'Dr interno',
        medicoCedula: 'FD-5511',
        medicoFechaCita: '25-01-2023',
    })

    const [guidCita, setGuidCita] = useState()
    const [bandFirma, setBandFirma] = useState(true)


    const validarToken = () => {
        let token = localStorage.getItem('tokenid');
        const nom = token == null ? "" : decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        setDatosUsuario({
            nombre: nom
        })

        setValidToken(isExpired(token))

        if (isExpired(token)) {
            navigate('/login')
        }
    }
    const validarTokenLogin = () => {
        let token = localStorage.getItem('tokenid');
        setValidToken(isExpired(token))

        if (!isExpired(token)) {

            const nom = decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/name']
            setDatosUsuario({
                nombre: nom
            })
            const idRol = decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

            if (idRol == 1) {
                setVentana('/modulos')
                navigate('/modulos')
            } else if (idRol == 2) {
                navigate('/medico')
                setVentana('/medico')
            } else {

            }
        }
    }

    useEffect(() => {
        validarToken()
        // eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider
            value={{
                validarToken,
                validToken,
                validarTokenLogin,
                setVentana,
                ventana,
                datosUsuario,
                setGuidCita,
                guidCita,
                setDatosConsulta,
                datosConsulta,
                setBandFirma,
                bandFirma
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext