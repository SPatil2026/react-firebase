import React, { useState } from 'react'
import { auth } from '../firebase.config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const createAccount = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log('User created:', userCredentials)
                navigate('/dashboard')
            })
            .catch((error) => {
                console.error('Error creating user:', error.message)
                // Optionally add error handling UI here
            })
    }

    return (
        <div>
            <form onSubmit={createAccount}>
                <h1>Create a New Account</h1>
                <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}
