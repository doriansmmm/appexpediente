import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from 'react';

import useHistorialMedico from '../../../hooks/useHistorialMedico';

const Alert = React.forwardRef(function Alert(props, ref) {
    
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alerta() {
    const { error, setError } = useHistorialMedico()
    const { band, texto } = error


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError({band: false, texto: ''});
  };

  

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={band} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {texto}
        </Alert>
      </Snackbar>
    </Stack>
  );
}