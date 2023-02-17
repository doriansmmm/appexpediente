import {
    Grid,
    TextField
} from '@mui/material';
import { useEffect } from 'react';

import TablaAlergias from './TablaAlergias'

import useConsultaPaciente from '../../hooks/useConsultaPaciente';

const DatosPaciente = () => {

    const { datos } = useConsultaPaciente()
    const {
        pacienteNombre,
        pacientePApellido,
        pacienteSApellido,
        pacienteEdad,
        pacienteTa,
        pacienteFrecCar,
        pacienteFrecResp,
        pacienteSato,
        pacienteTemp,
        pacientePeso,
        pacienteTalla,
    } = datos

    useEffect(() => {
        
    }, [datos])
    return (
        <Grid container spacing={2}>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    
                    name="pacienteNombre"
                    disabled
                    fullWidth
                    id="pacienteNombre"
                    value={pacienteNombre}
                    
                    label="Nombre (s)"
                    autoFocus
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    disabled
                    fullWidth
                    id="pacientePApellido"
                    label="Primer apellido"
                    name="pacientePApellido"
                
                    value={pacientePApellido}
                    
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    disabled
                    fullWidth
                    id="pacienteSApellido"
                    label="Segundo apellido"
                    name="pacienteSApellido"
                
                    value={pacienteSApellido}
                    
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    fullWidth
                    id="pacienteEdad"
                    label="Edad"
                    name="pacienteEdad"
                    
                    type="number"
                    value={pacienteEdad}
                    disabled
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                    }}
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    fullWidth
                    id="pacienteTa"
                    label="T/A"
                    name="pacienteTa"
                    
                    value={pacienteTa}
                    disabled
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    fullWidth
                    id="pacienteFrecCar"
                    label="Frecuencia cardíaca"
                    name="pacienteFrecCar"
                    
                    value={pacienteFrecCar}
                    disabled
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacienteFrecResp}
                    disabled
                    fullWidth
                    id="pacienteFrecResp"
                    label="Frecuencia respiratoria"
                    name="pacienteFrecResp"
                    
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacienteSato}
                    disabled
                    fullWidth
                    id="pacienteSato"
                    label="SATO 2%"
                    name="pacienteSato"
                    
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacienteTemp}
                    disabled
                    fullWidth
                    id="pacienteTemp"
                    label="Temperatura"
                    name="pacienteTemp"
                    
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacientePeso}
                    disabled
                    fullWidth
                    id="pacientePeso"
                    label="Peso"
                    name="pacientePeso"
                    
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacienteTalla}
                    disabled
                    fullWidth
                    id="pacienteTalla"
                    label="Talla"
                    name="pacienteTalla"
                    
                />
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
               <TablaAlergias />

            </Grid>
        </Grid>

    )
}

export default DatosPaciente