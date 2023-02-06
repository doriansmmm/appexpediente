import { createContext, useState, useEffect } from "react";
import dateformat from 'dateformat'
import axios from 'axios'
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom'

const CitaContext = createContext()

const CitaProvider = ({ children }) => {

  const navigate = useNavigate()

  const { validarToken } = useAuth()
  
  const [error, setError] = useState({
    band: false,
    texto: ''
  })
  const [loadTime, setLoadTime] = useState(false)
  const [horariosApi, setHorariosApi] = useState([])
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([])
  const [centrosTrabajo, setCentrosTrabajo] = useState([])
  //const [error, setError] = useState('')
  const [datos, setDatos] = useState({
    horarioSelect: '',
    fecha: dateformat(new Date(), "yyyy-mm-dd"),
    tipoCita: 'presencial',
    coGuid: '',
    stateGuid: '',
    ctGuid: ''
  })
  const { fecha, coGuid, stateGuid, tipoCita, ctGuid, horarioSelect } = datos

  useEffect(() => {
    setHorariosApi([])
    if (new Date(fecha) < new Date(dateformat(new Date(), "yyyy-mm-dd"))) {
      setError({ band: true, texto: 'No se permiten fechas anteriores a la actual'})
    } else {
      setError({band: false, texto: '' })
    }
    // eslint-disable-next-lin
  }, [fecha])

  const handleChangeDatos = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };
  const handleChangeDatos2 = (name, value) => {
    setDatos({
      ...datos,
      [name]: value
    });
  };

  const limpiarPaises = () => {
    setStates([])
    setCentrosTrabajo([])
    setDatos({
      ...datos,
      coGuid: '',
      stateGuid: '',
      ctGuid: ''
    });
    setHorariosApi([])
  }
  const limpiarEstados = () => {
    setCentrosTrabajo([])
    setDatos({
      ...datos,
      stateGuid: '',
      ctGuid: ''
    });
    setHorariosApi([])
  }

  const llamarHorariosApi = async (fecha, guid) => {
    try {
      
      validarToken()
      if (new Date(fecha) < new Date(dateformat(new Date(), "yyyy-mm-dd"))) {
        setError({ band: true, texto: 'No se permiten fechas anteriores a la actual'})
      } else {
        setLoadTime(true)
      const response = await axios.get(`https://mabeexpedientemedico.azurewebsites.net/api/citas/disponibilidad?fecha=${fecha}&centroTGuid=${guid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })

      const arrayClear = response.data.response.map(e => ({ horario: e.split('T')[1] }))

      setHorariosApi(arrayClear)
      setError({ band: false, texto: ''})
      setLoadTime(false)
    }
    } catch (e) {
      setLoadTime(false)
      setError({band: true, texto:`No hay horarios disponibles para esta fecha y este centro de trabajo`})
    }
  }
  const countryApi = async () => {

    try {
      setLoadTime(true)
      validarToken()
      const response = await axios.get('https://mabeexpedientemedico.azurewebsites.net/api/countriess', {
        headers: {

          'Access-Control-Allow-Origin': '*',

          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',

          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',

          'Content-Type': 'application/json',
        }
      })
      setCountries(response.data.response)
      setHorariosApi([])
      setLoadTime(false)
    } catch (e) {
      setLoadTime(false)
    }
  }
  const statesApi = async (id) => {
    try {
      setLoadTime(true)
      validarToken()
      if (id !== '') {
        const response = await axios.get(`https://mabeexpedientemedico.azurewebsites.net/api/states?guid=${id}`, {
          headers: {

            'Access-Control-Allow-Origin': '*',

            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',

            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',

            'Content-Type': 'application/json',
          }
        })
        setStates(response.data.response)
        setDatos({
          ...datos,
          stateGuid: response.data.response[0].stateGuid
        });
        setHorariosApi([])
        setLoadTime(false)
      }
    } catch (e) {
      setLoadTime(false)
    }
  }
  const centrosTrabajoApi = async (guid) => {
    try {
      setLoadTime(true)
      validarToken()
      if (stateGuid !== undefined) {
        const response = await axios.get(`https://mabeexpedientemedico.azurewebsites.net/api/entrodetrabajo?stateGuid=${guid}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Content-Type': 'application/json',
          }
        })

        setCentrosTrabajo(response.data.response)
        setError({band: false, texto:''})
        setDatos({
          ...datos,
          ctGuid: response.data.response[0]['ctGuid']
        });
        setHorariosApi([])
        setLoadTime(false)
      }
    } catch (e) {
      setLoadTime(false)
      setError({band: true, texto:`No hay centros de trabajo que pertenezcan al estado seleccionado `})
    }
  }
  const crearCitaApi = async () => {
    try {
      setLoadTime(true)
      validarToken()
      let tokens = localStorage.getItem('tokenid');    
      const jsonBody = {
        token: tokens,
        cTcId: tipoCita === 'presencial' ? 2: 1,
        cCtGuid: ctGuid,
        cDcita: fecha + " " + horarioSelect + ".000"
      }
      
      // eslint-disable-next-line
        const response = await axios.post(`https://mabeexpedientemedico.azurewebsites.net/api/citas/create`, jsonBody, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Content-Type': 'application/json',
          }
        })
        setLoadTime(false)
        navigate('/historialcitas')
        
    } catch (e) {
      setLoadTime(false)
      setError({band: true, texto:`No se pudo realizar la cita, vuelva a intenrarlo`})
    }
  }

  useEffect(() => {
    statesApi(coGuid)
    // eslint-disable-next-line
  }, [coGuid])

  useEffect(() => {

    if (stateGuid !== undefined && stateGuid !== '') {
      centrosTrabajoApi(stateGuid)
    }
    // eslint-disable-next-line
  }, [stateGuid])
  return (
    <CitaContext.Provider
      value={{
        horariosApi,
        llamarHorariosApi,
        handleChangeDatos,
        handleChangeDatos2,
        datos,
        setError,
        error,
        countries,
        countryApi,
        states,
        centrosTrabajo,
        limpiarPaises,
        limpiarEstados,
        setHorariosApi,
        crearCitaApi,
        loadTime
      }}
    >
      {children}
    </CitaContext.Provider>
  )
}

export {
  CitaProvider
}

export default CitaContext