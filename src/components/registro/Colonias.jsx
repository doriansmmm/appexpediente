import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

//importar hooks
import useRegistroUsuario from '../../hooks/useRegistroUsuario';

export default function Colonias() {

    const { cps, handleChangeUsuario3 } = useRegistroUsuario()

    const [coloniaSelect, setColoniaSelect] = React.useState({})

    useEffect(() => {
        if(cps.length===0)        
            setColoniaSelect({})  
        
        // eslint-disable-next-line
    }, [cps])

    useEffect(() => {
        if (coloniaSelect !== null && coloniaSelect!==undefined) {
            handleChangeUsuario3('userCpId', coloniaSelect['cpId'])
        }
        // eslint-disable-next-line
    }, [coloniaSelect])
    
    return (
        <Autocomplete
            id="userCpId"
            name="userCpId"
            value={coloniaSelect}
            onChange={(event, newValue) => {
                setColoniaSelect(newValue);
            }}
            options={cps}
            autoHighlight
            fullWidth
            isOptionEqualToValue={(option) => option.cpColonia}
            getOptionLabel={(option) => option.cpColonia !== undefined ? option.cpColonia: ''}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.cpColonia}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    label="Colonia"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}