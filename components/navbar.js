import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const pages = ['About Me', 'My Blog', 'Resume'];


function Navbar() {

  return (
    <AppBar position="static" className={utilStyles.background}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsEsportsIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Brandon's Blog 
          </Typography>

    
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>

            <Link href="/" style={{textDecoration: 'none'}} passHref>
              <Button sx = {{my: 2, color: 'white', display: 'block'}}>
                Home
              </Button>
            </Link>
            
            <Link href="/aboutme" style={{textDecoration: 'none'}} passHref>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About Me
              </Button>
              </Link>
            <Link href="/posts/page/1" style={{textDecoration: 'none'}} passHref>
            <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                My Blog
              </Button>    
            </Link>
            
    
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;