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
    Select,
    FormControl,
    Button,
    MenuItem
} from '@mui/material'
import validator from 'validator'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'
import { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IMaskInput } from 'react-imask';

//importar hooks
import useUser from '../../hooks/useUser';

//importar componentes
import DatosMedico from './DatosMedico';
//importar archivos


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

    const { datosUsuario, roles, handleChangeRol, updateRol, setLoadTime } = useUser()
    const {
        userNombre,
        userPApellido,
        userSApellido,
        userEmail,
        userPhone,
        userGenderId,
        userAge,
        userStreet,
        userNext,
        userNint,
        userRolId
    } = datosUsuario

    const handleSubmit = () => {
        //e.preventDefault()
        setLoadTime(true)
        updateRol()
    }

    return (
        <ThemeProvider theme={theme}>

            <Container component="main">
                <div>

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
                    <Typography component="h1" variant="h4">
                        Información del usuario
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userNombre"
                                disabled
                                fullWidth
                                id="userNombre"
                                label="Nombre"
                                autoFocus
                                value={userNombre}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="userPApellido"
                                label="Primer apellido"
                                name="userPApellido"
                                autoComplete="family-name"
                                value={userPApellido}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="userSApellido"
                                label="Segundo apellido"
                                name="userSApellido"
                                autoComplete="family-name"
                                disabled
                                value={userSApellido}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="userEmail"
                                label="Correo"
                                name="userEmail"
                                autoComplete="email"
                                value={userEmail}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="userPhone"
                                label="Teléfono"
                                name="userPhone"
                                value={userPhone}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <InputLabel >Sexo</InputLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue=""
                                name="radio-buttons-group"
                                row
                                disabled
                                value={userGenderId}
                            >
                                <FormControlLabel disabled name="userGenderId" value="2" control={<Radio />} label="Femenino" />
                                <FormControlLabel disabled name="userGenderId" value="1" control={<Radio />} label="Masculino" />
                            </RadioGroup>
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
                                id="userAge"
                                label="Edad"
                                name="userAge"
                                type="number"
                                value={userAge}
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                }}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userStreet"
                                disabled
                                fullWidth
                                id="userStreet"
                                label="Calle"
                                autoFocus
                                value={userStreet}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userNext"
                                disabled
                                fullWidth
                                id="userNext"
                                label="No. exterior"
                                autoFocus
                                value={userNext}
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
                                disabled
                                value={userNint}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="userRolId">Rol</InputLabel>
                                <Select                                    
                                    id="userRolId"
                                    label="Rol"
                                    name='userRolId'
                                    value={userRolId}
                                    onChange={handleChangeRol}
                                >
                                    {
                                       roles.map(e => (
                                            <MenuItem key={e.rolGuid} name='userRolId' value={e.rolId}>{e.rolDesc}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            userRolId === 2 ? (<><Grid item lg={4} sm={6} xs={12}></Grid>
                            <DatosMedico /></>) : <Grid item lg={4} sm={6} xs={12}></Grid>
                        }
                        

                        <Grid item lg={6} sm={6} xs={12}>
                            <Button
                               // type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: "#008aa7" }}      
                                onClick={handleSubmit} 
                            >
                                Actualizar
                            </Button>
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="redcolor"
                                onClick={() => navigate('/admin')}
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