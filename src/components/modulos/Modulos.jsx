import { useEffect } from 'react';

import { 
    Container,
    Box,
    Grid,
    CssBaseline,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    CardActionArea,
    CardActions
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

//importar archivos
import Imagen from "../../archivos/3030856.png"
import ImgHistorial from '../../archivos/historial.png'

//importar componentes
import Navbar from "../Navbar"

//importar helpers
import useAuth from '../../hooks/useAuth';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });


const theme = createTheme({
  palette: {
    redcolor: createColor('#ba000d')
  }
});


export default function Modulos() {

  const { validarToken, setVentana } = useAuth()

  useEffect(() => {
    validarToken()
    setVentana('NA')
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate();

  const modulos = [ 
    {
      id: 1,
      texto: "Cita médica",
      modulo: 'cita',
      imagen: Imagen
    },
    {
      id: 2,
      texto: "Historial",
      modulo: 'historialcitas',
      imagen: ImgHistorial
    }
  ]

  const navegar = (modulo) => {
    
    navigate(`/${modulo}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
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
            <Typography component="h1" variant="h4">
            Módulos
          </Typography>
          <Box component="form" Validate sx={{ mt: 3 }}>
            
            <Grid container spacing={2}>
              {
                modulos.map(e => (
                  <Grid key={e['id']} item lg={6} sm={6} xs={12}>
                  <Card key={e['id']} sx={{ maxWidth: 200, maxHeight: 320 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={e['imagen']}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {e['texto']}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button onClick={() => navegar(e['modulo'])} size="small" color="primary">
                    Ingresar
                  </Button>
                </CardActions>
              </Card>    
              </Grid>
                ))
                   
              }     
            </Grid>
            
            
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}