// frontend/src/__tests__/components/Dashboard/DashboardPage.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../../../store/rootReducer'
import { theme } from '../../../utils/theme'
import DashboardPage from '../../../components/Dashboard/DashboardPage'

const createTestStore = () => {
    return configureStore( {
        reducer: rootReducer,
        preloadedState: {
            users: {
                users: [
                    {
                        id: 1,
                        name: 'John Doe',
                        email: 'john@example.com',
                        totalIncome: 5000,
                        totalExpense: 2000,
                        createdAt: '2025-01-01',
                        updatedAt: '2025-01-01'
                    }
                ],
                currentUser: null,
                loading: false,
                error: null
            },
            transactions: {
                transactions: [],
                expensesByCategory: [],
                loading: false,
                error: null
            },
            ui: {
                toast: {
                    open: false,
                    message: '',
                    severity: 'info'
                },
                confirmDialog: {
                    open: false,
                    title: '',
                    message: '',
                    onConfirm: null
                }
            }
        }
    } )
}

const renderWithProviders = ( component: React.ReactElement ) => {
    const store = createTestStore()
    return render(
        <Provider store={ store }>
            <BrowserRouter>
                <ThemeProvider theme={ theme }>
                    { component }
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    )
}

describe( 'DashboardPage', () => {
    it( 'renders dashboard title', () => {
        renderWithProviders( <DashboardPage /> )
        expect( screen.getByText( 'Dashboard' ) ).toBeInTheDocument()
    } )

    it( 'displays add new user button', () => {
        renderWithProviders( <DashboardPage /> )
        expect( screen.getByText( 'Add New User' ) ).toBeInTheDocument()
    } )

    it( 'shows statistics cards', () => {
        renderWithProviders( <DashboardPage /> )
        expect( screen.getByText( 'Total Users' ) ).toBeInTheDocument()
        expect( screen.getByText( 'Total Income' ) ).toBeInTheDocument()
        expect( screen.getByText( 'Total Expenses' ) ).toBeInTheDocument()
        expect( screen.getByText( 'Net Amount' ) ).toBeInTheDocument()
    } )

    it( 'displays user list', () => {
        renderWithProviders( <DashboardPage /> )
        expect( screen.getByText( 'Users Overview' ) ).toBeInTheDocument()
    } )
} )