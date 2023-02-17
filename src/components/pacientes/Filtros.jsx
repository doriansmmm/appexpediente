import {
    Grid,
    TextField
} from '@mui/material'

import usePacientes from '../../hooks/usePacientes'

const Filtros = () => {

    const { handleChange, datosFiltros } = usePacientes()
    const { userNombre, userPApellido, userSApellido, userEmail, userRolDesc } = datosFiltros

    return (
        <>
            <Grid item lg={4} sm={6} xs={12}>
                <TextField
                    name="userNombre"                    
                    fullWidth
                    id="userNombre"
                    label="Nombre"
                    autoFocus
                    value={userNombre}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <TextField                    
                    fullWidth
                    id="userPApellido"
                    label="Primer apellido"
                    name="userPApellido"
                    value={userPApellido}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <TextField
                    fullWidth
                    id="userSApellido"
                    label="Segundo apellido"
                    name="userSApellido"
                    value={userSApellido}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <TextField                    
                    fullWidth
                    id="userEmail"
                    label="Email"
                    name="userEmail"
                    value={userEmail}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <TextField                    
                    fullWidth
                    id="userRolDesc"
                    label="Rol"
                    name="userRolDesc"
                    value={userRolDesc}
                    onChange={handleChange}
                />
            </Grid>
        </>
    )
}

export default Filtros