// frontend/src/components/Common/ErrorMessage.tsx
import React from 'react'
import { Alert, AlertTitle, Box } from '@mui/material'
import { ApiError } from '../../types'

interface ErrorMessageProps {
    error: ApiError | string
    onRetry?: () => void
}

const ErrorMessage: React.FC<ErrorMessageProps> = ( { error, onRetry } ) => {
    const errorMessage = typeof error === 'string' ? error : error.message
    const errorDetails = typeof error === 'object' && error.errors ? error.errors : null

    return (
        <Box sx={ { mb: 2 } }>
            <Alert severity="error" action={ onRetry && (
                <button onClick={ onRetry } style={ { background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'underline' } }>
                    Retry
                </button>
            ) }>
                <AlertTitle>Error</AlertTitle>
                { errorMessage }
                { errorDetails && (
                    <Box sx={ { mt: 1 } }>
                        { Object.entries( errorDetails ).map( ( [ field, messages ] ) => (
                            <div key={ field }>
                                <strong>{ field }:</strong> { Array.isArray( messages ) ? messages.join( ', ' ) : messages }
                            </div>
                        ) ) }
                    </Box>
                ) }
            </Alert>
        </Box>
    )
}

export default ErrorMessage
