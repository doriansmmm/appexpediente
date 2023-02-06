import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

//importar hooks
import useConsulta from '../../../hooks/useConsulta';

export default function Diagnosticos() {

    const { diagnosticoCatalogo, setDiagnosticoSeleccionada, diagnosticoSeleccionada } = useConsulta()

    const [diagnosticoSelect, setDiagnosticoSelect] = React.useState({})

    useEffect(() => {
        if(diagnosticoSeleccionada==''){
            setDiagnosticoSelect({})
        }
    },[diagnosticoSeleccionada])
    useEffect(() => {
        
        if (diagnosticoSelect !== null && diagnosticoSelect!==undefined) {
            setDiagnosticoSeleccionada({
                diGuid: diagnosticoSelect['diGuid'],
                diNombre: diagnosticoSelect['diNombre']
            })
        }
        // eslint-disable-next-line
    }, [diagnosticoSelect])
    return (
        <Autocomplete
            id="diagnostico"
            name="diagnosticoSelect"
            value={diagnosticoSelect}
            onChange={(event, newValue) => {
                setDiagnosticoSelect(newValue);
            }}
            options={diagnosticoCatalogo}
            autoHighlight
            fullWidth
            isOptionEqualToValue={(option) => option.diNombre}
            getOptionLabel={(option) => option.diNombre !== undefined ? option.diNombre: ''}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>                   
                    {option.diNombre}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    label="Diagnostico"
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