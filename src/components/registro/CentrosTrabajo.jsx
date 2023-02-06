import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

//importar hooks
import useRegistroUsuario from '../../hooks/useRegistroUsuario';

export default function CentrosTrabajo() {

    const { centrosTrabajo, handleChangeUsuario3 } = useRegistroUsuario()

    const [centrosSelect, setCentrosSelect] = React.useState({})

    useEffect(() => {
        if(centrosTrabajo.length===0)        
            setCentrosSelect({})  
        
        // eslint-disable-next-line
    }, [centrosTrabajo])

    useEffect(() => {
        if (centrosSelect !== null && centrosSelect!==undefined) {
            handleChangeUsuario3('userCtId', centrosSelect['ctId'])
        }
        // eslint-disable-next-line
    }, [centrosSelect])
    
    return (
        <Autocomplete
            id="userCtId"
            name="userCtId"
            value={centrosSelect}
            onChange={(event, newValue) => {
                setCentrosSelect(newValue);
            }}
            options={centrosTrabajo}
            autoHighlight
            fullWidth
            isOptionEqualToValue={(option) => option.ctDesc}
            getOptionLabel={(option) => option.ctDesc !== undefined ? option.ctDesc: ''}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.ctDesc}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    label="Centro de trabajo"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}