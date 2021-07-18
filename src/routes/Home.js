import React, { useEffect, useState } from 'react'
import { dbService } from 'firebase.config'


const Home = ({userObj}) => {
    const [nweet, setNweet] = useState('')
    const [nweetList, setNweetList] = useState([])

    const getNweets = async () => {
        const dbNweets = await dbService.collection('nweets').get()
        dbNweets.forEach((document) =>
            {
                const nweetObject = {...document.data(), id: document.id}
                setNweetList((prev) => [nweetObject, ...prev])
            }
        )
    }

    useEffect(() => {
        getNweets()
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.collection('nweets').add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        })
        setNweet('')
    }

    const onChange = (event) => {
        event.preventDefault()
        const {
            target: {value},
        } = event
        setNweet(value)
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type='text'
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type='submit' value='Nweet'/>
            </form>
            <div>
                {nweetList.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home
