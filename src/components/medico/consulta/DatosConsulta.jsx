import {
    Grid,
    TextField
} from '@mui/material';

import TablaDiagnostico from './TablaDiagnostico';
import TablaSintomas from './TablaSintomas';

import useConsulta from '../../../hooks/useConsulta';

const DatosConsulta = () => {
    const { datos, handleChangeDatos } = useConsulta()
    const { pacienteExploracion, pacientePlan } = datos
    return (
        <Grid container spacing={2}>        
         
            <Grid item lg={12} sm={12} xs={12}>
                <TextField
                    multiline
                    fullWidth
                    id="pacienteExploracion"
                    label="Exploración física y laboratorio"
                    name="pacienteExploracion"
                    autoComplete="family-name"
                    value={pacienteExploracion}
                    onChange={handleChangeDatos}
                    required
                />
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
                <TextField
                    multiline
                    fullWidth
                    id="pacientePlan"
                    label="Plan"
                    name="pacientePlan"
                    autoComplete="family-name"
                    value={pacientePlan}
                    onChange={handleChangeDatos}
                    required
                />
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
                <TablaDiagnostico/>
            </Grid>   
            <Grid item lg={12} sm={12} xs={12}>
                <TablaSintomas/>
            </Grid>
           
        </Grid>

    )
}

export default DatosConsulta