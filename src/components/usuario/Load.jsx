import * as React from 'react';
import {
    Backdrop,
    CircularProgress
} from '@mui/material/';

import useUser from '../../hooks/useUser';

export default function Load() {
  
    const { loadTime } = useUser()

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