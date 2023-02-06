import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { decodeToken } from "react-jwt";
import axios from 'axios'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [ loadTime, setLoadTime ] = useState(false)
    const loginUser = async (mail, pass) => {
        //const response = await axios.post(`https://localhost:7060/api/users/login?mail=${mail}&pass=${pass}`)
        setTimeout(async () => {
            setLoadTime(true)

            try {

                const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/users/login?mail=${mail}&pass=${pass}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
                        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                        'Content-Type': 'application/json',
                    }
                });

                if (response.data.code === 400) {
                    setError(response.data.response)
                    setLoadTime(false)
                } else {
                    localStorage.setItem("tokenid", response.data.response)
                    const idRol = decodeToken(response.data.response)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
             
                    if(idRol==1){
                        navigate('/modulos')
                    }else if (idRol==2){
                        navigate('/medico')
                    }else{
                        setError('Correo o contraseña incorrectos')
                    }
                    setLoadTime(false)
                    

                    setError('')
                }
                setLoadTime(false)

            } catch (e) {

                console.log(e.response.data.response);
                setError('Correo o contraseña incorrectos')
                setLoadTime(false)
            }
        }, 0);
    }
    return (
        <LoginContext.Provider
            value={{
                loginUser,
                error,
                loadTime
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}

export {
    LoginProvider
}

export default LoginContext