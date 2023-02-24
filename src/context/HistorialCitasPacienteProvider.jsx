import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import dateformat from 'dateformat'
import axios from "axios";

const HistorialCitasPacienteContext = createContext()

const HistorialCitasPacienteProvider = ({ children }) => {


  const { validarToken } = useAuth()

  const [loadTime, setLoadTime] = useState(false)
  const [datos, setDatos] = useState({
    fechaInicio: dateformat(new Date(), "yyyy-mm-dd"),
    fechaFin: dateformat(new Date(), "yyyy-mm-dd")
  })
  const { fechaInicio, fechaFin } = datos

  const [error, setError] = useState({
    band: false,
    texto: ''
  })

  const [citasUsuario, setCitasUsuario] = useState([])

  const handleChangeDatos = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const consultarCitas = async (fechainicio, fechafin) => {
    try {
      setLoadTime(true)
      validarToken()
      let token = localStorage.getItem('tokenid');
      const guidPaciente = localStorage.getItem('idguidpaciente')
      const response = await axios.post(`https://apiexpedientemedicoapi.azurewebsites.net/api/citas/citaHistorialbyClientGuid?token=${token}&FI=${fechainicio}&FF=${fechafin}&clientGuid=${guidPaciente}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      if (typeof response.data.response === "string") {
        
        setCitasUsuario([]);
        setError({ band: true, texto: response.data.response })
      }else{
        setCitasUsuario(response.data.response);
        console.log(response.data.response);
      }
      //
      setLoadTime(false)

    } catch (e) {
      setLoadTime(false)
    }
  }
  
  
  

  useEffect(() => {
    consultarCitas(fechaInicio, fechaFin)
  }, [])

  return (
    <HistorialCitasPacienteContext.Provider
      value={{
        citasUsuario,
        handleChangeDatos,
        datos,
        setError,
        error,
        consultarCitas,
        loadTime,
      }}
    >
      {children}
    </HistorialCitasPacienteContext.Provider>
  )
}

export {
  HistorialCitasPacienteProvider
}

export default HistorialCitasPacienteContext