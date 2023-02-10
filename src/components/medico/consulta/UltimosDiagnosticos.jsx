//importar librerias

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Box,
  TextField,
  DialogContent
} from '@mui/material/';

import TablaUltimoDiagnostico from './TablaUltimoDiagnostico';

//importar funciones
import useConsulta from '../../../hooks/useConsulta';

//import { validarToken } from '../../../helpers/auth'
export default function Confirmacion() {

  const { setBandUltDiagn, bandUltDiagn } = useConsulta()
  
  const handleClickOpen = async () => {
    setBandUltDiagn(false)
  };

  const handleClose = () => {
    setBandUltDiagn(false);
  };

  return (
    <div>      
      <Dialog
      fullWidth
       sx={{ mt: 6, width: 1, maxWidth: '100%' }}
        open={bandUltDiagn}
        onClose={handleClose}
        
      >
         <DialogTitle>
                    {"Último diagnóstico"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" >
                        <Grid container spacing={2}>
                            <Grid item lg={12} sm={6} xs={12}>
                               
                            </Grid>
                            <Grid item lg={6} sm={6} xs={12}>
                                
                            </Grid>
                            <Grid item lg={6} sm={6} xs={12}>
                               
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12}>
<TablaUltimoDiagnostico/>
                            </Grid>
                            
                        </Grid>
                    </Box>
                </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}