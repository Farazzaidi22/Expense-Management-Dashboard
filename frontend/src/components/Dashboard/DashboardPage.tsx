// frontend/src/components/Dashboard/DashboardPage.tsx
import React, { useEffect } from 'react'
import { Box, Typography, Button, Grid, Paper } from '@mui/material'
import { Add as AddIcon, Analytics as AnalyticsIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchUsers } from '../../store/slices/userSlice'
import { fetchExpensesByCategory } from '../../store/slices/transactionSlice'
import UserList from './UserList'
import ExpenseChart from './ExpenseChart'
import Loading from '../Common/Loading'
import ErrorMessage from '../Common/ErrorMessage'

const DashboardPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { users, loading: usersLoading, error: usersError } = useAppSelector( ( state ) => state.users )
    const { expensesByCategory, loading: analyticsLoading } = useAppSelector( ( state ) => state.transactions )

    useEffect( () => {
        dispatch( fetchUsers() )
        dispatch( fetchExpensesByCategory() )
    }, [ dispatch ] )

    const handleCreateUser = () => {
        navigate( '/users/new' )
    }

    const totalUsers = users?.length
    const totalIncome = users?.reduce( ( sum, user ) => sum + user.totalIncome, 0 )
    const totalExpenses = users?.reduce( ( sum, user ) => sum + user.totalExpense, 0 )

    if ( usersLoading && users?.length === 0 ) {
        return <Loading message="Loading dashboard..." />
    }

    return (
        <Box>
            {/* Header */ }
            <Box sx={ { mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Button
                    variant="contained"
                    startIcon={ <AddIcon /> }
                    onClick={ handleCreateUser }
                    size="large"
                >
                    Add New User
                </Button>
            </Box>

            {/* Statistics Cards */ }
            <Grid container spacing={ 3 } sx={ { mb: 4 } }>
                <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                    <Paper sx={ { p: 3, textAlign: 'center' } }>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Total Users
                        </Typography>
                        <Typography variant="h3" color="primary">
                            { totalUsers }
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                    <Paper sx={ { p: 3, textAlign: 'center' } }>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Total Income
                        </Typography>
                        <Typography variant="h3" color="success.main">
                            ${ totalIncome?.toFixed( 2 ) }
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                    <Paper sx={ { p: 3, textAlign: 'center' } }>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Total Expenses
                        </Typography>
                        <Typography variant="h3" color="error.main">
                            ${ totalExpenses?.toFixed( 2 ) }
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                    <Paper sx={ { p: 3, textAlign: 'center' } }>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Net Amount
                        </Typography>
                        <Typography
                            variant="h3"
                            color={ totalIncome - totalExpenses >= 0 ? 'success.main' : 'error.main' }
                        >
                            ${ ( totalIncome - totalExpenses )?.toFixed( 2 ) }
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={ 3 }>
                {/* User List */ }
                <Grid item xs={ 12 } md={ 8 }>
                    <Paper sx={ { p: 3 } }>
                        <Typography variant="h5" gutterBottom sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
                            Users Overview
                        </Typography>
                        { usersError ? (
                            <ErrorMessage
                                error={ usersError }
                                onRetry={ () => dispatch( fetchUsers() ) }
                            />
                        ) : (
                            <UserList users={ users } loading={ usersLoading } />
                        ) }
                    </Paper>
                </Grid>

                {/* Analytics Chart */ }
                <Grid item xs={ 12 } md={ 4 }>
                    <Paper sx={ { p: 3 } }>
                        <Typography variant="h5" gutterBottom sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
                            <AnalyticsIcon />
                            Expense Breakdown
                        </Typography>
                        { analyticsLoading ? (
                            <Loading message="Loading analytics..." size={ 30 } />
                        ) : expensesByCategory?.length > 0 ? (
                            <ExpenseChart data={ expensesByCategory } />
                        ) : (
                            <Typography variant="body2" color="text.secondary" textAlign="center" sx={ { py: 4 } }>
                                No expense data available
                            </Typography>
                        ) }
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashboardPage