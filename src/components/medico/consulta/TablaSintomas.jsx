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

const TablaSintomas = () => {
    const navigate = useNavigate()



    const { datos, setBandSintomas, setDatos, setError } = useConsulta()
    const { sintomas } = datos

    const [sintomaText, setSintomaText] = useState('')

    const handleChange = e => {
        setSintomaText(e.target.value)
    }

    const handleDelete = n => {

        const filterSintomas = sintomas.filter((e) => e.id !== n)

        const datos2 = {
            ...datos,
            sintomas: filterSintomas
        }
        localStorage.setItem('jsonexpmed', JSON.stringify(datos2))

        setDatos({
            ...datos,
            sintomas: filterSintomas
        })
    }
    const columns = [
        { id: 'sintoma', label: 'Sintoma' },
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
            if (sintomaText !== '') {
                setDatos({
                    ...datos,
                    sintomas: [
                        ...sintomas,
                        {
                            id: uuidv4(),
                            sintomanombre: sintomaText
                        }
                    ]
                })
                const datos2 = {
                    ...datos,
                    sintomas: [
                        ...sintomas,
                        {
                            id: uuidv4(),
                            sintomanombre: sintomaText
                        }
                    ]
                }
                localStorage.setItem('jsonexpmed', JSON.stringify(datos2))
                setSintomaText('')
                setBandSintomas(false);
            } else {

                setError({ band: true, texto: 'Debes ingresar el síntoma' })
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
                    <Grid style={{ height: '40px', marginLeft: 10 }} item lg={2} sm={2} xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="sintomaText"
                            fullWidth
                            multiline
                            id="sintomaText"
                            label="Síntoma"
                            autoFocus
                            margin='none'
                            size='small'
                            value={sintomaText}
                            onChange={handleChange}
                            inputProps={{
                                style: {
                                    height: "20px",
                                },
                            }}
                            required
                        />
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
                        {sintomas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        key={row['id']}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key="sintoma" align="center">{row['sintomanombre']}</TableCell>
                                        <TableCell key="eliminar" align="center"><Button onClick={() => handleDelete(row['id'])}>Quitar</Button></TableCell>
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