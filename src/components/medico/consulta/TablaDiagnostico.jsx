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

import { useNavigate } from 'react-router-dom';

import useConsulta from '../../../hooks/useConsulta';

import Diagnosticos from './Diagnosticos'

const TablaDiagnostico = () => {
    const navigate = useNavigate()



    const { datos, setBandSintomas, setDatos, setError, diagnosticoSeleccionada, setDiagnosticoSeleccionada } = useConsulta()
    const { diagnosticos } = datos


    const handleDelete = n => {

        const filterAlergia = diagnosticos.filter((e) => e.diGuid !== n)
        const datos2 = {
            ...datos,
            diagnosticos: filterAlergia
        }
        localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
        setDatos({
            ...datos,
            diagnosticos: filterAlergia
        })
    }
    const columns = [
        { id: 'Diagnostico', label: 'Diagnostico' },
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
            const { diGuid } = diagnosticoSeleccionada
            if (diGuid !== '' && diGuid !== undefined) {
                setDatos({
                    ...datos,
                    diagnosticos: [
                        ...diagnosticos,
                        diagnosticoSeleccionada
                    ]
                })
                const datos2 = {
                    ...datos,
                    diagnosticos: [
                        ...diagnosticos,
                        diagnosticoSeleccionada
                    ]
                }
                localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
                setDiagnosticoSeleccionada('')
                setBandSintomas(false);
            } else {

                setError({ band: true, texto: 'Debes seleccionar el diagnostico' })
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
                        <Diagnosticos />
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
                        {diagnosticos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        key={row['id']}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key="Diagnostico" align="center">{row['diNombre']}</TableCell>
                                        <TableCell key="eliminar" align="center"><Button onClick={() => handleDelete(row['diGuid'])}>Quitar</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    )
}

export default TablaDiagnostico