// frontend/src/components/User/UserForm.tsx
import React, { useState, useEffect } from 'react'
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
    IconButton,
} from '@mui/material'
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { createUser, updateUser, fetchUserById, clearCurrentUser } from '../../store/slices/userSlice'
import { showToast } from '../../store/slices/uiSlice'
import { validateUser } from '../../utils/validation'
import Loading from '../Common/Loading'
import ErrorMessage from '../Common/ErrorMessage'

const UserForm: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const isEditing = Boolean( id )

    const { currentUser, loading, error } = useAppSelector( ( state ) => state.users )

    const [ formData, setFormData ] = useState( {
        name: '',
        email: '',
    } )
    const [ formErrors, setFormErrors ] = useState<Record<string, string>>( {} )
    const [ isSubmitting, setIsSubmitting ] = useState( false )

    useEffect( () => {
        if ( isEditing && id ) {
            dispatch( fetchUserById( parseInt( id ) ) )
        }

        return () => {
            dispatch( clearCurrentUser() )
        }
    }, [ dispatch, id, isEditing ] )

    useEffect( () => {
        if ( isEditing && currentUser ) {
            setFormData( {
                name: currentUser.name,
                email: currentUser.email,
            } )
        }
    }, [ currentUser, isEditing ] )

    const handleInputChange = ( field: string ) => ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value
        setFormData( prev => ( { ...prev, [ field ]: value } ) )

        // Clear field error when user starts typing
        if ( formErrors[ field ] ) {
            setFormErrors( prev => ( { ...prev, [ field ]: '' } ) )
        }
    }

    const handleSubmit = async ( event: React.FormEvent ) => {
        event.preventDefault()

        // Validate form
        const validation = validateUser( formData.name, formData.email )
        if ( !validation.isValid ) {
            setFormErrors( validation.errors )
            return
        }

        setIsSubmitting( true )

        try {
            if ( isEditing && id ) {
                await dispatch( updateUser( {
                    id: parseInt( id ),
                    userData: formData
                } ) ).unwrap()

                dispatch( showToast( {
                    message: 'User updated successfully',
                    severity: 'success',
                } ) )
            } else {
                await dispatch( createUser( formData ) ).unwrap()

                dispatch( showToast( {
                    message: 'User created successfully',
                    severity: 'success',
                } ) )
            }

            navigate( '/' )
        } catch ( error: any ) {
            dispatch( showToast( {
                message: error.message || `Failed to ${ isEditing ? 'update' : 'create' } user`,
                severity: 'error',
            } ) )
        } finally {
            setIsSubmitting( false )
        }
    }

    if ( isEditing && loading && !currentUser ) {
        return <Loading message="Loading user data..." />
    }

    if ( isEditing && error && !currentUser ) {
        return <ErrorMessage error={ error } onRetry={ () => dispatch( fetchUserById( parseInt( id! ) ) ) } />
    }

    return (
        <Box>
            {/* Header */ }
            <Box sx={ { mb: 3, display: 'flex', alignItems: 'center', gap: 2 } }>
                <IconButton onClick={ () => navigate( -1 ) } size="large">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1">
                    { isEditing ? 'Edit User' : 'Create New User' }
                </Typography>
            </Box>

            <Grid container justifyContent="center">
                <Grid item xs={ 12 } md={ 8 } lg={ 6 }>
                    <Paper elevation={ 3 }>
                        <Card>
                            <CardContent sx={ { p: 4 } }>
                                <form onSubmit={ handleSubmit }>
                                    <Grid container spacing={ 3 }>
                                        <Grid item xs={ 12 }>
                                            <TextField
                                                fullWidth
                                                label="Full Name"
                                                name="name"
                                                value={ formData.name }
                                                onChange={ handleInputChange( 'name' ) }
                                                error={ Boolean( formErrors.name ) }
                                                helperText={ formErrors.name }
                                                required
                                                autoFocus={ !isEditing }
                                                placeholder="Enter full name"
                                            />
                                        </Grid>

                                        <Grid item xs={ 12 }>
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={ formData.email }
                                                onChange={ handleInputChange( 'email' ) }
                                                error={ Boolean( formErrors.email ) }
                                                helperText={ formErrors.email }
                                                required
                                                placeholder="Enter email address"
                                            />
                                        </Grid>

                                        <Grid item xs={ 12 }>
                                            <Box sx={ { display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 } }>
                                                <Button
                                                    variant="outlined"
                                                    onClick={ () => navigate( -1 ) }
                                                    size="large"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    startIcon={ <SaveIcon /> }
                                                    size="large"
                                                    disabled={ isSubmitting }
                                                >
                                                    { isSubmitting
                                                        ? ( isEditing ? 'Updating...' : 'Creating...' )
                                                        : ( isEditing ? 'Update User' : 'Create User' )
                                                    }
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UserForm