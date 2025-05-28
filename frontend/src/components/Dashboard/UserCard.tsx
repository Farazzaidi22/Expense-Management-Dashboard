// frontend/src/components/Dashboard/UserCard.tsx
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material'
import {
    Person as PersonIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { deleteUser } from '../../store/slices/userSlice'
import { showToast } from '../../store/slices/uiSlice'
import { User } from '../../types'
import { formatCurrency } from '../../utils/formatters'
import ConfirmDialog from '../Common/ConfirmDialog'

interface UserCardProps {
    user: User
}

const UserCard: React.FC<UserCardProps> = ( { user } ) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>( null )
    const [ deleteDialogOpen, setDeleteDialogOpen ] = useState( false )

    const handleMenuOpen = ( event: React.MouseEvent<HTMLElement> ) => {
        setAnchorEl( event.currentTarget )
    }

    const handleMenuClose = () => {
        setAnchorEl( null )
    }

    const handleViewTransactions = () => {
        navigate( `/users/${ user.id }/transactions` )
        handleMenuClose()
    }

    const handleEditUser = () => {
        navigate( `/users/${ user.id }/edit` )
        handleMenuClose()
    }

    const handleDeleteUser = async () => {
        try {
            await dispatch( deleteUser( user.id ) ).unwrap()
            dispatch( showToast( {
                message: 'User deleted successfully',
                severity: 'success',
            } ) )
        } catch ( error: any ) {
            dispatch( showToast( {
                message: error.message || 'Failed to delete user',
                severity: 'error',
            } ) )
        }
        setDeleteDialogOpen( false )
        handleMenuClose()
    }

    const netAmount = user.totalIncome - user.totalExpense

    return (
        <>
            <Card sx={ { '&:hover': { boxShadow: 4 }, cursor: 'pointer' } }>
                <CardContent>
                    <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 } }>
                        <Box sx={ { display: 'flex', alignItems: 'center', gap: 2 } }>
                            <PersonIcon color="primary" />
                            <Box>
                                <Typography variant="h6" component="div">
                                    { user.name }
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    { user.email }
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={ handleMenuOpen } size="small">
                            <MoreVertIcon />
                        </IconButton>
                    </Box>

                    <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
                        <Box sx={ { display: 'flex', gap: 2 } }>
                            <Chip
                                icon={ <TrendingUpIcon /> }
                                label={ `Income: ${ formatCurrency( user.totalIncome ) }` }
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                            <Chip
                                icon={ <TrendingDownIcon /> }
                                label={ `Expenses: ${ formatCurrency( user.totalExpense ) }` }
                                color="error"
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            color={ netAmount >= 0 ? 'success.main' : 'error.main' }
                            fontWeight="bold"
                        >
                            { formatCurrency( netAmount ) }
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={ handleViewTransactions }
                        sx={ { mt: 1 } }
                    >
                        View Transactions
                    </Button>
                </CardContent>
            </Card>

            <Menu
                anchorEl={ anchorEl }
                open={ Boolean( anchorEl ) }
                onClose={ handleMenuClose }
                anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
                transformOrigin={ { vertical: 'top', horizontal: 'right' } }
            >
                <MenuItem onClick={ handleViewTransactions }>
                    <VisibilityIcon sx={ { mr: 1 } } fontSize="small" />
                    View Transactions
                </MenuItem>
                <MenuItem onClick={ handleEditUser }>
                    <EditIcon sx={ { mr: 1 } } fontSize="small" />
                    Edit User
                </MenuItem>
                <MenuItem onClick={ () => { setDeleteDialogOpen( true ); handleMenuClose(); } }>
                    <DeleteIcon sx={ { mr: 1 } } fontSize="small" />
                    Delete User
                </MenuItem>
            </Menu>

            <ConfirmDialog
                open={ deleteDialogOpen }
                title="Delete User"
                message={ `Are you sure you want to delete ${ user.name }? This action cannot be undone and will also delete all associated transactions.` }
                onConfirm={ handleDeleteUser }
                onCancel={ () => setDeleteDialogOpen( false ) }
                confirmText="Delete"
                confirmColor="error"
            />
        </>
    )
}

export default UserCard
