import { useEffect } from "react"

import {
    FormGroup,
    Grid,
    Switch,
    FormControlLabel,
    CssBaseline,
    Box,
    Typography,
    Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PDFViewer } from '@react-pdf/renderer'

import Navbar from "../Navbar"
import RecetaPDF from "./RecetaPDF"

import useAuth from "../../../hooks/useAuth"

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
        redcolor: createColor('#ba000d')
    }
});

const Receta = () => {

    const { setVentana, setBandFirma, bandFirma } = useAuth()

    useEffect(() => {
        setVentana('/medico')
    }, [])

    return (
        <>
            <Navbar />
            <ThemeProvider theme={theme}>

                <Container component="main">
                    <CssBaseline />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 5,
                    }}>
                        <Grid container spacing={2}>


                            <Grid item lg={12} sm={6} xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch defaultValue={bandFirma} onChange={() => setBandFirma(!bandFirma)} />} label={bandFirma !== true ? 'Incluir firma' : 'No incluir firma'} />
                                </FormGroup>
                            </Grid>

                        </Grid>

                    </Box>

                </Container>

            </ThemeProvider>
            <PDFViewer>
                <RecetaPDF />
            </PDFViewer>
        </>
    )
}

export default Receta