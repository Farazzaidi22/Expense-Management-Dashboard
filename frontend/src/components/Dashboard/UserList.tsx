// frontend/src/components/Dashboard/UserList.tsx
import React from 'react'
import { Box, Typography } from '@mui/material'
import { User } from '../../types'
import UserCard from './UserCard'
import Loading from '../Common/Loading'

interface UserListProps {
    users: User[]
    loading: boolean
}

const UserList: React.FC<UserListProps> = ( { users, loading } ) => {
    if ( loading ) {
        return <Loading message="Loading users..." />
    }

    if ( users?.length === 0 ) {
        return (
            <Box sx={ { textAlign: 'center', py: 4 } }>
                <Typography variant="body1" color="text.secondary">
                    No users found. Create your first user to get started!
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
            { users?.map( ( user ) => (
                <UserCard key={ user.id } user={ user } />
            ) ) }
        </Box>
    )
}

export default UserList
