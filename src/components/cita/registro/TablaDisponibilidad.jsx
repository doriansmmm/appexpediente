import * as React from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material/';

import useCita from '../../../hooks/useCita';



export default function TablaDisponibilidad() {

    
    const { horariosApi, datos, handleChangeDatos2 } = useCita()
    const { horarioSelect } = datos

  return (
    
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Horario</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {horariosApi.map((row) => (
            <TableRow
              key={row.horario}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.horario}
              </TableCell>
              <TableCell align="right"><Button name="horarioSelect" variant={horarioSelect === row.horario ? "contained": "text"} color={horarioSelect === row.horario ? "success": "inherit"} onClick={() => handleChangeDatos2('horarioSelect', row.horario)}>{horarioSelect === row.horario ? "Seleccionado": "Seleccionar"}</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
