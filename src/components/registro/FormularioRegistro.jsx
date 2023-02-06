//importar librerias
import {
    Box,
    Container,
    CssBaseline,
    Typography,
    Grid,
    TextField,
    InputLabel,
    Input,
    RadioGroup,
    Radio,
    FormControlLabel,
    Alert,
    Checkbox,
    Button
} from '@mui/material'
import validator from 'validator'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'
import { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IMaskInput } from 'react-imask';

//importar hooks
import useRegistroUsuario from '../../hooks/useRegistroUsuario';

//importar componentes
import Paises from './Paises';
import Estados from './Estados';
import Colonias from './Colonias';
import CentrosTrabajo from './CentrosTrabajo'
import ArchivoConfDatos from './ArchivoConfDatos'
import Confirmacion from './Confirmacion'
//importar archivos
import CONFIDENCIALIDADDEDATOS from '../../archivos/CONFIDENCIALIDADDEDATOS.pdf'

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
        redcolor: createColor('#ba000d')
    }
});

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function FormularioRegistro() {

    const navigate = useNavigate()

    const [abrirPdf, setAbrirPdf] = useState(false)
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState()
    const [validPassword, setValidPassword] = useState({
        bandPass: false,
        textoPass: ''
    })
    const { bandPass, textoPass } = validPassword

    const { centrosTrabajoApi, usuario, handleChangeUsuario, countryApi, datos, handleChangeUsuario2, error, cpApi, handleChangeUsuario3, setError } = useRegistroUsuario()

    const { userNombre, userPApellido, userSApellido, userEmail, userPass, userPhone, userAge, userStreet, userNext, userNint } = usuario

    const { cp, stateGuid, municipio, aceptCdatos } = datos

    const handleSubmit = (e) => {
        e.preventDefault()
        if (aceptCdatos === false) {
            if (validator.isStrongPassword(userPass, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              })) {
                setError('')
                if(userPass===password){
                    setError('')
                    if(userPhone.length >=14){
                        setError('')
                        setOpen(true)
                    }else{
                        setError('El teléfono debe llevar 10 dígitos')
                    }
                }else{
                    setError('Las contraseñas no coinciden')
                }
              } else {
                setError('La contraseña debe contar con 8 o más caracteres, incluyendo números, mayúsculas, minúsculas y caracteres especiales ($#%)')            
              }
        } else {
            setError('Debes leer y aceptar la confidencialidad de datos')
        }
    }

    useEffect(() => {
        countryApi()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (password !== userPass) {
            setValidPassword({ bandPass: true, textoPass: 'Las contraseñas no coinciden' })
        } else {
            setValidPassword({ bandPass: false, textoPass: '' })
        }
        
        // eslint-disable-next-line
    }, [password, userPass])

    useEffect(()=> {
        setError('')
        // eslint-disable-next-line
    }, [aceptCdatos])
    const validPass = (event) => {
        if (validator.isStrongPassword(event.target.value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            setError('')
          } else {
            setError('La contraseña debe contar con 8 o más caracteres, incluyendo números, mayúsculas, minúsculas y caracteres especiales ($#%)')            
          }
          handleChangeUsuario3('userPass', event.target.value)
    }
    const validPass2 = (event) => {
        if (validator.isStrongPassword(event.target.value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            setError('')
          } else {
            setError('La contraseña debe contar con 8 o más caracteres, incluyendo números, mayúsculas, minúsculas y caracteres especiales ($#%)')            
          }
    }


    const abrirConfDatos = () => {
        setAbrirPdf(!abrirPdf)
        handleChangeUsuario2('aceptCdatos', false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Confirmacion open={open} setOpen={setOpen} />
            <Container component="main">
                <div>
                    <ArchivoConfDatos pdf={CONFIDENCIALIDADDEDATOS}
                        onCancel={() => setAbrirPdf(false)}
                        visible={abrirPdf}
                    />
                </div>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {error !== '' ? <Alert severity="error">{error}</Alert> : null}
                    <Typography component="h1" variant="h4">
                        Alta de usuario externo
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userNombre"
                                required
                                fullWidth
                                id="userNombre"
                                label="Nombre"
                                autoFocus
                                value={userNombre}
                                onChange={handleChangeUsuario}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userPApellido"
                                label="Primer apellido"
                                name="userPApellido"
                                autoComplete="family-name"
                                value={userPApellido}
                                onChange={handleChangeUsuario}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="userSApellido"
                                label="Segundo apellido"
                                name="userSApellido"
                                autoComplete="family-name"
                                value={userSApellido}
                                onChange={handleChangeUsuario}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userEmail"
                                label="userEmail"
                                name="userEmail"
                                autoComplete="email"
                                value={userEmail}
                                onChange={handleChangeUsuario}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userPass"
                                label="Nueva contraseña"
                                name="userPass"
                                autoComplete="current-password"
                                type="password"
                                value={userPass}
                                onChange={validPass}
                                error={bandPass}
                                helperText={textoPass}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="contrasena2"
                                label="Confirmar contraseña"
                                name="contrasena2"
                                autoComplete="current-password"
                                type="password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value); validPass2(e)}}
                                error={bandPass}
                                helperText={textoPass}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <InputLabel htmlFor="formatted-text-mask-input">Teléfono</InputLabel>
                            <Input
                                value={userPhone}
                                required
                                fullWidth
                                name="userPhone"
                                id="userPhone"
                                inputComponent={TextMaskCustom}
                                onChange={handleChangeUsuario}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <InputLabel >Sexo</InputLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="2"
                                name="radio-buttons-group"
                                row
                                onChange={handleChangeUsuario}
                            >
                                <FormControlLabel name="userGenderId" onChange={handleChangeUsuario} value="2" control={<Radio />} label="Femenino" />
                                <FormControlLabel name="userGenderId" onChange={handleChangeUsuario} value="1" control={<Radio />} label="Masculino" />
                            </RadioGroup>
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                required
                                fullWidth
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
                                id="userAge"
                                label="Edad"
                                name="userAge"
                                type="number"
                                value={userAge}
                                onChange={handleChangeUsuario}
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                }}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <Paises />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <Estados />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                name="cp"
                                required
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                id="cp"
                                label="cp"
                                type="number"
                                value={cp}
                                onChange={(e) => handleChangeUsuario2([e.target.name], e.target.value)}
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                                }}
                            />
                            <SearchIcon style={{ cursor: 'pointer' }} fontSize="large" onClick={() => {cpApi(stateGuid, cp); centrosTrabajoApi(stateGuid)}} />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CentrosTrabajo />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                name="municipio"
                                disabled
                                fullWidth
                                required
                                id="municipio"
                                label="Municipio"
                                value={municipio}
                                onChange={(e) => handleChangeUsuario2([e.target.name], e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <Colonias />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userStreet"
                                required
                                fullWidth
                                id="userStreet"
                                label="Calle"
                                autoFocus
                                value={userStreet}
                                onChange={handleChangeUsuario}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userNext"
                                required
                                fullWidth
                                id="userNext"
                                label="No. exterior"
                                autoFocus
                                value={userNext}
                                onChange={handleChangeUsuario}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userNint"
                                fullWidth
                                id="userNint"
                                label="No. interior"
                                autoFocus
                                value={userNint}
                                onChange={handleChangeUsuario}
                            />
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <FormControlLabel
                                required
                                disabled={aceptCdatos}
                                control={<Checkbox required value="allowExtraEmails" color="primary" />}
                                label={<InputLabel style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }} onClick={abrirConfDatos} >Confidencialidad de datos</InputLabel>}
                            />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: "#008aa7" }}
                            >
                                Registrar
                            </Button>
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="redcolor"
                                onClick={() => navigate('/login')}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    )
}