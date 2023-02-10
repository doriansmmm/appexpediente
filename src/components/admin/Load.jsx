import * as React from 'react';
import {
    Backdrop,
    CircularProgress
} from '@mui/material/';

import useAdmin from '../../hooks/useAdmin';

export default function Load() {
  
    const { loadTime } = useAdmin()

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