import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

//importar hooks
import useRegistroUsuario from '../../hooks/useRegistroUsuario';

export default function Paises() {

    const { countries, handleChangeUsuario2, limpiarPaises } = useRegistroUsuario()

    const [paisSelect, setPaisSelect] = React.useState({})

    useEffect(() => {
        if (paisSelect !== null && paisSelect!==undefined) {
            handleChangeUsuario2('coGuid', paisSelect['coGuid'])
        }else{
            limpiarPaises()
        }
        // eslint-disable-next-line
    }, [paisSelect])
    return (
        <Autocomplete
            id="pais"
            name="coGuid"
            value={paisSelect}
            onChange={(event, newValue) => {
                setPaisSelect(newValue);
            }}
            options={countries}
            autoHighlight
            fullWidth
            isOptionEqualToValue={(option) => option.coSatdesc}
            getOptionLabel={(option) => option.coSatdesc !== undefined ? option.coSatdesc: ''}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.coSatcve.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.coSatcve.toLowerCase()}.png 2x`}
                        alt=""
                    />
                    {option.coSatdesc} ({option.coSatcve}) {option.coLada}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    label="País"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}