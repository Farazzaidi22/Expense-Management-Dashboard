// frontend/src/components/Transaction/TransactionForm.tsx
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    InputAdornment,
    Typography,
} from '@mui/material'
import { AttachMoney as AttachMoneyIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { createTransaction, updateTransaction } from '../../store/slices/transactionSlice'
import { showToast } from '../../store/slices/uiSlice'
import { validateTransaction } from '../../utils/validation'
import { formatDateForInput } from '../../utils/formatters'
import { TransactionType } from '@/types'
import { TRANSACTION_CATEGORIES } from '@/types/transaction'

interface TransactionFormProps {
    open: boolean
    userId: number
    transactionId?: number | null
    onClose: () => void
    onSuccess: () => void
}

const TransactionForm: React.FC<TransactionFormProps> = ( {
    open,
    userId,
    transactionId,
    onClose,
    onSuccess,
} ) => {
    const dispatch = useAppDispatch()
    const { transactions } = useAppSelector( ( state ) => state.transactions )

    const isEditing = Boolean( transactionId )
    const editingTransaction = isEditing
        ? transactions.find( t => t.id === transactionId )
        : null

    const [ formData, setFormData ] = useState( {
        type: 'expense' as TransactionType,
        amount: '',
        category: '',
        description: '',
        date: formatDateForInput( new Date().toISOString() ),
    } )

    const [ formErrors, setFormErrors ] = useState<Record<string, string>>( {} )
    const [ isSubmitting, setIsSubmitting ] = useState( false )

    useEffect( () => {
        if ( isEditing && editingTransaction ) {
            setFormData( {
                type: editingTransaction.type,
                amount: editingTransaction.amount.toString(),
                category: editingTransaction.category,
                description: editingTransaction.description,
                date: formatDateForInput( editingTransaction.date ),
            } )
        } else if ( !isEditing ) {
            // Reset form for new transaction
            setFormData( {
                type: 'expense',
                amount: '',
                category: '',
                description: '',
                date: formatDateForInput( new Date().toISOString() ),
            } )
        }
    }, [ isEditing, editingTransaction, open ] )

    const handleInputChange = ( field: string ) => ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value
        setFormData( prev => ( { ...prev, [ field ]: value } ) )

        // Clear field error when user starts typing
        if ( formErrors[ field ] ) {
            setFormErrors( prev => ( { ...prev, [ field ]: '' } ) )
        }
    }

    const handleSelectChange = ( field: string ) => ( event: any ) => {
        const value = event.target.value
        setFormData( prev => ( {
            ...prev,
            [ field ]: value,
            // Reset category when type changes to income
            ...( field === 'type' && value === 'income' ? { category: 'income' } : {} )
        } ) )

        if ( formErrors[ field ] ) {
            setFormErrors( prev => ( { ...prev, [ field ]: '' } ) )
        }
    }

    const handleSubmit = async ( event: React.FormEvent ) => {
        event.preventDefault()

        // Validate form
        const validation = validateTransaction(
            parseFloat( formData.amount ) || 0,
            formData.category,
            formData.description,
            formData.date
        )

        if ( !validation.isValid ) {
            setFormErrors( validation.errors )
            return
        }

        setIsSubmitting( true )

        try {
            const transactionData = {
                type: formData.type,
                amount: parseFloat( formData.amount ),
                category: formData.category,
                description: formData.description,
                date: formData.date,
            }

            if ( isEditing && transactionId ) {
                await dispatch( updateTransaction( {
                    id: transactionId,
                    transactionData,
                } ) ).unwrap()

                dispatch( showToast( {
                    message: 'Transaction updated successfully',
                    severity: 'success',
                } ) )
            } else {
                await dispatch( createTransaction( {
                    userId,
                    transactionData,
                } ) ).unwrap()

                dispatch( showToast( {
                    message: 'Transaction created successfully',
                    severity: 'success',
                } ) )
            }

            onSuccess()
        } catch ( error: any ) {
            dispatch( showToast( {
                message: error.message || `Failed to ${ isEditing ? 'update' : 'create' } transaction`,
                severity: 'error',
            } ) )
        } finally {
            setIsSubmitting( false )
        }
    }

    const getAvailableCategories = () => {
        if ( formData.type === 'income' ) {
            return [ 'income' ]
        }
        return TRANSACTION_CATEGORIES.filter( cat => cat !== 'income' )
    }

    return (
        <Dialog open={ open } onClose={ onClose } maxWidth="sm" fullWidth>
            <form onSubmit={ handleSubmit }>
                <DialogTitle>
                    { isEditing ? 'Edit Transaction' : 'Add New Transaction' }
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={ 3 } sx={ { mt: 1 } }>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <FormControl fullWidth required>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={ formData.type }
                                    label="Type"
                                    onChange={ handleSelectChange( 'type' ) }
                                >
                                    <MenuItem value="income">Income</MenuItem>
                                    <MenuItem value="expense">Expense</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                label="Amount"
                                value={ formData.amount }
                                onChange={ handleInputChange( 'amount' ) }
                                error={ Boolean( formErrors.amount ) }
                                helperText={ formErrors.amount }
                                required
                                type="number"
                                inputProps={ {
                                    min: 0.01,
                                    step: 0.01,
                                    max: 999999.99
                                } }
                                InputProps={ {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon />
                                        </InputAdornment>
                                    ),
                                } }
                            />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <FormControl fullWidth required>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={ formData.category }
                                    label="Category"
                                    onChange={ handleSelectChange( 'category' ) }
                                    error={ Boolean( formErrors.category ) }
                                >
                                    { getAvailableCategories().map( category => (
                                        <MenuItem key={ category } value={ category }>
                                            { category.charAt( 0 ).toUpperCase() + category.slice( 1 ) }
                                        </MenuItem>
                                    ) ) }
                                </Select>
                                { formErrors.category && (
                                    <Typography variant="caption" color="error" sx={ { mt: 1, ml: 2 } }>
                                        { formErrors.category }
                                    </Typography>
                                ) }
                            </FormControl>
                        </Grid>

                        <Grid item xs={ 12 }>
                            <TextField
                                fullWidth
                                label="Description"
                                value={ formData.description }
                                onChange={ handleInputChange( 'description' ) }
                                error={ Boolean( formErrors.description ) }
                                helperText={ formErrors.description }
                                multiline
                                rows={ 3 }
                                placeholder="Enter transaction description (optional)"
                            />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <TextField
                                fullWidth
                                label="Date"
                                type="date"
                                value={ formData.date }
                                onChange={ handleInputChange( 'date' ) }
                                error={ Boolean( formErrors.date ) }
                                helperText={ formErrors.date }
                                required
                                InputLabelProps={ {
                                    shrink: true,
                                } }
                                inputProps={ {
                                    max: formatDateForInput( new Date().toISOString() ),
                                } }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={ { p: 3 } }>
                    <Button onClick={ onClose } disabled={ isSubmitting }>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={ isSubmitting }
                    >
                        { isSubmitting
                            ? ( isEditing ? 'Updating...' : 'Creating...' )
                            : ( isEditing ? 'Update' : 'Create' )
                        }
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default TransactionForm