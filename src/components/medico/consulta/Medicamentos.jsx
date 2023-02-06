import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

//importar hooks
import useConsulta from '../../../hooks/useConsulta';

export default function Alergias() {

    const { medicamentoCatalogo, handleChangeMedicamento, medicamentoSeleccionado, setMedicamentoSeleccionado } = useConsulta()
    

    const [medicamentoSelect, setMedicamentoSelect] = React.useState({})

    useEffect(() => {
        const { medGuid } = medicamentoSeleccionado
     
        if (medGuid == '') {
            setMedicamentoSelect({})
        }
    }, [medicamentoSeleccionado])
    useEffect(() => {

        if (medicamentoSelect !== null && medicamentoSelect !== undefined) {
            handleChangeMedicamento(medicamentoSelect['mNombre'] + medicamentoSelect['mPresentacion'] + medicamentoSelect['mCantidad'],medicamentoSelect['mGuid'])
            
        }
        // eslint-disable-next-line
    }, [medicamentoSelect])
    return (
        <Autocomplete
            id="alergia"

            name="medicamentoSelect"
            value={medicamentoSelect}
            onChange={(event, newValue) => {
                setMedicamentoSelect(newValue);
            }}
            options={medicamentoCatalogo}
            autoHighlight
            fullWidth
            isOptionEqualToValue={(option) => option.mNombre + option.mPresentacion + option.mCantidad}
            getOptionLabel={(option) => option.mNombre !== undefined ? option.mNombre + option.mPresentacion + option.mCantidad : ''}
            renderOption={(props, option) => (
                <Box key={option.mGuid} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.mNombre}  {option.mPresentacion}  {option.mCantidad}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    label="Medicamento"
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