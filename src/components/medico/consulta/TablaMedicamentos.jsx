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

const TablaMedicamentos = () => {

    const { datos, medicamentoSeleccionado, setBandSintomas, setDatos, setError, setMedicamentoSeleccionado, setAlergiaSeleccionada } = useConsulta()
    const { medGuid, nombreMedicamento, cantidadDosis, tiempoDosis, indicacionesA } = medicamentoSeleccionado
    const { medicamentos } = datos


    const handleDelete = n => {

        const filterMedicamentos = medicamentos.filter((e) => e.medGuid !== n)

        const datos2 = {
            ...datos,
            medicamentos: filterMedicamentos
        }
        localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
        setDatos({
            ...datos,
            medicamentos: filterMedicamentos
        })
    }
    const columns = [
        { id: 'Medicamento', label: 'Medicamento' },
        { id: 'Cantidad', label: 'Cantida de dosis' },
        { id: 'Tiempo', label: 'Periodo de dosis' },
        { id: 'Indicaciones', label: 'Indicaciones' },
        { id: 'eliminar', label: '', Width: 150 },
    ];
    // eslint-disable-next-line

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleClickOpen = async () => {
        try {
            if (medGuid !== '' && medGuid !== undefined) {
                if (cantidadDosis !== '' && cantidadDosis !== undefined) {
                    if (tiempoDosis !== '' && tiempoDosis !== undefined) {
                        if (indicacionesA !== '' && indicacionesA !== undefined) {
                            setDatos({
                                ...datos,
                                medicamentos: [
                                    ...medicamentos,
                                    medicamentoSeleccionado
                                ]
                            })
                            const datos2 = {
                                ...datos,
                                medicamentos: [
                                    ...medicamentos,
                                    medicamentoSeleccionado
                                ]
                            }
                            localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
                            setMedicamentoSeleccionado({
                                nombreMedicamento: '',
                                medGuid: '',
                                cantidadDosis: '',
                                tiempoDosis: '',
                                indicacionesA: ''
                            })
                            setBandSintomas(false);
                        } else {

                            setError({ band: true, texto: 'Debes ingresar las indicaciones' })
                        }
                    }
                    else {

                        setError({ band: true, texto: 'Debes ingresar el tiempo' })
                    }
                } else {

                    setError({ band: true, texto: 'Debes ingresar la cantidad' })
                }
            } else {

                setError({ band: true, texto: 'Debes seleccionar el medicamento' })
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
                        {medicamentos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        key={row['id']}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key="sintoma" align="center">{row['nombreMedicamento']}</TableCell>
                                        <TableCell key="Cantidad" align="center">{row['cantidadDosis']}</TableCell>
                                        <TableCell key="Tiempo" align="center">{row['tiempoDosis']}</TableCell>
                                        <TableCell key="Indicaciones" align="center">{row['indicacionesA']}</TableCell>
                                        <TableCell key="eliminar" align="center"><Button onClick={() => handleDelete(row['medGuid'])}>Quitar</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    )
}

export default TablaMedicamentos