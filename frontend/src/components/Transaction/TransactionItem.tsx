// frontend/src/components/Transaction/TransactionItem.tsx
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material'
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Category as CategoryIcon,
} from '@mui/icons-material'
import { useAppDispatch } from '../../store/hooks'
import { deleteTransaction } from '../../store/slices/transactionSlice'
import { showToast } from '../../store/slices/uiSlice'
import { Transaction } from '../../types'
import { formatCurrency, formatDate, capitalizeFirst } from '../../utils/formatters'
import { CATEGORY_COLORS } from '../../utils/constants'
import ConfirmDialog from '../Common/ConfirmDialog'

interface TransactionItemProps {
    transaction: Transaction
    onEdit: ( transactionId: number ) => void
    onRefresh: () => void
}

const TransactionItem: React.FC<TransactionItemProps> = ( {
    transaction,
    onEdit,
    onRefresh
} ) => {
    const dispatch = useAppDispatch()
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>( null )
    const [ deleteDialogOpen, setDeleteDialogOpen ] = useState( false )

    const handleMenuOpen = ( event: React.MouseEvent<HTMLElement> ) => {
        setAnchorEl( event.currentTarget )
    }

    const handleMenuClose = () => {
        setAnchorEl( null )
    }

    const handleEdit = () => {
        onEdit( transaction.id )
        handleMenuClose()
    }

    const handleDelete = async () => {
        try {
            await dispatch( deleteTransaction( transaction.id ) ).unwrap()
            dispatch( showToast( {
                message: 'Transaction deleted successfully',
                severity: 'success',
            } ) )
            onRefresh()
        } catch ( error: any ) {
            dispatch( showToast( {
                message: error.message || 'Failed to delete transaction',
                severity: 'error',
            } ) )
        }
        setDeleteDialogOpen( false )
        handleMenuClose()
    }

    const isIncome = transaction.type === 'income'
    const categoryColor = CATEGORY_COLORS[ transaction.category ] || CATEGORY_COLORS.other

    return (
        <>
            <Card
                sx={ {
                    '&:hover': { boxShadow: 2 },
                    borderLeft: `4px solid ${ isIncome ? CATEGORY_COLORS.income : categoryColor }`,
                } }
            >
                <CardContent sx={ { py: 2 } }>
                    <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
                        <Box sx={ { display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 } }>
                            {/* Transaction Type Icon */ }
                            <Box
                                sx={ {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    backgroundColor: isIncome ? 'success.light' : 'error.light',
                                    color: isIncome ? 'success.contrastText' : 'error.contrastText',
                                } }
                            >
                                { isIncome ? <TrendingUpIcon /> : <TrendingDownIcon /> }
                            </Box>

                            {/* Transaction Details */ }
                            <Box sx={ { flexGrow: 1, minWidth: 0 } }>
                                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 } }>
                                    <Typography variant="h6" component="div" noWrap>
                                        { formatCurrency( transaction.amount ) }
                                    </Typography>
                                    <Chip
                                        icon={ <CategoryIcon /> }
                                        label={ capitalizeFirst( transaction.category ) }
                                        size="small"
                                        sx={ {
                                            backgroundColor: categoryColor + '20',
                                            color: categoryColor,
                                            fontWeight: 'bold',
                                        } }
                                    />
                                </Box>

                                <Typography variant="body2" color="text.secondary" noWrap>
                                    { transaction.description || 'No description' }
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    { formatDate( transaction.date ) }
                                </Typography>
                            </Box>
                        </Box>

                        {/* Actions Menu */ }
                        <IconButton onClick={ handleMenuOpen } size="small">
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>

            <Menu
                anchorEl={ anchorEl }
                open={ Boolean( anchorEl ) }
                onClose={ handleMenuClose }
                anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
                transformOrigin={ { vertical: 'top', horizontal: 'right' } }
            >
                <MenuItem onClick={ handleEdit }>
                    <EditIcon sx={ { mr: 1 } } fontSize="small" />
                    Edit Transaction
                </MenuItem>
                <MenuItem onClick={ () => { setDeleteDialogOpen( true ); handleMenuClose(); } }>
                    <DeleteIcon sx={ { mr: 1 } } fontSize="small" />
                    Delete Transaction
                </MenuItem>
            </Menu>

            <ConfirmDialog
                open={ deleteDialogOpen }
                title="Delete Transaction"
                message={ `Are you sure you want to delete this ${ transaction.type } transaction of ${ formatCurrency( transaction.amount ) }? This action cannot be undone.` }
                onConfirm={ handleDelete }
                onCancel={ () => setDeleteDialogOpen( false ) }
                confirmText="Delete"
                confirmColor="error"
            />
        </>
    )
}

export default TransactionItem
