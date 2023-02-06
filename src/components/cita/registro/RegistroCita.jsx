//importar librerias
import { useState, Fragment, useEffect } from 'react';
import {
  InputLabel,
  RadioGroup,
  Radio,
  Container,
  Box,
  Grid,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

//importar hooks
import useCita from '../../../hooks/useCita'

//importación componentes
import TablaDisponibilidad from './TablaDisponibilidad'
import Confirmacion from './Confirmacion'
import ArchivoConfDatos from './ArchivoConfDatos';
import Paises from './Paises';
import Estados from './Estados';
import CentrosTrabajo from './CentrosTrabajo'

//importar archivos
import CONFIDENCIALIDADDEDATOS from '../../../archivos/CONFIDENCIALIDADDEDATOS.pdf'

//importar funciones
import useAuth from '../../../hooks/useAuth';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  palette: {
    redcolor: createColor('#ba000d')
  }
});

export default function RegistroCita() {
  const navigate = useNavigate();
  const { validarToken } = useAuth()
  const { horariosApi, llamarHorariosApi, datos, handleChangeDatos, error, countryApi } = useCita()
  const { fecha, ctGuid, horarioSelect } = datos

  const [open, setOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false)
  const [error2, setError2] = useState('')
  const abrirCP = () => {
    validarToken()

    if (horarioSelect === "" || horarioSelect === undefined || horarioSelect === null) {
      console.log(horarioSelect)
      setError2('Necesitas seleccionar un horario')
    } else {
      console.log("w");
      setError2('')
      setShowPdf(!showPdf);
    }


  }
  useEffect(() => {
    countryApi()
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    validarToken()

    llamarHorariosApi(fecha, ctGuid)
  };


  return (
    <ThemeProvider theme={theme}>

      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          {error2 !== '' ? <Alert severity="error">{error2}</Alert> : null}
          <Typography component="h1" variant="h4">
            Registro cita
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>

            <Grid container spacing={2}>

              <Grid item lg={6} sm={6} xs={12}>

                <TextField
                  id="fecha"
                  name="fecha"
                  label="Fecha"
                  type="date"
                  value={fecha}
                  fullWidth
                  onChange={handleChangeDatos}
                  InputLabelProps={{
                    shrink: true,
                  }
                  } />

              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <Paises />
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <Estados />
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <CentrosTrabajo />
              </Grid>
              <Grid item lg={12} sm={6} xs={12}>
                <InputLabel >Cita</InputLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="presencial"
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel name='tipoCita' onChange={handleChangeDatos} value="presencial" control={<Radio />} label="Presencial" />
                  <FormControlLabel name='tipoCita' onChange={handleChangeDatos} value="virtual" control={<Radio />} label="Virtual" />
                </RadioGroup>
              </Grid>



            </Grid>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={6} xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: "#008aa7" }}
                >
                  Consultar
                </Button>
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="redcolor"
                  onClick={() => navigate('/modulos')}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
            {horariosApi.length > 0 ?
              <Fragment><Grid container spacing={2}>
                <Grid item lg={12} sm={6} xs={12}>
                  <TablaDisponibilidad />
                </Grid>
              </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={6} sm={6} xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ backgroundColor: "#008aa7" }}
                      onClick={abrirCP}
                    >
                      Registrar cita
                    </Button>
                  </Grid>
                </Grid>
              </Fragment> : null
            }

          </Box>
        </Box>

      </Container>
      <Confirmacion
        open={open}
        setOpen={setOpen}
      />
      <ArchivoConfDatos pdf={CONFIDENCIALIDADDEDATOS}
        onCancel={() => { setShowPdf(false); setOpen(true) }}
        visible={showPdf}
        setOpen={setOpen}
      />
    </ThemeProvider>

  );
}