import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

//importar hooks
import useRegistroUsuario from '../../hooks/useRegistroUsuario';

export default function Estados() {

    const { states, handleChangeUsuario2, limpiarEstados } = useRegistroUsuario()

    const [estadoSelect, setEstadoSelect] = React.useState({})
    useEffect(() => {
        if(states.length!==0)        
            setEstadoSelect(states[0])  
        else
            setEstadoSelect('')  
        // eslint-disable-next-line
    }, [states])
    useEffect(() => {
        if (estadoSelect !== null && estadoSelect !== undefined) {
            handleChangeUsuario2('stateGuid', estadoSelect['stateGuid'])
        }else{
            limpiarEstados()
        }
        // eslint-disable-next-line
    }, [estadoSelect])
    return (
        <Autocomplete
            id="estado"
            name="stateGuid"
            value={estadoSelect}
            onChange={(event, newValue) => {
                setEstadoSelect(newValue);
            }}
            options={states}
            autoHighlight
            fullWidth
            isOptionEqualToValue={(option) => option.stateDesc}
            getOptionLabel={(option) => option.stateDesc !== undefined ? option.stateDesc: ''}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>             
                    {option.stateDesc}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    label="Estados"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}