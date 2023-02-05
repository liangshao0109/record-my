import './Header.css';
import { useState } from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';

function Header() {
    const SignInButton = () => (
        <ThemeProvider theme={theme}>
            <Button variant="outlined" color="white" onClick={signInWithGoogle}>
                <LoginIcon />
                Sign in
            </Button>
        </ThemeProvider>
    );

    const SignOutButton = (user) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <div className='profile'>

                    <Tooltip title="Account settings">
                        <ThemeProvider theme={theme}>
                            <IconButton color="white">
                                <AccountCircleTwoToneIcon onClick={handleClick} />
                            </IconButton>
                        </ThemeProvider>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                backgroundColor: "#8ecccc",
                                mt: 1.5,
                                color: "#50717b",
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    backgroundColor: "#50717b"
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: '#8ecccc',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            Hi, {user.user.displayName}
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <AssignmentIndTwoToneIcon /> 
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PostAddTwoToneIcon /> 
                            </ListItemIcon>
                            Create Record
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={signOut}>
                            <ListItemIcon>
                                <Logout/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        )
    };

    const AuthButton = () => {
        const [user] = useAuthState();
        return user ? <SignOutButton user={user} /> : <SignInButton />;
    };

    const activation = ({ isActive }) => isActive ? 'active' : 'inactive';

    const theme = createTheme({
        palette: {
            white: {
                main: '#fff',
            },
        },
    });

    return (
        <div className="header-banner">
            <div className='logo'>
                <AppRegistrationIcon />RecordMy
            </div>
            <div className='auth-btn'>
                <AuthButton />
            </div>
        </div>
    );
}

export default Header;
