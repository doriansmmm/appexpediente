import { createContext, useState, useEffect } from "react";
import axios from 'axios'

const RegistroUsuarioContext = createContext()

const RegistroUsuarioProvider = ({ children }) => {

    const [usuario, setUsuario] = useState({
        userNombre: '',
        userPApellido: '',
        userSApellido: '',
        userEmail: '',
        userPass: '',
        userPhone: '',
        userGenderId: '2',
        userAge: '',
        userCpId: '',
        userStreet: '',
        userNext: '',
        userNint: '',
        userCtId: '',
        userCdatos: 1
    })

    const [datos, setDatos] = useState({
        coGuid: '',
        stateGuid: '',
        municipio: '',
        cp: '',
        aceptCdatos: true
    })
    const { coGuid, cp } = datos
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([])
    const [cps, setCps] = useState([])
    const [centrosTrabajo, setCentrosTrabajo] = useState([])
    const [error, setError] = useState('')


    const handleChangeUsuario = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.name === 'telefono' ? event.target.value.toString().replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '') : event.target.value,
        });
    };
    const handleChangeUsuario2 = (name, value) => {
        setDatos({
            ...datos,
            [name]: value
        });
    };
    const handleChangeUsuario3 = (name, value) => {
        setUsuario({
            ...usuario,
            [name]: value
        });
    };

    const limpiarPaises = () => {
        setStates([])
        setCps([])
        setDatos({
            coGuid: '',
            stateGuid: '',
            municipio: '',
            cp: ''
        })
    }

    const limpiarEstados = () => {
        setCps([])
        setDatos({
            ...datos,
            stateGuid: '',
            municipio: '',
            cp: ''
        })
    }

    const countryApi = async () => {
        try {
            const response = await axios.get('https://mabeexpedientemedico.azurewebsites.net/api/countriess', {
                headers: {

                    'Access-Control-Allow-Origin': '*',

                    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',

                    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',

                    'Content-Type': 'application/json',
                }
            })
            
            setCountries(response.data.response)
        } catch (e) {
        }
    }

    const statesApi = async (id) => {
        try {
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
            }
        } catch (e) {

        }
    }

    const cpApi = async (guid, cp) => {
        if (guid !== null && guid !== '' && guid !== undefined) {
            setError('')
            if (cp !== null && cp !== '' && cp !== undefined) {
                setError('')
                try {

                    const response = await axios.get(`https://mabeexpedientemedico.azurewebsites.net/api/cp?stateguid=${guid}&cp=${cp}`, {
                        headers: {

                            'Access-Control-Allow-Origin': '*',

                            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',

                            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',

                            'Content-Type': 'application/json',
                        }
                    })
                    if (response.data.response.length < 1) {
                        setError('No se ha encontrado el código postal')
                    } else {
                        setError('')
                        setCps(response.data.response)
                        setDatos({
                            ...datos,
                            municipio: response.data.response[0]['cpMunicipio']
                        });
                    }

                } catch (e) {
                    console.log(e);
                }
            } else {
                setError('Debes ingresar un código postal')
            }
        } else {
            setError('Debes seleccionar un estado')
        }
    }
    const centrosTrabajoApi = async (guid) => {
        try {

            const response = await axios.get(`https://mabeexpedientemedico.azurewebsites.net/api/entrodetrabajo?stateGuid=${guid}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                    'Content-Type': 'application/json',
                }
            })

            setCentrosTrabajo(response.data.response)
            setUsuario({
                ...usuario,
                userCtId: response.data.response[0]['ctId']
            });

        } catch (e) {
            setError(`No hay centros de trabajo que pertenezcan a `)
        }
    }

    const createUser = async () => {
        // eslint-disable-next-line
        const response = await axios.post('https://mabeexpedientemedico.azurewebsites.net/api/users/create', usuario, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                'Content-Type': 'application/json',
            }
        });
    }

    useEffect(() => {
        statesApi(coGuid)
        // eslint-disable-next-line
    }, [coGuid])

    useEffect(() => {
        if (cp === '') {
            setCps([])
            setDatos({
                ...datos,
                municipio: ''
            })
        }
        // eslint-disable-next-line
    }, [cp])

    return (
        <RegistroUsuarioContext.Provider
            value={{
                usuario,
                setUsuario,
                handleChangeUsuario,
                handleChangeUsuario2,
                handleChangeUsuario3,
                countryApi,
                countries,
                states,
                datos,
                error,
                setError,
                cpApi,
                cps,
                limpiarPaises,
                limpiarEstados,
                createUser,
                centrosTrabajoApi,
                centrosTrabajo
            }}
        >
            {children}
        </RegistroUsuarioContext.Provider>
    )
}

export {
    RegistroUsuarioProvider
}

export default RegistroUsuarioContext