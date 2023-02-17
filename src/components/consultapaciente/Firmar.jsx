import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import SignaturePad from 'react-signature-canvas'
import '../../styles/sigCanvas.css'

import useConsultaPaciente from '../../hooks/useConsultaPaciente'

export default function Firmar() {

    const { datos } = useConsultaPaciente()
    const { medicoFirma } = datos
    

    return (
        <div>
            
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
            
        </div>
    );
}