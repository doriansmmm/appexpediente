//importar librerias
import { useState, useEffect } from 'react';
import { Table, Button, Tooltip } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TablePagination from '@mui/material/TablePagination';

import { useNavigate } from 'react-router-dom';

import useHistorialMedico from '../../../hooks/useHistorialMedico';
import useAuth from '../../../hooks/useAuth';

const TablaHistorial = () => {
    const navigate = useNavigate()

    const { setGuidCita, setVentana } = useAuth()

    const { citasUsuario, consultarReceta } = useHistorialMedico()
    const columns = [
        { id: 'fecha', label: 'Fecha' },
        { id: 'tipoCita', label: 'Tipo cita' },
        { id: 'Paciente', label: 'Paciente' },
        { id: 'Estatus', label: 'Estatus' },
        { id: 'centroTrabajo', label: 'Centro de trabajo' },
        { id: 'Receta', label: 'Receta' },
        { id: 'detalles', label: 'Detalles' }
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

    const getConsulta = (e) => {
        localStorage.setItem('idcita', e)
        setGuidCita(e)
        navigate('/consulta')
    }
    const getDetalles = (e) => {
        localStorage.setItem('idCitaMabe', e)
        setVentana('/medico')
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
                                        key={row['id']}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key="fecha" align="center">{row['fecha']}</TableCell>
                                        <TableCell key="tipoCita" align="center">{row['tipoCita']}</TableCell>
                                        <TableCell key="Paciente" align="center">{row['paciente']}</TableCell>
                                        <TableCell key="Estatus" align="center">{row['stage']}</TableCell>
                                        <TableCell key="centroTrabajo" align="center">{row['centroT']}</TableCell>
                                        <TableCell key="Acciones" align="center">{row['stage'].toLowerCase() === "finalizada" ? (<Tooltip title="Ver receta"><AssignmentIcon onClick={() => consultarReceta(row['cGuid'])} style={{ cursor: 'pointer', margin: "5px", color: "#CF2908" }}/></Tooltip>):null}</TableCell>
                                        <TableCell align="center">{row['cCsId'] === 2 || row['cCsId'] === 3 ? (<Button onClick={() => getConsulta(row['cGuid'])}>Ver mas</Button>): row['cCsId'] === 5 ? (<Button onClick={() => getDetalles(row['cGuid'])}>Ver mas</Button>):null
                                        }</TableCell>
                                            
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