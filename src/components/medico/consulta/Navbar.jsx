import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LogoMabe from '../../../archivos/logomabe.png'

import useConsulta from '../../../hooks/useConsulta'
import useAuth from '../../../hooks/useAuth';



function ResponsiveAppBar() {

  const navigate = useNavigate()

  const {ventana, setVentana} = useAuth()

  const { datos } = useConsulta()
  const { medicoNombre, medicoPApellido, medicoSApellido, medicoTitulo, medicoCedula, medicoUniv, medicoUnidadTrabajo } = datos
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ['Título: ' + medicoTitulo, 'Cédula: ' + medicoCedula, 'Universidad: ' + medicoUniv, 'Unidad de trabajo: ' + medicoUnidadTrabajo, 'Cerrar sesión'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    if(e === 'Cerrar sesión'){
      setVentana('')
      localStorage.removeItem('tokenid')
      
      navigate('/login')
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: "#ffff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img width={100} src={LogoMabe} alt="logo mabe" />
         

          
          
          <Box  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            style={{color: "#008aa7"}}
            
          >
            {medicoNombre + " " + medicoPApellido + " " + medicoSApellido}
          </Typography>
          {ventana!=='NA'?(<Tooltip style={{ right: 0 }} title="">
                <IconButton sx={{ p: 1 }} onClick={() => {localStorage.removeItem('jsonexpmed'); navigate(ventana)}}>
                  <ArrowBackIosIcon height={40} width={40}/>
                </IconButton>

              </Tooltip>): null }
            <Tooltip title="Open settings">
              <IconButton style={{color: "#008aa7"}} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle color='inherit'/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;