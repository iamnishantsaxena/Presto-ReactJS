import React from 'react';
import LogoutButton from './LogoutButton.jsx';
import NewPresentation from '../components/Newdeck.jsx';
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
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

export function Dashboardfeatures ({
  token,
  setTokenFunction,
  decks,
  setDecks
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Pestro
            </Typography>
            {!isSmallScreen && auth && (
              <div className="state-icon">
                <NewPresentation decks={decks} setDecks={setDecks} />
                <LogoutButton token={token} setToken={setTokenFunction} />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  // keepMounted
                  // transformOrigin={{
                  //   vertical: 'top',
                  //   horizontal: 'right'
                  // }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                ></Menu>
              </div>
            )}
            {isSmallScreen && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {isSmallScreen && (
          <Drawer
            // Burger menu drawer styling
            sx={{
              width: drawerWidth,
              flexShrink: 1,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: 'rgb(109, 145, 192);',
                color: 'white'
              }
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <div>
              {/* Back button on drawer menu */}
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem>
                <NewPresentation decks={decks} setDecks={setDecks} />
              </ListItem>
              <ListItem>
                <LogoutButton token={token} setToken={setTokenFunction} />
              </ListItem>
            </List>
            <Divider />
          </Drawer>
        )}
      </Box>
    </>
  );
}

export default Dashboardfeatures;
