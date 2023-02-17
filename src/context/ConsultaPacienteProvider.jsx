import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

const ConsultaPacienteContext = createContext()

const client = axios.create({
    baseURL: "https://mabeexpedientemedico.azurewebsites.net/api"
});


const ConsultaPacienteProvider = ({ children }) => {
    const navigate = useNavigate()

    const { validarToken } = useAuth()

    const [error, setError] = useState({
        band: false,
        texto: ''
    })
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
        pacienteEdad: 0,
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


    const [loadTime, setLoadTime] = useState(false)
    const [bandUltDiagn, setBandUltDiagn] = useState(false)

    const getDetallesCita = async (e) => {
        try {
            validarToken()
            setLoadTime(true)
            const response = await client.get(`/recetass/GetRecetaByCita?citaGuid=${e}`)
            console.log(response.data);
            setDatos({
                ...datos,
                pacienteNombre: response.data.paciente.userNombre,
                pacientePApellido: response.data.paciente.userPApellido,
                pacienteSApellido: response.data.paciente.userSApellido,
                pacienteEdad: response.data.paciente.userAge,
                pacienteTa: response.data.receta.reTa,
                pacienteFrecCar: response.data.receta.reFrecCar,
                pacienteFrecResp: response.data.receta.reFrecResp,
                pacienteSato: response.data.receta.reSato,
                pacienteTemp: response.data.receta.reTemp,
                pacientePeso: response.data.receta.rePeso,
                pacienteTalla: response.data.receta.reTemp,
                alergias: response.data.alergias,
                pacienteExploracion: response.data.receta.reExpFisLab,
                pacientePlan: response.data.receta.rePlan,
                diagnosticos: response.data.diagnosticos,
                medicamentos: response.data.medicamentos,
                medicoNombre: response.data.medico.userNombre,
                medicoPApellido: response.data.medico.userPApellido,
                medicoSApellido: response.data.medico.userSApellido,
                medicoTitulo: response.data.detallesMedico.medTitulo,
                medicoCedula: response.data.detallesMedico.medCedula,
                medicoFechaCita: response.data.receta.reDcreate.split('T')[0],
                medicoUnidadTrabajo: response.data.medico.userCentroTrabajo
            })

            setLoadTime(false)
        } catch (e) {
            setLoadTime(false)
            setError({ true: 'Se ha producido un error, favor de recargar la página' })
        }
    }


    return (
        <ConsultaPacienteContext.Provider
            value={{
                setError,
                error,
                loadTime,
                getDetallesCita,
                setBandUltDiagn,
                datos
            }}
        >
            {children}
        </ConsultaPacienteContext.Provider>
    )
}

export {
    ConsultaPacienteProvider
}

export default ConsultaPacienteContext