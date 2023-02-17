import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import dateformat from 'dateformat'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HistorialCitasDisponiblesContext = createContext()

const HistorialCitasDisponiblesProvider = ({ children }) => {
  const navigate = useNavigate()

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


  const consultarCitas = async () => {
    try {
      setLoadTime(true)
      validarToken()
      let token = localStorage.getItem('tokenid');
      
      const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/citas/citaHistorial?token=${token}&FI=${fechaInicio}T00:00:00.000Z&FF=${fechaFin}T18:30:00.000Z&option=2`, {
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
        const filterArray = response.data.response.filter((e) => e.cMedId===0)

        setCitasUsuario(filterArray);
      }
      //
      setLoadTime(false)

    } catch (e) {
      setLoadTime(false)

    }
  }

  const asignarCita = async(guid) => {
    try{
      setLoadTime(true)
      validarToken()
      let token = localStorage.getItem('tokenid');
      const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/citas/asignarCita?token=${token}&citaG=${guid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      navigate('/medico')
      setLoadTime(false)
    }catch(e){
      setLoadTime(false)
      setError({ band: true, texto: 'La cita ya sido asignada' })
      consultarCitas()
    }
  }

  useEffect(() => {
    consultarCitas()
  }, [])

  return (
    <HistorialCitasDisponiblesContext.Provider
      value={{
        citasUsuario,
        datos,
        setError,
        error,
        consultarCitas,
        loadTime,
        asignarCita
      }}
    >
      {children}
    </HistorialCitasDisponiblesContext.Provider>
  )
}

export {
  HistorialCitasDisponiblesProvider
}

export default HistorialCitasDisponiblesContext