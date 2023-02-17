import {
    Grid,
    TextField
} from '@mui/material';

import useConsultaPaciente from '../../hooks/useConsultaPaciente';

const DatosMedico = () => {
    
    const { datos } = useConsultaPaciente()
    const {
        medicoNombre,
        medicoPApellido, 
        medicoSApellido, 
        medicoTitulo, 
        medicoCedula, 
        medicoFechaCita, 
        medicoUnidadTrabajo 
    } = datos

    return (
        
        <Grid container spacing={2}>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    autoComplete="given-name"
                    name="medicoNombre"
                    disabled
                    fullWidth
                    id="medicoNombre"
                    value={medicoNombre}
                    label="Nombre (s)"
                    autoFocus
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    disabled
                    fullWidth
                    id="medicoPApellido"
                    label="Primer apellido"
                    name="medicoPApellido"
                    value={medicoPApellido}
                    autoComplete="family-name"
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    disabled
                    fullWidth
                    id="medicoSApellido"
                    label="Segundo apellido"
                    name="medicoSApellido"
                    value={medicoSApellido}
                    autoComplete="family-name"
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    disabled
                    fullWidth
                    id="medicoTitulo"
                    label="Título médico"
                    name="medicoTitulo"
                    value={medicoTitulo}
                    autoComplete="family-name"
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                disabled
                    fullWidth
                    id="medicoCedula"
                    label="Cédula del médico"
                    name="medicoCedula"
                    value={medicoCedula}
                    autoComplete="family-name"
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    disabled
                    fullWidth
                    id="medicoFechaCita"
                    label="Fecha de cita"
                    name="medicoFechaCita"
                    value={medicoFechaCita}
                    autoComplete="family-name"
                />
            </Grid> 
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    disabled
                    fullWidth
                    id="medicoUnidadTrabajo"
                    label="Lugar de trbajo"
                    name="medicoUnidadTrabajo"
                    value={medicoUnidadTrabajo}
                    autoComplete="family-name"
                />
            </Grid>
        </Grid>
    )
}

export default DatosMedico