// frontend/src/components/Layout/Header.tsx
import React from 'react'
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'
import { Home as HomeIcon, AccountBalance as AccountBalanceIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
    const navigate = useNavigate()

    return (
        <AppBar position="static" elevation={ 1 }>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={ () => navigate( '/' ) }
                    sx={ { mr: 2 } }
                >
                    <AccountBalanceIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
                    Expense Management Dashboard
                </Typography>
                <Box sx={ { display: 'flex', alignItems: 'center' } }>
                    <IconButton
                        color="inherit"
                        onClick={ () => navigate( '/' ) }
                        title="Dashboard"
                    >
                        <HomeIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header