import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useRegistroUsuario from '../../hooks/useRegistroUsuario';

export default function Confirmacion({ open, setOpen }) {

  const { createUser, setError } = useRegistroUsuario()

  const navigate = useNavigate();

  const handleClickOpen = async () => {
    try {
      createUser()
      setOpen(false);
      navigate('/login')
    } catch (e) {
      setOpen(false);
      setError(e.response.data)

    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          {"¿Estas seguro de registrar esta información?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClickOpen} autoFocus>
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}