import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
      <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src="/img/logo.jpg"
            alt="logo"
            sx={{ width: 45, height: 45, ml: 2, borderRadius: '50%', boxShadow: 1 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2, fontWeight: 'bold' }}>
            Wealthy
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} sx={{ width: 250 }}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Меню
          </Typography>
          <Divider />
        </Box>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: '#033540' }} primary="Главная" />
          </ListItem>
          <ListItem button component={Link} to="/mortgage" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <CalculateIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: '#033540' }} primary="Рассчитать ипотеку" />
          </ListItem>
          <ListItem button component={Link} to="/converter" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: '#033540' }} primary="Курс валют" />
          </ListItem>
          <ListItem button component={Link} to="/trecker" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: '#033540' }} primary="Трекер финансов" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
