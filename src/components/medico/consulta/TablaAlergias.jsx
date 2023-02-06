//importar librerias
import { useState } from 'react';
import { Table, Button, TextField, Grid } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { v4 as uuidv4 } from 'uuid';

import useConsulta from '../../../hooks/useConsulta';

import Alergias from './Alergias'

const TablaSintomas = () => {

    const { datos, setBandSintomas, setDatos, setError, alergiaSeleccionada, setAlergiaSeleccionada } = useConsulta()
    const { alergias } = datos


    const handleDelete = n => {

        const filterAlergia = alergias.filter((e) => e.alGuid !== n)
        const datos2 = {
            ...datos,
            alergias: filterAlergia
        }
        localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
        setDatos({
            ...datos,
            alergias: filterAlergia
        })
    }
    const columns = [
        { id: 'Alergia', label: 'Alergia' },
        { id: 'eliminar', label: '', Width: 150 },
    ];
    // eslint-disable-next-line

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClickOpen = async () => {
        try {
            const { alGuid } = alergiaSeleccionada
            if (alGuid !== '' && alGuid !== undefined) {
                setDatos({
                    ...datos,
                    alergias: [
                        ...alergias,
                        alergiaSeleccionada
                    ]
                });
                const datos2 = {
                    ...datos,
                    alergias: [
                        ...alergias,
                        alergiaSeleccionada
                    ]
                }
                localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
                setAlergiaSeleccionada('')
                setBandSintomas(false);
            } else {

                setError({ band: true, texto: 'Debes seleccionar la alergia' })
            }


        } catch (e) {
            setBandSintomas(false);
            setError({ band: false, texto: '' })

        }
    };


    return (
        <Paper>
            <TableContainer >
                <Grid sx={{ marginTop: 2, marginLeft: 2 }} container style={{ height: '60px' }}>
                    <Grid item lg={1} sm={2} xs={12}>
                        <Button variant="contained" style={{ backgroundColor: "#008aa7" }} onClick={handleClickOpen}>Agregar</Button>
                    </Grid>

                    <Grid style={{ height: '40px', marginLeft: 10 }} item lg={4} sm={4} xs={12}>
                        <Alergias />
                    </Grid>
                </Grid>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align='center'
                                    style={{ width: column.Width }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alergias
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        key={row['id']}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key="sintoma" align="center">{row['alNombre']}</TableCell>
                                        <TableCell key="eliminar" align="center"><Button onClick={() => handleDelete(row['alGuid'])}>Quitar</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    )
}

export default TablaSintomas