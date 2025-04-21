import React, { useState } from 'react'
import { auth } from '../firebase.config'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pizzas = [
    { 
      id: 1, 
      name: 'Margherita', 
      price: '$12', 
      category: 'vegetarian', 
      image: 'https://static.toiimg.com/thumb/56868564.cms?imgsize=1948751&width=800&height=800', 
      description: 'Fresh mozzarella, tomatoes, basil leaves, olive oil, and salt' 
    },
    { 
      id: 2, 
      name: 'Pepperoni', 
      price: '$14', 
      category: 'meat', 
      image: 'https://www.simplyrecipes.com/thmb/I4razizFmeF8ua2jwuD0Pq4XpP8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-4-82c60893fcad4ade906a8a9f59b8da9d.jpg', 
      description: 'Pepperoni, mozzarella cheese, tomato sauce' 
    },
    { 
      id: 3, 
      name: 'BBQ Chicken', 
      price: '$16', 
      category: 'meat', 
      image: 'https://grilledcheesesocial.com/wp-content/uploads/2024/06/bbq-chicken-thighs-recipe-thumbnail.jpg', 
      description: 'Grilled chicken, BBQ sauce, red onions, cilantro' 
    },
    { 
      id: 4, 
      name: 'Veggie Supreme', 
      price: '$15', 
      category: 'vegetarian', 
      image: 'https://www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-side-view-out-of-oven-720x480.png', 
      description: 'Bell peppers, mushrooms, olives, onions, tomatoes' 
    },
    { 
      id: 5, 
      name: 'Hawaiian', 
      price: '$15', 
      category: 'meat', 
      image: 'https://www.allrecipes.com/thmb/v1Xi2wtebK1sZwSJitdV4MGKl1c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hawaiian-pizza-ddmfs-3x2-132-450eff04ad924d9a9eae98ca44e3f988.jpg', 
      description: 'Ham, pineapple, mozzarella cheese' 
    },
    { 
      id: 6, 
      name: 'Garden Fresh', 
      price: '$13', 
      category: 'vegetarian', 
      image: 'https://firangiburgers.com/wp-content/uploads/2019/03/GARDEN-FRESH-PIZZA.jpg', 
      description: 'Spinach, cherry tomatoes, feta cheese, olives' 
    }
  ];

  if (!auth.currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.welcome}>
        <h1>Welcome to Your Pizza Paradise, {auth.currentUser.email}!</h1>
        <div style={styles.categories}>
          <button onClick={() => setSelectedCategory('all')} style={selectedCategory === 'all' ? styles.activeCategory : styles.category}>All</button>
          <button onClick={() => setSelectedCategory('vegetarian')} style={selectedCategory === 'vegetarian' ? styles.activeCategory : styles.category}>Vegetarian</button>
          <button onClick={() => setSelectedCategory('meat')} style={selectedCategory === 'meat' ? styles.activeCategory : styles.category}>Meat Lovers</button>
        </div>
      </div>

      <div style={styles.pizzaGrid}>
        {pizzas
          .filter(pizza => selectedCategory === 'all' || pizza.category === selectedCategory)
          .map((pizza) => (
            <div key={pizza.id} style={styles.pizzaCard}>
              <img src={pizza.image} alt={pizza.name} style={styles.pizzaImage} />
              <div style={styles.pizzaInfo}>
                <h3>{pizza.name}</h3>
                <p style={styles.description}>{pizza.description}</p>
                <p style={styles.price}>{pizza.price}</p>
                <button style={styles.orderButton}>Add to Cart</button>
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
    transition: 'transform 0.2s ease'
  },
  pizzaImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
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
  }
}
