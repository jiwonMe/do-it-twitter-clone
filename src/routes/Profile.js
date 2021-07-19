import React, { useEffect } from 'react'
import { authService, dbService } from 'firebase.config'
import { useHistory } from 'react-router'

const Profile = ({ userObj }) => {
    const history = useHistory()

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/')
    }

    const getMyNweets = async () => {
        const nweets = await dbService
            .collection('nweets')
            .where('creatorId', '==', userObj.uid)
            .orderBy('createdAt', 'asc') //asc: 오름차순
            .get()


        console.log(nweets.docs.map((doc) => doc.data()))
    }

    useEffect(() => {
        getMyNweets()
    }, [])

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile
