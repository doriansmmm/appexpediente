import * as React from 'react';
import {
    Backdrop,
    CircularProgress
} from '@mui/material/';

import usePacientes from '../../hooks/usePacientes';

export default function Load() {
  
    const { loadTime } = usePacientes()

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