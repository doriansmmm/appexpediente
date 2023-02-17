import * as React from 'react';
import {
    Backdrop,
    CircularProgress
} from '@mui/material/';

import useConsultaPaciente from '../../hooks/useConsultaPaciente';

export default function Load() {
  
    const { loadTime } = useConsultaPaciente()

  return (
    <div>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadTime}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}