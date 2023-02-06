import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import SignaturePad from 'react-signature-canvas'
import '../../../styles/sigCanvas.css'

import useConsulta from '../../../hooks/useConsulta'

export default function Firmar() {

    const { datos, setDatos } = useConsulta()
    const { medicoFirma } = datos
    const sigCanvas = useRef({})

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancelar = () => {
        setOpen(false);
    };
    const handleLimpiar = () => sigCanvas.current.clear()
    const handleAceptar = () => {
        const datos2 = {
            ...datos,
            medicoFirma: sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        }
        
        localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
        setDatos({
            ...datos,
            medicoFirma: sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        }
        );
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Firma
            </Button>
            <br/>
            <br/>
            <img 
            src={medicoFirma}
            alt="Firma del médico"
            style={{
                
                margin: "0 auto",
                border: "1px solid black",
                width: "250px"
            }}
             />
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Firma del médico"}
                </DialogTitle>
                <DialogContent>
                    <SignaturePad
                        ref={sigCanvas}
                        canvasProps={{
                            className: "signatureCanvas"
                        }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelar}>Cancelar</Button>
                    <Button onClick={handleLimpiar} autoFocus>
                        Limpiar
                    </Button>
                    <Button variant="contained" style={{ backgroundColor: "#008aa7" }} onClick={handleAceptar} autoFocus>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}