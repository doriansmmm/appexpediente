import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

//importar hooks
import useConsulta from '../../../hooks/useConsulta';

export default function Alergias() {

    const { alergiasCatalogo, setAlergiaSeleccionada, alergiaSeleccionada } = useConsulta()

    const [alergiaSelect, setAlergiaSelect] = React.useState({})

    useEffect(() => {
        if(alergiaSeleccionada==''){
            setAlergiaSelect({})
        }
    },[alergiaSeleccionada])
    useEffect(() => {
        
        if (alergiaSelect !== null && alergiaSelect!==undefined) {
            setAlergiaSeleccionada({
                alGuid: alergiaSelect['alGuid'],
                alNombre: alergiaSelect['alNombre']
            })
        }
        // eslint-disable-next-line
    }, [alergiaSelect])
    return (
        <Autocomplete
            id="alergia"
            name="alergiaSelect"
            value={alergiaSelect}
            onChange={(event, newValue) => {
                setAlergiaSelect(newValue);
            }}
            options={alergiasCatalogo}
            autoHighlight
            fullWidth
            isOptionEqualToValue={(option) => option.alNombre}
            getOptionLabel={(option) => option.alNombre !== undefined ? option.alNombre: ''}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>                   
                    {option.alNombre}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    label="Alergia"
                    size='small'
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}