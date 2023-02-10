import {
    Box,
    Typography,
    Grid,
    TextField,
    Button
} from '@mui/material';
import { useEffect } from 'react';

import useUser from '../../hooks/useUser'

const DatosMedico = () => {
    const { datosUsuario, handleChangeRol, setBandArchivos } = useUser()
    const { medCedula, medLogo, medTitulo, medUniversidad } = datosUsuario

   
    return (
        <>
            <Grid item lg={12} sm={12} xs={12}>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Datos del médico
                    </Typography>
                </Box>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <TextField
                    autoComplete="given-name"
                    name="medUniversidad"
                    fullWidth
                    id="medUniversidad"
                    label="Universidad"
                    autoFocus
                    value={medUniversidad}
                    onChange={handleChangeRol}
                />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <TextField
                    autoComplete="given-name"
                    name="medCedula"
                    fullWidth
                    id="medCedula"
                    label="Cédula"
                    autoFocus
                    value={medCedula}
                    onChange={handleChangeRol}
                />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <TextField
                    autoComplete="given-name"
                    name="medTitulo"
                    fullWidth
                    id="medTitulo"
                    label="Título"
                    autoFocus
                    value={medTitulo}
                    onChange={handleChangeRol}
                />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                    <Button
                        style={{
                            backgroundColor: "#003087"
                        }}
                        variant="contained"
                        onClick={() => setBandArchivos(true)}
                    >
                        Imagen institución
                    </Button>
                </Grid>
            <Grid item lg={12} sm={12} xs={12}>
                <img width='100px' alt='Logo universidad' src={medLogo} />
            </Grid>
        </>
    )
}

export default DatosMedico