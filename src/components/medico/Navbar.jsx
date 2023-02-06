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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import LogoMabe from '../../archivos/logomabe.png'

import useAuth from '../../hooks/useAuth';

const settings = ['Cerrar sesión'];

function ResponsiveAppBar() {

  const navigate = useNavigate()

  const { datosUsuario, ventana, setVentana } = useAuth()
  const { nombre } = datosUsuario

 

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
      localStorage.removeItem('tokenid')
      setVentana('')
      navigate('/login')
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: "#ffff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img width={100} src={LogoMabe} alt="logo mabe" />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

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
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              style={{color: "#008aa7"}}
            >
              {nombre}
            </Typography>
            {ventana!=='NA'?(<Tooltip style={{ right: 0 }} title="">
                <IconButton sx={{ p: 1 }} onClick={() => { localStorage.removeItem('jsonexpmed'); navigate(ventana)}}>
                  <ArrowBackIosIcon height={40} width={40}/>
                </IconButton>

              </Tooltip>): null }
              <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle color='inherit' />
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