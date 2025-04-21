import React, { useState, useEffect } from 'react'
import { auth } from '../firebase.config'
import { Navigate, useNavigate } from 'react-router-dom'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

export default function Dashboard({ pizzas }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const loadUserData = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setCart(docSnap.data().cart || {});
        }
      }
    };
    loadUserData();
  }, [db]);

  const addToCart = async (pizza) => {
    const newCart = { ...cart };
    newCart[pizza.id] = (newCart[pizza.id] || 0) + 1;
    setCart(newCart);
    
    if (auth.currentUser) {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDoc, { cart: newCart }, { merge: true });
    }
  };

  if (!auth.currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.welcome}>
        <h1>Welcome to Your Pizza Paradise, {auth.currentUser.email}!</h1>
        <div style={styles.categories}>
          <button onClick={() => setSelectedCategory('all')} 
                  style={selectedCategory === 'all' ? styles.activeCategory : styles.category}>
            All
          </button>
          <button onClick={() => setSelectedCategory('vegetarian')} 
                  style={selectedCategory === 'vegetarian' ? styles.activeCategory : styles.category}>
            Vegetarian
          </button>
          <button onClick={() => setSelectedCategory('meat')} 
                  style={selectedCategory === 'meat' ? styles.activeCategory : styles.category}>
            Meat Lovers
          </button>
        </div>
      </div>

      <button 
        onClick={() => navigate('/cart')} 
        style={styles.cartButton}
      >
        View Cart ({Object.values(cart).reduce((a, b) => a + b, 0)} items)
      </button>

      <div style={styles.pizzaGrid}>
        {pizzas
          .filter(pizza => selectedCategory === 'all' || pizza.category === selectedCategory)
          .map((pizza) => (
            <div key={pizza.id} style={styles.pizzaCard}>
              <div style={styles.imageContainer}>
                <img src={pizza.image} alt={pizza.name} style={styles.pizzaImage} />
                {pizza.isAvailable && <span style={styles.badge}>Available</span>}
              </div>
              <div style={styles.pizzaInfo}>
                <h3>{pizza.name}</h3>
                <p style={styles.description}>{pizza.description}</p>
                <p style={styles.price}>${pizza.price?.toFixed(2)}</p>
                <button 
                  style={styles.orderButton}
                  onClick={() => {
                    addToCart(pizza);
                    navigate('/cart');
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  welcome: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  categories: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem'
  },
  category: {
    padding: '0.5rem 1rem',
    border: '2px solid #FF6B6B',
    borderRadius: '20px',
    background: 'white',
    color: '#FF6B6B',
    cursor: 'pointer'
  },
  activeCategory: {
    padding: '0.5rem 1rem',
    border: '2px solid #FF6B6B',
    borderRadius: '20px',
    background: '#FF6B6B',
    color: 'white',
    cursor: 'pointer'
  },
  pizzaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    padding: '1rem'
  },
  pizzaCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
    }
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    height: '200px',
  },
  pizzaImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  pizzaInfo: {
    padding: '1rem'
  },
  description: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '1rem'
  },
  price: {
    color: '#FF6B6B',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  orderButton: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#FF6B6B',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  cartButton: {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '1rem 1.5rem',
    backgroundColor: '#FF6B6B',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    zIndex: 1000,
    boxShadow: '0 4px 10px rgba(255,107,107,0.3)',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  }
}
