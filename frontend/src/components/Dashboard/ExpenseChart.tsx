// frontend/src/components/Dashboard/ExpenseChart.tsx
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Box, Typography } from '@mui/material'
import { ExpenseByCategory } from '../../types'
import { formatCurrency } from '../../utils/formatters'

interface ExpenseChartProps {
    data: ExpenseByCategory[]
}

const ExpenseChart: React.FC<ExpenseChartProps> = ( { data } ) => {
    if ( !data || data.length === 0 ) {
        return (
            <Box sx={ { textAlign: 'center', py: 4 } }>
                <Typography variant="body2" color="text.secondary">
                    No expense data to display
                </Typography>
            </Box>
        )
    }

    const CustomTooltip = ( { active, payload }: any ) => {
        if ( active && payload && payload.length ) {
            const data = payload[ 0 ].payload
            return (
                <Box
                    sx={ {
                        backgroundColor: 'background.paper',
                        p: 2,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        boxShadow: 2,
                    } }
                >
                    <Typography variant="body2" fontWeight="bold" sx={ { textTransform: 'capitalize' } }>
                        { data.category }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Amount: { formatCurrency( data.amount ) }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Percentage: { data.percentage.toFixed( 1 ) }%
                    </Typography>
                </Box>
            )
        }
        return null
    }

    const CustomLegend = ( { payload }: any ) => {
        return (
            <Box sx={ { mt: 2 } }>
                { payload.map( ( entry: any, index: number ) => (
                    <Box
                        key={ index }
                        sx={ {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 0.5,
                        } }
                    >
                        <Box
                            sx={ {
                                width: 12,
                                height: 12,
                                backgroundColor: entry.color,
                                borderRadius: '50%',
                            } }
                        />
                        <Typography variant="body2" sx={ { textTransform: 'capitalize', fontSize: '0.75rem' } }>
                            { entry.value } ({ entry.payload.percentage.toFixed( 1 ) }%)
                        </Typography>
                    </Box>
                ) ) }
            </Box>
        )
    }

    return (
        <Box sx={ { width: '100%', height: 300 } }>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={ data }
                        cx="50%"
                        cy="50%"
                        outerRadius={ 80 }
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="category"
                        label={ ( { percentage } ) => `${ percentage.toFixed( 1 ) }%` }
                        labelLine={ false }
                    >
                        { data.map( ( entry, index ) => (
                            <Cell key={ `cell-${ index }` } fill={ entry.color } />
                        ) ) }
                    </Pie>
                    <Tooltip content={ <CustomTooltip /> } />
                    <Legend content={ <CustomLegend /> } />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default ExpenseChart
