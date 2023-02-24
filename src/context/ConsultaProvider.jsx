import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import useAuth from "../hooks/useAuth";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const ConsultaContext = createContext()

const ConsultaProvider = ({ children }) => {

  const navigate = useNavigate()
  // eslint-disable-next-line
  const { validarToken, guidCita } = useAuth()

  const [ bandUltDiagn, setBandUltDiagn] = useState(false)

  // eslint-disable-next-line
  const [loadTime, setLoadTime] = useState(false)
  const [exito, setExito] = useState(false)
  // eslint-disable-next-line
  const [alergiasCatalogo, setAlergiasCatalogo] = useState([
    /*{
      alGuid: uuidv4(),
      alNombre: 'Alergia a alimentos'
    },
    {
      alGuid: uuidv4(),
      alNombre: 'Alergia a fármacos'
    },
    {
      alGuid: uuidv4(),
      alNombre: 'Asma alérgico'
    }*/
  ])

  const [diagnosticoCatalogo, setDiagnosticoCatalogo] = useState([
    /*{
      diGuid: uuidv4(),
      diNombre: 'Diagnostico 1'
    },
    {
      diGuid: uuidv4(),
      diNombre: 'Diagnostico 2'
    },
    {
      diGuid: uuidv4(),
      diNombre: 'Diagnostico 3'
    }*/
  ])

  const [medicamentoCatalogo, setMedicamentoCatalogo] = useState([
    {
      mGuid: "8132010A-3E4F-47B3-A441-5870D15AC172",
      mNombre: 'ÁCIDO ACETILSALICÍLICO',
      mPresentacion: 'TABLETA',
      mCantidad: '500 MG',
      mCategoria: 'ANALGÉSICO'
    },
    {
      mGuid: "F0703F98-93CE-4F27-8A11-D954FD0C8B47",
      mNombre: 'ÁCIDO ACETILSALICÍLICO',
      mPresentacion: 'TABLETA EFERVESCENTE',
      mCantidad: '500 MG',
      mCategoria: 'ANALGÉSICO'
    }
  ])

  const [alergiaSeleccionada, setAlergiaSeleccionada] = useState({
    alGuid: '',
    alNombre: ''
  })
  const [diagnosticoSeleccionada, setDiagnosticoSeleccionada] = useState({
    diGuid: '',
    diNombre: ''
  })
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(
    {
      nombreMedicamento: '',
      medGuid: '',
      cantidadDosis: '',
      tiempoDosis: '',
      indicacionesA: ''
    }
  )

  const handleChangeMedicamento = (e, f) => {
    setMedicamentoSeleccionado({
      ...medicamentoSeleccionado,
      nombreMedicamento: e,
      medGuid: f
    })
  }
  const handleChangeMedicamento2 = (e) => {
    setMedicamentoSeleccionado({
      ...medicamentoSeleccionado,
      [e.target.name]: e.target.value
    })
  }

  const [datos, setDatos] = useState({
    medicoNombre: '',
    medicoPApellido: '',
    medicoSApellido: '',
    medicoTitulo: '',
    medicoCedula: '',
    medicoFechaCita: '',
    medicoTelefono: '',
    medicoUnidadTrabajo: '',
    medicoUniv: '',
    medicoFirma: '',
    pacienteNombre: '',
    pacientePApellido: '',
    pacienteSApellido: '',
    pacienteEdad: 25,
    pacienteTa: '',
    pacienteFrecCar: '',
    pacienteFrecResp: '',
    pacienteSato: '',
    pacienteTemp: '',
    pacientePeso: '',
    pacienteTalla: '',
    pacienteAlergias: '',
    pacienteIDX: 'String',
    pacienteExploracion: '',
    pacientePlan: '',
    sintomas: [],
    medicamentos: [],
    alergias: [],
    diagnosticos: [],
  })
  const {
    pacienteEdad,
    pacienteTa,
    pacienteFrecCar,
    pacienteFrecResp,
    pacienteSato,
    pacienteTemp,
    pacientePeso,
    pacienteTalla,
    pacienteIDX,
    pacienteExploracion,
    pacientePlan,
    medicamentos,
    alergias,
    diagnosticos,
    sintomas,
    medicoFirma
  } = datos

  const [error, setError] = useState({
    band: false,
    texto: ''
  })

  const [bandSintomas, setBandSintomas] = useState(false)

  const handleChangeDatos = (e) => {
    const datos2 = {
      ...datos,
      [e.target.name]: e.target.value
    }
    localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }



  const getDetallesCita = async (e) => {
    try {
      
      setLoadTime(true)
      validarToken()
      let tokens = localStorage.getItem('tokenid');
      
      let json = localStorage.getItem('jsonexpmed')
      const json2 = JSON.parse(json)      
      
      const response = await axios.get(`https://apiexpedientemedicoapi.azurewebsites.net/api/citas/citaDetail?cGuid=${e}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      setDatos({
        ...datos,
        pacienteNombre: response.data.response.paciente.userNombre,
        pacientePApellido: response.data.response.paciente.userPApellido,
        pacienteSApellido: response.data.response.paciente.userSApellido,
        pacienteEdad: response.data.response.paciente.userAge,
        pacienteTa: json2!=null? json2.pacienteTa: '',
        medicoNombre: response.data.response.medico.userNombre,
        medicoPApellido: response.data.response.medico.userPApellido,
        medicoSApellido: response.data.response.medico.userSApellido,
        medicoTitulo: response.data.response.detallesMedico.medTitulo,
        medicoCedula: response.data.response.detallesMedico.medCedula,
        medicoUniv: response.data.response.detallesMedico.medUniversidad,
        medicoLogo: response.data.response.detallesMedico.medLogo,
        medicoFechaCita: response.data.response.cita.cDcita.split('T')[0],
        medicoTelefono: response.data.response.medico.userPhone,
        medicoUnidadTrabajo: response.data.response.unidadTrabajo,
        medicoFirma: json2!=null?json2.medicoFirma: '',
        pacienteFrecCar: json2!=null?json2.pacienteFrecCar: '',
        pacienteFrecResp: json2!=null?json2.pacienteFrecResp: '',
        pacienteSato: json2!=null?json2.pacienteSato: '',
        pacienteTemp: json2!=null?json2.pacienteTemp: '',
        pacientePeso: json2!=null?json2.pacientePeso: '',
        pacienteTalla: json2!=null?json2.pacienteTalla: '',
        pacienteAlergias: json2!=null?json2.pacienteAlergias: '',
        pacienteIDX: json2!=null?json2.pacienteIDX: '',
        pacienteExploracion: json2!=null?json2.pacienteExploracion: '',
        pacientePlan: json2!=null?json2.pacientePlan: '',
        sintomas: json2!=null?json2.sintomas: [],
        medicamentos: json2!=null?json2.medicamentos: [],
        alergias: json2!=null?json2.alergias: [],
        diagnosticos: json2!=null?json2.diagnosticos: [],
        ultimoDiagnostico: response.data.response.uDiagnostico
      })
      
      const responseAlergias = await axios.get(`https://apiexpedientemedicoapi.azurewebsites.net/api/alergia/all?token=${tokens}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      setAlergiasCatalogo(responseAlergias.data.response);
      const responseDiagnostico = await axios.get(`https://apiexpedientemedicoapi.azurewebsites.net/api/diagnostico/all?token=${tokens}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      setDiagnosticoCatalogo(responseDiagnostico.data.response);
      
      const responseMedicamentos = await axios.get(`https://apiexpedientemedicoapi.azurewebsites.net/all?token=${tokens}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
      setMedicamentoCatalogo(responseMedicamentos.data.response);
      
      
      setLoadTime(false)
    } catch (e) {
      setLoadTime(false)

      setError({ band: true, texto: e.response.data.response })
    }
  }

  const crearCita = async () => {
    try {
      setLoadTime(true)
      validarToken()
      let tokens = localStorage.getItem('tokenid');
      const medicamentos2 = medicamentos.map(e => ({ medGuid: e.medGuid, reMedCantidadDosis: e.cantidadDosis, reMedTiempoDosis: e.tiempoDosis }))

      const alergias2 = alergias.map(e => ({ alGuid: e.alGuid }))

      const diagnosticos2 = diagnosticos.map(e => ({ diGuid: e.diGuid }))


      const sintomas2 = sintomas.map(e => ({ sintomanombre: e.sintomanombre }))

      const json = {
        "token": tokens,
        "citaGuid": guidCita,
        "userEdad": pacienteEdad,
        "ta": pacienteTa,
        "sintomas": "string",
        "frecCar": pacienteFrecCar,
        "frecResp": pacienteFrecResp,
        "sato": pacienteSato,
        "temp": pacienteTemp,
        "peso": pacientePeso,
        "talla": pacienteTalla,
        "idx": pacienteIDX,
        "diagnostico": "string",
        "expFisLab": pacienteExploracion,
        "plan": pacientePlan,
        "firma": medicoFirma,
        "medicamentosList": {
          "medicamentos": medicamentos2
        },
        "alergiasList": {
          "alergias": alergias2
        },
        "diagnosticoList": {
          "diagnosticos": diagnosticos2
        },
        "sintomasList": {
          "sintoma": sintomas2
        }
      }
      
      const response = await axios.post(`https://apiexpedientemedicoapi.azurewebsites.net/api/recetass/create`, json, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        }
      })
   
      navigate('/receta')
      setLoadTime(false)
      setExito(true)
    } catch (e) {
      setLoadTime(false)

    }
  }


  useEffect(() => {
    if (exito) {
      navigate('/medico')
    }
  }, [exito])

  useEffect(() => {
    
      
  }, [datos])

  return (
    <ConsultaContext.Provider
      value={{
        setError,
        error,
        loadTime,
        handleChangeDatos,
        datos,
        setBandSintomas,
        bandSintomas,
        setDatos,
        alergiasCatalogo,
        setAlergiaSeleccionada,
        alergiaSeleccionada,
        diagnosticoCatalogo,
        setDiagnosticoSeleccionada,
        diagnosticoSeleccionada,
        medicamentoCatalogo,
        medicamentoSeleccionado,
        handleChangeMedicamento,
        handleChangeMedicamento2,
        setMedicamentoSeleccionado,
        getDetallesCita,
        crearCita,
        setBandUltDiagn,
        bandUltDiagn
      }}
    >
      {children}
    </ConsultaContext.Provider>
  )
}

export {
  ConsultaProvider
}

export default ConsultaContext