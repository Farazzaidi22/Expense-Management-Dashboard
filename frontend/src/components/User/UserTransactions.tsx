// frontend/src/components/User/UserTransactions.tsx
import React, { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Chip,
    IconButton,
    Fab,
} from '@mui/material'
import {
    ArrowBack as ArrowBackIcon,
    Add as AddIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchUserById } from '../../store/slices/userSlice'
import { fetchUserTransactions } from '../../store/slices/transactionSlice'
import TransactionList from '../Transaction/TransactionList'
import TransactionForm from '../Transaction/TransactionForm'
import Loading from '../Common/Loading'
import ErrorMessage from '../Common/ErrorMessage'
import { formatCurrency } from '../../utils/formatters'

const UserTransactions: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const userId = parseInt( id! )

    const { currentUser, loading: userLoading, error: userError } = useAppSelector( ( state ) => state.users )
    const { transactions, loading: transactionsLoading, error: transactionsError } = useAppSelector( ( state ) => state.transactions )

    const [ showTransactionForm, setShowTransactionForm ] = useState( false )
    const [ editingTransaction, setEditingTransaction ] = useState<number | null>( null )

    useEffect( () => {
        if ( userId ) {
            dispatch( fetchUserById( userId ) )
            dispatch( fetchUserTransactions( userId ) )
        }
    }, [ dispatch, userId ] )

    const handleAddTransaction = () => {
        setEditingTransaction( null )
        setShowTransactionForm( true )
    }

    const handleEditTransaction = ( transactionId: number ) => {
        setEditingTransaction( transactionId )
        setShowTransactionForm( true )
    }

    const handleCloseForm = () => {
        setShowTransactionForm( false )
        setEditingTransaction( null )
    }

    const handleFormSuccess = () => {
        setShowTransactionForm( false )
        setEditingTransaction( null )
        // Refresh transactions
        dispatch( fetchUserTransactions( userId ) )
        // Refresh user data to update totals
        dispatch( fetchUserById( userId ) )
    }

    if ( userLoading || transactionsLoading ) {
        return <Loading message="Loading user data..." />
    }

    if ( userError || !currentUser ) {
        return <ErrorMessage error={ userError || 'User not found' } onRetry={ () => dispatch( fetchUserById( userId ) ) } />
    }

    // Calculate transaction statistics
    const incomeTransactions = transactions.filter( t => t.type === 'income' )
    const expenseTransactions = transactions.filter( t => t.type === 'expense' )
    console.log(incomeTransactions, "incomeTransactions");
    const totalIncome = incomeTransactions.reduce( ( sum, t ) => sum + t.amount, 0 )
    const totalExpenses = expenseTransactions.reduce( ( sum, t ) => sum + t.amount, 0 )

    return (
        <Box>
            {/* Header */ }
            <Box sx={ { mb: 3, display: 'flex', alignItems: 'center', gap: 2 } }>
                <IconButton onClick={ () => navigate( '/' ) } size="large">
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={ { flexGrow: 1 } }>
                    <Typography variant="h4" component="h1">
                        { currentUser.name }'s Transactions
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        { currentUser.email }
                    </Typography>
                </Box>
            </Box>

            {/* Statistics */ }
            <Grid container spacing={ 3 } sx={ { mb: 4 } }>
                <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                    <Paper sx={ { p: 3, textAlign: 'center' } }>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Total Transactions
                        </Typography>
                        <Typography variant="h3" color="primary">
                            { transactions.length }
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                    <Paper sx={ { p: 3, textAlign: 'center' } }>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Total Income
                        </Typography>
                        <Typography variant="h3" color="success.main">
                            { formatCurrency( totalIncome ) }
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                    <Paper sx={ { p: 3, textAlign: 'center' } }>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Total Expenses
                        </Typography>
                        <Typography variant="h3" color="error.main">
                            { formatCurrency( totalExpenses ) }
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
                            { formatCurrency( totalIncome - totalExpenses ) }
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Quick Actions */ }
            <Box sx={ { mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' } }>
                <Chip
                    icon={ <TrendingUpIcon /> }
                    label={ `${ incomeTransactions.length } Income Transactions` }
                    color="success"
                    variant="outlined"
                />
                <Chip
                    icon={ <TrendingDownIcon /> }
                    label={ `${ expenseTransactions.length } Expense Transactions` }
                    color="error"
                    variant="outlined"
                />
            </Box>

            {/* Transactions List */ }
            <Paper sx={ { p: 3 } }>
                <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 } }>
                    <Typography variant="h5">
                        Transaction History
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={ <AddIcon /> }
                        onClick={ handleAddTransaction }
                    >
                        Add Transaction
                    </Button>
                </Box>

                { transactionsError ? (
                    <ErrorMessage
                        error={ transactionsError }
                        onRetry={ () => dispatch( fetchUserTransactions( userId ) ) }
                    />
                ) : (
                    <TransactionList
                        transactions={ transactions }
                        onEdit={ handleEditTransaction }
                        onRefresh={ () => {
                            dispatch( fetchUserTransactions( userId ) )
                            dispatch( fetchUserById( userId ) )
                        } }
                    />
                ) }
            </Paper>

            {/* Floating Action Button */ }
            <Fab
                color="primary"
                aria-label="add transaction"
                sx={ { position: 'fixed', bottom: 16, right: 16 } }
                onClick={ handleAddTransaction }
            >
                <AddIcon />
            </Fab>

            {/* Transaction Form Dialog */ }
            { showTransactionForm && (
                <TransactionForm
                    open={ showTransactionForm }
                    userId={ userId }
                    transactionId={ editingTransaction }
                    onClose={ handleCloseForm }
                    onSuccess={ handleFormSuccess }
                />
            ) }
        </Box>
    )
}

export default UserTransactions