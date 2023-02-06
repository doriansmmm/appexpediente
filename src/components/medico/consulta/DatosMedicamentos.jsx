import {
    Grid,
    TextField
} from '@mui/material';

import TablaMedicamentos from './TablaMedicamentos';
import Medicamentos from './Medicamentos'

import useConsulta from '../../../hooks/useConsulta';

const DatosMedicamentos = () => {
    const { medicamentoSeleccionado, handleChangeMedicamento2 } = useConsulta()
    const { cantidadDosis, tiempoDosis, indicacionesA } = medicamentoSeleccionado
    return (
        <Grid container spacing={2}>        
         
            <Grid item lg={6} sm={6} xs={12}>
                <Medicamentos/>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    multiline
                    fullWidth
                    required
                    size='small'
                    id="cantidadDosis"
                    label="Cantidad de dosis"
                    name="cantidadDosis"
                    value={cantidadDosis}
                    onChange={handleChangeMedicamento2}
                    autoComplete="family-name"
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    multiline
                    fullWidth
                    size='small'
                    required
                    id="tiempoDosis"
                    label="Periodo de dosis"
                    name="tiempoDosis"
                    value={tiempoDosis}
                    onChange={handleChangeMedicamento2}
                    autoComplete="family-name"
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <TextField
                    multiline
                    fullWidth
                    size='small'
                    required
                    id="indicacionesA"
                    label="Indicaciones"
                    name="indicacionesA"
                    value={indicacionesA}
                    onChange={handleChangeMedicamento2}
                    autoComplete="family-name"
                />
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
                <TablaMedicamentos/>
            </Grid>   
            
           
        </Grid>

    )
}

export default DatosMedicamentos