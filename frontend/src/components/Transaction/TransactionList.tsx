// frontend/src/components/Transaction/TransactionList.tsx
import React from 'react'
import { Box, Typography } from '@mui/material'
import { Transaction } from '../../types'
import TransactionItem from './TransactionItem'

interface TransactionListProps {
    transactions: Transaction[]
    onEdit: ( transactionId: number ) => void
    onRefresh: () => void
}

const TransactionList: React.FC<TransactionListProps> = ( {
    transactions,
    onEdit,
    onRefresh
} ) => {
    if ( transactions.length === 0 ) {
        return (
            <Box sx={ { textAlign: 'center', py: 4 } }>
                <Typography variant="body1" color="text.secondary">
                    No transactions found. Add your first transaction to get started!
                </Typography>
            </Box>
        )
    }

    // Sort transactions by date (newest first)
    const sortedTransactions = [ ...transactions ].sort( ( a, b ) =>
        new Date( b.date ).getTime() - new Date( a.date ).getTime()
    )

    return (
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1 } }>
            { sortedTransactions.map( ( transaction ) => (
                <TransactionItem
                    key={ transaction.id }
                    transaction={ transaction }
                    onEdit={ onEdit }
                    onRefresh={ onRefresh }
                />
            ) ) }
        </Box>
    )
}

export default TransactionList
