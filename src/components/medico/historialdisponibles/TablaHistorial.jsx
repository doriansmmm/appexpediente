//importar librerias
import { useState } from 'react';
import { Table, Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import useHistorialCitasDisponibles from '../../../hooks/useHistorialCitasDisponibles';

const TablaHistorial = () => {

    const { citasUsuario, asignarCita } = useHistorialCitasDisponibles()
    const columns = [
        { id: 'fecha', label: 'Fecha' },
        { id: 'tipoCita', label: 'Tipo cita' },
        { id: 'Paciente', label: 'Paciente' },
        { id: 'centroTrabajo', label: 'Centro de trabajo' },
        { id: 'Estatus', label: 'Estatus' },
        { id: 'detalles', label: 'Acción' }
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
    return (
        <Paper>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align='center'
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {citasUsuario
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        key={row['id']}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key={row['id']} align="center">{row['fecha']}</TableCell>
                                        <TableCell key={row['id']} align="center">{row['tipoCita']}</TableCell>
                                        <TableCell key={row['id']} align="center">{row['paciente']}</TableCell>
                                        <TableCell key={row['id']} align="center">{row['centroT']}</TableCell>
                                        <TableCell key={row['id']} align="center">{row['stage']}</TableCell>
                                        <TableCell align="center"><Button onClick={() => asignarCita(row['cGuid'])}>Asignar</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={citasUsuario.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TablaHistorial