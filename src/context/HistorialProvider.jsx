import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import dateformat from 'dateformat'
import axios from "axios";

const HistorialContext = createContext()

const HistorialProvider = ({ children }) => {


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
      
      const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/citas/citaHistorial?token=${token}&FI=${fechainicio}T00:00:00.000Z&FF=${fechafin}T23:59:00.000Z&option=1`, {
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
      }
      //
      setLoadTime(false)

    } catch (e) {
      setLoadTime(false)
    }
  }
  
  const cancelarCita = async (cguidCita) => {
    try {
      setLoadTime(true)
      validarToken()
      let token = localStorage.getItem('tokenid');
      
      const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/citas/cancelDate?guidDate=${cguidCita}&token=${token}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      
      const response2 = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/citas/citaHistorial?token=${token}&FI=${fechaInicio}T00:00:00.000Z&FF=${fechaFin}T23:59:00.000Z&option=1`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })

      if (typeof response2.data.response === "string") {
        
        setCitasUsuario([]);
        setError({ band: true, texto: response2.data.response })
      }else{
        setCitasUsuario(response2.data.response);
      }
      if (typeof response.data.response === "string") {
                
        setError({ band: true, texto: response.data.response })
      }
      //
      setLoadTime(false)

    } catch (e) {
      setLoadTime(false)
    }
  }
  const confirmarCita = async (cguidCita) => {
    try {
      setLoadTime(true)
      validarToken()
      let token = localStorage.getItem('tokenid');
      
      const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/citas/confirmacionCitaApp?cGuid=${cguidCita}&token=${token}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      
      const response2 = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/citas/citaHistorial?token=${token}&FI=${fechaInicio}T00:00:00.000Z&FF=${fechaFin}T23:59:00.000Z&option=1`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })

      if (typeof response2.data.response === "string") {
        
        setCitasUsuario([]);
        setError({ band: true, texto: response2.data.response })
      }else{
        setCitasUsuario(response2.data.response);
      }
      if (typeof response.data.response === "string") {
                
        setError({ band: true, texto: response.data.response })
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
    <HistorialContext.Provider
      value={{
        citasUsuario,
        handleChangeDatos,
        datos,
        setError,
        error,
        consultarCitas,
        loadTime,
        cancelarCita,
        confirmarCita
      }}
    >
      {children}
    </HistorialContext.Provider>
  )
}

export {
  HistorialProvider
}

export default HistorialContext