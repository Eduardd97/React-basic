import React, { useState } from 'react'
import { UsersList } from './UsersList.1'
import { users } from '../const'

export const Users = () => {

    const [usersType, setUsersType] = useState<'Lokal' | 'Server'>('Lokal')

    if(usersType === 'Lokal') return <UsersList users={users} />

  return (
    <div>Users</div>
  )
}
