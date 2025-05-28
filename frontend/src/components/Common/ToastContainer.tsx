// frontend/src/components/Common/ToastContainer.tsx (Fix unused parameter)
import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { hideToast } from '../../store/slices/uiSlice'

const ToastContainer: React.FC = () => {
    const dispatch = useAppDispatch()
    const { toast } = useAppSelector( ( state ) => state.ui )

    const handleClose = ( _event?: React.SyntheticEvent | Event, reason?: string ) => {
        if ( reason === 'clickaway' ) {
            return
        }
        dispatch( hideToast() )
    }

    return (
        <Snackbar
            open={ toast.open }
            autoHideDuration={ 6000 }
            onClose={ handleClose }
            anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
        >
            <Alert onClose={ handleClose } severity={ toast.severity } sx={ { width: '100%' } }>
                { toast.message }
            </Alert>
        </Snackbar>
    )
}

export default ToastContainer