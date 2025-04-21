import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { auth } from '../firebase.config'

export default function Home() {
  const navigate = useNavigate();

  if (auth.currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="home">
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Welcome to Pizza Paradise</h1>
          <p style={styles.subtitle}>Discover the best pizzas in town!</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.features}>
          <div style={styles.feature}>
            <h3>🍕 Fresh Ingredients</h3>
            <p>Made with love daily</p>
          </div>
          <div style={styles.feature}>
            <h3>🚚 Fast Delivery</h3>
            <p>Hot and fresh to your door</p>
          </div>
          <div style={styles.feature}>
            <h3>⭐ Best Quality</h3>
            <p>Rated #1 in the city</p>
          </div>
        </div>
      </div>

      <div style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <h2 style={styles.sectionTitle}>Our Story</h2>
          <p style={styles.aboutText}>
            Founded in 2020, Pizza Paradise has been serving the community with authentic Italian recipes passed down through generations. 
            Our commitment to quality ingredients and traditional cooking methods sets us apart.
          </p>
        </div>
        <div style={styles.aboutImage}></div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>What Makes Us Special</h2>
        <div style={styles.specialFeatures}>
          <div style={styles.specialFeature}>
            <img src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f" 
                 alt="Fresh Ingredients" 
                 style={styles.featureImage} />
            <h3>Fresh Ingredients</h3>
            <p>We source only the finest ingredients from local suppliers.</p>
          </div>
          <div style={styles.specialFeature}>
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591" 
                 alt="Traditional Recipe" 
                 style={styles.featureImage} />
            <h3>Authentic Recipe</h3>
            <p>Traditional Italian recipes with a modern twist.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fff8f8 0%, #ffe9e9 100%)'
  },
  hero: {
    minHeight: '80vh',
    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  heroContent: {
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '800px'
  },
  title: {
    fontSize: '3.5rem',
    color: '#FF6B6B',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '3rem'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  },
  feature: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  authButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#FF6B6B',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    boxShadow: '0 2px 4px rgba(255,107,107,0.2)'
  },
  section: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  aboutSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    padding: '4rem 2rem',
    background: '#f8f8f8'
  },
  aboutContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  aboutImage: {
    background: 'url("https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '400px',
    borderRadius: '8px'
  },
  aboutText: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#666'
  },
  specialFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  specialFeature: {
    textAlign: 'center',
    padding: '1rem'
  },
  featureImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem'
  }
}
