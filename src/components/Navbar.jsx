import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase.config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>🍕 Pizza Paradise</Link>
      </div>
      <div style={styles.links}>
        {auth.currentUser ? (
          <>
            <span style={styles.welcomeText}>Welcome, {auth.currentUser.email}!</span>
            <button onClick={logout} style={styles.authButton}>Logout</button>
          </>
        ) : (
          <div style={styles.authLinks}>
            <Link to="/login" style={styles.authButton}>Login</Link>
            <Link to="/signup" style={styles.authButton}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    padding: '1rem 2rem',
    backgroundColor: '#FF6B6B',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  brandLink: {
    textDecoration: 'none',
    color: 'white'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  authLinks: {
    display: 'flex',
    gap: '1rem'
  },
  authButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    color: '#FF6B6B',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  welcomeText: {
    color: 'white',
    marginRight: '1rem',
    fontSize: '1.1rem'
  }
}
