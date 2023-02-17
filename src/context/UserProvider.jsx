import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const navigate = useNavigate()

    const { validarToken } = useAuth()

    const [error, setError] = useState({
        band: false,
        texto: ''
    })
    const [bandArchivos, setBandArchivos] = useState(false)
    const [archivos, setArchivos] = useState(null)
    const [datosUsuario, setDatosUsuario] = useState({
        userGuid: '',
        userNombre: '',
        userSApellido: '',
        userEmail: '',
        userPhone: 0,
        userAge: 0,
        userStreet: '',
        userNext: "",
        userNint: '',
        userGenderId: 0,
        userRolId: 0,
        medCedula: '',
        medLogo: '',
        medTitulo: '',
        medUniversidad: ''
    })

    const [roles, setRoles] = useState([])

    const [loadTime, setLoadTime] = useState(false)

    const getInicial = async () => {
        try {
            setLoadTime(true)
            validarToken()


            let tokens = localStorage.getItem('tokenid');
            const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/rol/getroles?token=${tokens}`)
            setRoles(response.data.response)

            setLoadTime(false)
        } catch (e) {
            setLoadTime(false)
        }
    }    

    const handleChangeRol = e => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getInicial()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        let json = localStorage.getItem('jsondatosuser')
        const json2 = JSON.parse(json)
        
        setDatosUsuario({
            userGuid: json2 != null ? json2.userGuid : '',
            userNombre: json2 != null ? json2.userNombre : '',
            userPApellido: json2 != null ? json2.userPApellido : '',
            userSApellido: json2 != null ? json2.userSApellido : '',
            userEmail: json2 != null ? json2.userEmail : '',
            userPhone: json2 != null ? json2.userPhone : 0,
            userAge: json2 != null ? json2.userAge : 0,
            userStreet: json2 != null ? json2.userStreet : '',
            userNext: json2 != null ? json2.userNext : '',
            userNint: json2 != null ? json2.userNint : '',
            userGenderId: json2 != null ? json2.userGenderId : 0,
            userRolId: json2 != null ? json2.userRolId : 0,
            medCedula: json2 != null ? json2.medCedula : '',
            medLogo: json2 != null ? json2.medLogo : '',
            medTitulo: json2 != null ? json2.medTitulo : '',
            medUniversidad: json2 != null ? json2.medUniversidad : '',
        })

    }, [roles])

    const updateRol = async () => {
        setLoadTime(true)
        try {
            setLoadTime(true)
            validarToken()


            let tokens = localStorage.getItem('tokenid');
            const getGuid = roles.find(e=> e.rolId === datosUsuario.userRolId)
            // eslint-disable-next-line
            const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/admin/updateUserRol?token=${tokens}&userG=${datosUsuario.userGuid}&rolG=${getGuid.rolGuid}`)
            
            if(getGuid.rolId===2){          
                const json = {
                    "medUniversidad": datosUsuario.medUniversidad !== null ? datosUsuario.medUniversidad: 's',
                    "medCedula": datosUsuario.medCedula !== null ? datosUsuario.medCedula: 's',
                    "medLogo": datosUsuario.medLogo!==null ?datosUsuario.medLogo: 's',
                    "medTitulo": datosUsuario.medTitulo !== null ? datosUsuario.medTitulo:'s'
                  }
                // eslint-disable-next-line
                const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/admin/updateDR?token=${tokens}&medG=${datosUsuario.userGuid}`, json)
            }

            
            navigate('/admin')
            //setLoadTime(false)
        } catch (e) {
            setLoadTime(false)
        }
    }
    const subirArchivos = e => {
        setArchivos(e)
        
        var reader = new FileReader()
        if(e !== null){
            reader.readAsDataURL(e[0])
            reader.onload = () => {
                var base64 = reader.result
                setDatosUsuario({
                    ...datosUsuario,
                    medLogo: base64
                })
            }
        }else{
            setDatosUsuario({
                ...datosUsuario,
                medLogo: ''
            })
        }
    }
    return (
        <UserContext.Provider
            value={{
                setError,
                error,
                loadTime,
                datosUsuario,
                roles,
                handleChangeRol,
                updateRol,
                setLoadTime,
                setBandArchivos,
                bandArchivos,
                subirArchivos,
                archivos
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export {
    UserProvider
}

export default UserContext