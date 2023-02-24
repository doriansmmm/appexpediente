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
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

import useHistorial from '../../../hooks/useHistorial';
import useAuth from '../../../hooks/useAuth';

const TablaHistorial = () => {
    const navigate = useNavigate()

    const { citasUsuario, cancelarCita, confirmarCita } = useHistorial()
    const { setVentana } = useAuth()
    const columns = [
        { id: 'fecha', label: 'Fecha' },
        { id: 'tipoCita', label: 'Tipo cita' },
        { id: 'centroTrabajo', label: 'Centro de trabajo' },
        { id: 'Estatus', label: 'Estatus' },
        { id: 'Confirmacion', label: 'Confirmación' },
        { id: 'detalles', label: 'Detalles' },
        { id: 'Acciones', label: 'Acciones' }
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

    const navegar = e => {
        localStorage.setItem('idCitaMabe', e.cGuid)
        setVentana('/historialcitas')
        navigate('/consultapaciente')
    }
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
                                        key={row['cGuid']}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row['fecha']}</TableCell>
                                        <TableCell align="center">{row['tipoCita']}</TableCell>
                                        <TableCell align="center">{row['centroT']}</TableCell>
                                        <TableCell align="center">{row['stage']}</TableCell>
                                        <TableCell align="center">{row['asistencia']}</TableCell>
                                        {row.cCsId === 5 ? (<TableCell align="center"><Button onClick={() => navegar(row)}>Ver mas</Button></TableCell>) : null}
                                        {
                                            row.asistencia !== 'Confirmada' ? (
                                                <TableCell align="center">{row['cCsId'] !== 4 && row['cCsId'] !== 5 ? (
                                                    <><Tooltip title="Confirmar cita">
                                                        <CheckCircleIcon onClick={() => confirmarCita(row['cGuid'])} style={{ cursor: 'pointer', margin: "5px", color: "#36B04B" }} />
                                                    </Tooltip>
                                                        <Tooltip title="Cancelar cita">
                                                            <CancelIcon onClick={() => cancelarCita(row['cGuid'])} style={{ cursor: 'pointer', margin: "5px", color: "#CF2908" }} />
                                                        </Tooltip></>
                                                ) : null}</TableCell>) : null
                                        }
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