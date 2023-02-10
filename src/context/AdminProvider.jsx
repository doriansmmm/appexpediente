import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

const AdminContext = createContext()

const AdminProvider = ({ children }) => {
    const navigate = useNavigate()

    const { validarToken } = useAuth()

    const [error, setError] = useState({
        band: false,
        texto: ''
    })

    const [ datosFiltros, setDatosFiltros ] = useState({
        userNombre: '',
        userPApellido: '',
        userSApellido: '',
        userEmail: '',
        userRolDesc: ''
    })

    const [loadTime, setLoadTime] = useState(false)
    const [ usuarios, setUsuarios] = useState([])
    const [ usuariosFiltro, setUsuariosFiltro] = useState([])
    const [roles, setRoles] = useState([])

    const handleChange = e => {
        setDatosFiltros({
            ...datosFiltros,
            [e.target.name]: e.target.value
        })
    }

    const getUsuarios = async () => {
        try{
            validarToken()
            setLoadTime(true)
            let tokens = localStorage.getItem('tokenid');   
            const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/admin/getUsers?token=${tokens}`)
                  
            const response2 = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/rol/getroles?token=${tokens}`)
            setRoles(response2.data.response)

            /*const array = response.data.response.map(e => ( {
                ...e,
                userRolDesc: response2.data.response.find(i => i.rolId == e.userRolId).rolDesc
            }))*/
            console.log(response.data.response);
            setUsuarios(response.data.response);
            setUsuariosFiltro(response.data.response);      
            setLoadTime(false)
        }catch(e){
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
        <AdminContext.Provider
            value={{
                setError,
                error,
                loadTime,
                getUsuarios,
                usuarios,
                usuariosFiltro,
                datosFiltros,
                handleChange,
                roles
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export {
    AdminProvider
}

export default AdminContext