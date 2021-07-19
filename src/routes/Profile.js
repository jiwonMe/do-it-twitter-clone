import React, { useState, useEffect } from 'react'
import { authService, dbService } from 'firebase.config'
import { useHistory } from 'react-router'

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName)

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/')
    }

    const onChange = (event) => {
        const {
            target: { value },
        } = event
        setNewDisplayName(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName })
            refreshUser()
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type='text'
                    placeholder='Display name'
                    value={newDisplayName}
                />
                <input type='submit' value='Update Profile' />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile
