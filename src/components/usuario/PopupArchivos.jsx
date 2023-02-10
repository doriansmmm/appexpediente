import * as React from 'react';
import {
    Button,
    TextField,
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


import useUser from '../../hooks/useUser';

import Archivoss from './Archivoss';

export default function PopupArchivos() {

    const { bandArchivos, setBandArchivos, subirArchivos, archivos } = useUser()

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        subirArchivos(null)
        setBandArchivos(false);
        
    };
    const insertar = async () => {
        console.log(archivos);
        const f = new FormData()
        if (archivos !== null) {
            for (let i = 0; i < archivos.length; i++) {
                f.append("files", archivos[i])
            }
        }
        setBandArchivos(false);
        console.log(f);
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={bandArchivos}
                //onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {""}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item lg={12} sm={12} xs={12}>
                                {
                                 <Archivoss />
                                }
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={insertar}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}