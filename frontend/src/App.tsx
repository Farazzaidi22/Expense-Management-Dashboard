// frontend/src/App.tsx (Remove unused React import)
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from './components/Layout/Header'
import DashboardPage from './components/Dashboard/DashboardPage'
import UserForm from './components/User/UserForm'
import UserTransactions from './components/User/UserTransactions'
import ToastContainer from './components/Common/ToastContainer'

function App() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/users/new" element={<UserForm />} />
                    <Route path="/users/:id/edit" element={<UserForm />} />
                    <Route path="/users/:id/transactions" element={<UserTransactions />} />
                </Routes>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default App