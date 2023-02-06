import {
    Grid,
    TextField
} from '@mui/material';

import TablaAlergias from './TablaAlergias'

import useConsulta from '../../../hooks/useConsulta';

const DatosPaciente = () => {

    const { datos, handleChangeDatos } = useConsulta()
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
    return (
        <Grid container spacing={2}>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    
                    name="pacienteNombre"
                    disabled
                    fullWidth
                    id="pacienteNombre"
                    value={pacienteNombre}
                    onChange={handleChangeDatos}
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
                    onChange={handleChangeDatos}
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
                    onChange={handleChangeDatos}
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    fullWidth
                    id="pacienteEdad"
                    label="Edad"
                    name="pacienteEdad"
                    required
                    type="number"
                    value={pacienteEdad}
                    onChange={handleChangeDatos}
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
                    required
                    value={pacienteTa}
                    onChange={handleChangeDatos}
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    fullWidth
                    id="pacienteFrecCar"
                    label="Frecuencia cardíaca"
                    name="pacienteFrecCar"
                    required
                    value={pacienteFrecCar}
                    onChange={handleChangeDatos}
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacienteFrecResp}
                    onChange={handleChangeDatos}
                    fullWidth
                    id="pacienteFrecResp"
                    label="Frecuencia respiratoria"
                    name="pacienteFrecResp"
                    required
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacienteSato}
                    onChange={handleChangeDatos}
                    fullWidth
                    id="pacienteSato"
                    label="SATO 2%"
                    name="pacienteSato"
                    required
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacienteTemp}
                    onChange={handleChangeDatos}
                    fullWidth
                    id="pacienteTemp"
                    label="Temperatura"
                    name="pacienteTemp"
                    required
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacientePeso}
                    onChange={handleChangeDatos}
                    fullWidth
                    id="pacientePeso"
                    label="Peso"
                    name="pacientePeso"
                    required
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    value={pacienteTalla}
                    onChange={handleChangeDatos}
                    fullWidth
                    id="pacienteTalla"
                    label="Talla"
                    name="pacienteTalla"
                    required
                />
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
                <TablaAlergias />
            </Grid>
        </Grid>

    )
}

export default DatosPaciente