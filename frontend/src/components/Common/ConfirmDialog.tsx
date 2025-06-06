// frontend/src/components/Common/ConfirmDialog.tsx
import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material'

interface ConfirmDialogProps {
    open: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
    confirmText?: string
    cancelText?: string
    confirmColor?: 'primary' | 'secondary' | 'error' | 'warning'
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ( {
    open,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmColor = 'primary',
} ) => {
    return (
        <Dialog open={ open } onClose={ onCancel } maxWidth="sm" fullWidth>
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ onCancel } color="inherit">
                    { cancelText }
                </Button>
                <Button onClick={ onConfirm } color={ confirmColor } variant="contained">
                    { confirmText }
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
