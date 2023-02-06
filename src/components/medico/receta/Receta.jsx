import { useEffect, useState, useRef } from "react"

import {
    FormGroup,
    Grid,
    Switch,
    FormControlLabel,
    CssBaseline,
    Box,
    Button,
    Container
} from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PDFViewer } from '@react-pdf/renderer'

import Navbar from "../Navbar"
import RecetaPDF from "./RecetaPDF"
import RecetaPDF2 from "./RecetaPDF2"

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
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'receta'        
    });

    const { setVentana, setBandFirma, bandFirma, datosConsulta } = useAuth()

    let json = localStorage.getItem('jsonexpmed')
    const json2 = JSON.parse(json)

    const { medicoNombre, medicoPApellido, medicoSApellido } = datosConsulta
    const [textAlergias, setTextAlergias] = useState('')
    const [textIdx, setTextIdx] = useState('')
    useEffect(() => {
        if(json2!==null){
        var text = ''
        var text2 = ''
        json2.alergias.forEach(e => {
            text += e.alNombre
        });
        json2.diagnosticos.forEach(e => {
            text2 += e.diNombre
        });
        setTextAlergias(text)
        setTextIdx(text2)
    }
    }, [])

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

                            <Grid item lg={1} sm={2} xs={12}>
                                <Button variant="contained" style={{ backgroundColor: "#008aa7" }} onClick={handlePrint}>Imprimir</Button>
                            </Grid>
                            <Grid style={{ height: '40px', marginLeft: 10 }} item lg={4} sm={4} xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch defaultValue={bandFirma} onChange={() => setBandFirma(!bandFirma)} />} label={bandFirma !== true ? 'Incluir firma' : 'No incluir firma'} />
                                </FormGroup>
                            </Grid>

                            <Grid sx={{ marginTop: 2, marginLeft: 2 }} container style={{ height: '60px' }}>
                            </Grid>
                        </Grid>

                    </Box>

                </Container>

            </ThemeProvider>
            {json2!==null ?(
            <div ref={componentRef}>
                <RecetaPDF2 />
            </div>
    ): null
}

        </>
    )
}

export default Receta