import React, {useState} from 'react'
import { authService, firebaseInstance } from 'firebase.config'

const Auth = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState('')

    const handleChange = e => {
        const {
            target: {name, value},
        } = e
        if (name === 'email'){
            setEmail(value)
        } else if (name === 'password'){
            setPassword(value)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            let data;
            if(newAccount){
                // create newAccount
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password) 
            }
            console.log(data)
        }
        catch(error){
            setError(error.message)
        }
        
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)

    const onSocialClick = async event => {
        const {
            target: {name},
        } = event
        let provider
        if (name === 'google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if (name === 'github'){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name = 'email'
                    type = 'email'
                    placeholder = 'Email'
                    required
                    value = {email}
                    onChange = {handleChange}
                />
                <input
                    name = 'password'
                    type = 'password'
                    placeholder = 'Password'
                    required
                    value = {password}
                    onChange = {handleChange}
                />
                <input type = 'submit' value = {newAccount ? 'Create Account' : 'Log In'}/>
                <div>{error}</div>
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? 'Sign In':'Create Account'}
            </span>
            <div>
                <button onClick={onSocialClick} name='google'>Continue with Google</button>
                <button onClick={onSocialClick} name='github'>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth
