import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import dateformat from 'dateformat'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HistorialMedicoContext = createContext()

const HistorialMedicoProvider = ({ children }) => {

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

      const response = await axios.post(`https://apiexpedientemedicoapi.azurewebsites.net/api/citas/citaHistorial?token=${token}&FI=${fechainicio}T00:00:00.000Z&FF=${fechafin}T18:30:00.000Z&option=3`, {
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
      } else {
        
        setCitasUsuario(response.data.response);
      }
      //
      setLoadTime(false)

    } catch (e) {
      setLoadTime(false)
    }
  }

  const consultarReceta = async (cguidCita) => {
    try {
      setLoadTime(true)
      validarToken()
      let token = localStorage.getItem('tokenid');
      
      
      const response = await axios.get(`https://apiexpedientemedicoapi.azurewebsites.net/api/recetass/GetRecetaByCita?citaGuid=${cguidCita}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      
      
      const json = {
        pacienteNombre: response.data.paciente.userNombre,
        pacientePApellido: response.data.paciente.userPApellido,
        pacienteSApellido: response.data.paciente.userSApellido,
        pacienteEdad: response.data.paciente.userAge,
        pacienteTa:  response.data.receta.reTa,
        medicoNombre: response.data.medico.userNombre,
        medicoPApellido: response.data.medico.userPApellido,
        medicoSApellido: response.data.medico.userSApellido,
        medicoTitulo: response.data.detallesMedico.medTitulo,
        medicoCedula: response.data.detallesMedico.medCedula,
        medicoUniv: response.data.detallesMedico.medUniversidad,
        medicoFechaCita: response.data.receta.reDcreate.split('T')[0],
        medicoLogo: response.data.detallesMedico.medLogo,
        // medicoTelefono: response.data.response.medico.userPhone,
        medicoUnidadTrabajo: response.data.medico.userCentroTrabajo,
        medicoFirma: response.data.receta.reFirma,
        pacienteFrecCar: response.data.receta.reFrecCar,
        pacienteFrecResp: response.data.receta.reFrecResp,
        pacienteSato: response.data.receta.reSato,
        pacienteTemp: response.data.receta.reTemp,
        pacientePeso: response.data.receta.rePeso,
        pacienteTalla: response.data.receta.reTalla,
        alergias: response.data.alergias,
        diagnosticos: response.data.diagnosticos,
        // pacienteExploracion: json2.pacienteExploracion,
        // pacientePlan: json2.pacientePlan,
        // sintomas: json2.sintomas,
       medicamentos: response.data.medicamentos,
        // alergias: json2.alergias,
        // diagnosticos: json2.diagnosticos
        option: 2
      }
      
      localStorage.setItem('jsonexpmed', JSON.stringify(json))
      navigate('/receta')
      setLoadTime(false)

    } catch (e) {
      setLoadTime(false)
    }
  }

  useEffect(() => {
    consultarCitas(fechaInicio, fechaFin)
  }, [])

  return (
    <HistorialMedicoContext.Provider
      value={{
        citasUsuario,
        handleChangeDatos,
        datos,
        setError,
        error,
        consultarCitas,
        loadTime,
        consultarReceta
      }}
    >
      {children}
    </HistorialMedicoContext.Provider>
  )
}

export {
  HistorialMedicoProvider
}

export default HistorialMedicoContext