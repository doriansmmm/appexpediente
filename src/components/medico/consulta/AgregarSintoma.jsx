import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Grid
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import useConsulta from '../../../hooks/useConsulta';
import { useState } from 'react';

export default function AgregarSintoma() {

  const { setError, bandSintomas, setBandSintomas, datos, setDatos } = useConsulta()
  const { sintomas } = datos

  const [sintomaText, setSintomaText] = useState('')

  const handleChange = e => {
    setSintomaText(e.target.value)
  }

  

  const handleClickOpen = async () => {
    try {
      if (sintomaText !== '') {
        setDatos({
          ...datos,
          sintomas: [
            ...sintomas,
            {
              id: uuidv4(),
              sintoma: sintomaText
            }
          ]
        })
        setSintomaText('')
        setBandSintomas(false);
      } else {

        setError({ band: true, texto: 'Debes ingresar el síntoma' })
      }


    } catch (e) {
      setBandSintomas(false);
      setError({ band: false, texto: '' })

    }
  };

  const handleClose = () => {
    setBandSintomas(false);
  };

  return (
    <div>
      <Dialog
        open={bandSintomas}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          {""}
        </DialogTitle>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xs={12}>
              <TextField
                autoComplete="given-name"
                name="sintomaText"
                fullWidth
                multiline
                id="sintomaText"
                label="Síntoma"
                value={sintomaText}
                onChange={handleChange}
                autoFocus
              />
            </Grid>

            <Grid item lg={3} sm={3} xs={12}>
              <Button onClick={handleClose}>Cancelar</Button>
            </Grid>
            <Grid item lg={3} sm={3} xs={12}>
              <Button onClick={handleClickOpen} autoFocus>
                Agregar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}