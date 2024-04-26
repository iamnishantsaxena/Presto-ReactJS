import React from 'react';
import LogoutButton from './logoutButton.jsx';
import Newdeck from '../components/Newdeck.jsx';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const drawerWidth = 240;

export function Dashboardfeatures ({
  token,
  setTokenFunction,
  decks,
  setDecks
}) {
  const theme = useTheme();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  console.log(setAuth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Pestro
            </Typography>
            {auth && (
              <div className="state-icon">
                <Newdeck decks={decks} setDecks={setDecks} />
                <LogoutButton token={token} setToken={setTokenFunction} />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                ></Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          // Burger menu drawer styling
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'rgb(109, 145, 192);',
              color: 'white'
            }
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <div>
            {/* Back button on drawer menu */}
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr'
                ? (
                <ChevronLeftIcon />
                  )
                : (
                <ChevronRightIcon />
                  )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Edit', 'Save', 'Delete'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0
                      ? (
                      <EditIcon />
                        )
                      : index === 1
                        ? (
                      <SaveIcon />
                          )
                        : (
                      <DeleteIcon />
                          )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      </Box>
    </>
  );
}

export default Dashboardfeatures;
