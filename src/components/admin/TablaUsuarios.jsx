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

import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';

const TablaUsuarios = () => {
    const navigate = useNavigate()

    const { } = useAuth()

    const { usuariosFiltro, roles } = useAdmin()
    const columns = [
        { id: 'Nombre', label: 'Nombre' },
        { id: 'PrimerApellido', label: 'Primer apellido' },
        { id: 'SegundoApellido', label: 'Segundo apellido' },
        { id: 'Correo', label: 'Correo' },
        { id: 'Rol', label: 'Rol' },
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
        localStorage.setItem('jsondatosuser', JSON.stringify(e))
        navigate('/usuario')
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
                        {usuariosFiltro
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        key={row.userGuid}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row['userNombre']}</TableCell>
                                        <TableCell align="center">{row['userPApellido']}</TableCell>
                                        <TableCell align="center">{row['userSApellido']}</TableCell>
                                        <TableCell align="center">{row['userEmail']}</TableCell>
                                        <TableCell align="center">{row['rolName']}</TableCell>
                                        <TableCell align="center"><Button onClick={() => getConsulta(row)}>Ver detalles</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={usuariosFiltro.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TablaUsuarios