import {
    Grid
} from '@mui/material';

import TablaMedicamentos from './TablaMedicamentos';

const DatosMedicamentos = () => {

    return (
        <Grid container spacing={2}>                             
            <Grid item lg={12} sm={12} xs={12}>
                <TablaMedicamentos/>
            </Grid>                       
        </Grid>

    )
}

export default DatosMedicamentos