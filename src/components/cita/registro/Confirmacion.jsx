//importar librerias

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material/';

import Load from './Load';

//importar funciones
import useAuth from '../../../hooks/useAuth';
import useCita from '../../../hooks/useCita';

//import { validarToken } from '../../../helpers/auth'
export default function Confirmacion({ open, setOpen }) {

  const { validarToken } = useAuth()
  const { crearCitaApi, loadTime } = useCita()
  
  const handleClickOpen = async () => {
    validarToken()  
    crearCitaApi()  
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Load/>
      {loadTime === false?(
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estas seguro de registrar esta cita?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClickOpen} autoFocus>
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
      ):null}
    </div>
  );
}