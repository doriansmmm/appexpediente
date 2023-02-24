import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import useAuth from "../hooks/useAuth";

const client = axios.create({
    baseURL: "https://apiexpedientemedicoapi.azurewebsites.net/api/"
});

const PacientesContext = createContext()

const PacientesProvider = ({ children }) => {
    const {validarToken} = useAuth()
    
    const [error, setError] = useState('')
    const [loadTime, setLoadTime] = useState(false)
    const [datosFiltros, setDatosFiltros] = useState({
        userNombre: '',
        userPApellido: '',
        userSApellido: '',
        userEmail: '',
        userRolDesc: ''
    })
    const [usuarios, setUsuarios] = useState([])
    const [usuariosFiltro, setUsuariosFiltro] = useState([])
    const handleChange = e => {
        setDatosFiltros({
            ...datosFiltros,
            [e.target.name]: e.target.value
        })
    }

    const getUsuarios = async () => {
        try {
            setLoadTime(true)
            validarToken()
            let tokens = localStorage.getItem('tokenid');   
            
            const response = await client.post(`/admin/getUsersDR?token=${tokens}`)
    
            setUsuarios(response.data.response)
            setUsuariosFiltro(response.data.response)
            setLoadTime(false)
        } catch (e) {
            setLoadTime(false)
        }
    }
    const filtrar = () => {
        const { userNombre, userPApellido, userSApellido, userEmail, userRolDesc } = datosFiltros

        const filtrarArray = usuarios.filter(e => 
            e.userNombre.toLowerCase().startsWith(userNombre.toLowerCase())
            && e.userPApellido.toLowerCase().startsWith(userPApellido.toLowerCase())
            && e.userSApellido.toLowerCase().startsWith(userSApellido.toLowerCase())
            && e.userEmail.toLowerCase().startsWith(userEmail.toLowerCase())
            && e.rolName.toLowerCase().startsWith(userRolDesc.toLowerCase())
        )
        setUsuariosFiltro(filtrarArray)
    }
    useEffect(() => {
        getUsuarios()
    }, [])
    useEffect(() => {
        filtrar()
    }, [datosFiltros])

    return (
        <PacientesContext.Provider
            value={{
                setError,
                error,
                loadTime,
                datosFiltros,
                handleChange,
                usuariosFiltro
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}

export default PacientesContext