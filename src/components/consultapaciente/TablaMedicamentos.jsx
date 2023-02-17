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

import useConsultaPaciente from '../../hooks/useConsultaPaciente';

const TablaMedicamentos = () => {

    const { datos } = useConsultaPaciente()
    
    const { medicamentos } = datos

    const columns = [
        { id: 'Medicamento', label: 'Medicamento' },
        { id: 'Cantidad', label: 'Cantida de dosis' },
        { id: 'Tiempo', label: 'Periodo de dosis' },
        { id: 'Indicaciones', label: 'Indicaciones' }
    ];
    // eslint-disable-next-line

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
                                        <TableCell key="sintoma" align="center">{row['mNombre']}</TableCell>
                                        <TableCell key="Cantidad" align="center">{row['reMedCantidadDosis']}</TableCell>
                                        <TableCell key="Tiempo" align="center">{row['reMedTiempoDosis']}</TableCell>
                                        <TableCell key="Indicaciones" align="center">{row['reMedIndicacionA']}</TableCell>                                        
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