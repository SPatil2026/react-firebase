import React, { useState } from 'react'
import { auth } from '../firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <form onSubmit={login}>
                <h1>Login Account</h1>
                <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
