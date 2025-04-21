import React, { useCallback } from 'react'
import { auth } from '../firebase.config'
import { Navigate, useNavigate } from 'react-router-dom'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

export default function Cart({ pizzas }) {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState({});
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddressId, setSelectedAddressId] = React.useState('');
  const [newAddress, setNewAddress] = React.useState('');
  const [showAddAddress, setShowAddAddress] = React.useState(false);
  const db = getFirestore();

  const loadUserData = useCallback(async () => {
    if (auth.currentUser) {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCart(userData.cart || {});
        setAddresses(userData.addresses || []);
        
        const defaultAddress = userData.addresses?.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        }
      }
    }
  }, [db]);

  React.useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const saveUserData = async (newCart) => {
    if (auth.currentUser) {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDoc, {
        cart: newCart,
        addresses: addresses
      }, { merge: true });
    }
  };

  const addNewAddress = async () => {
    if (!newAddress.trim()) return;

    const newAddressObj = {
      id: Date.now().toString(),
      address: newAddress.trim(),
      isDefault: addresses.length === 0, // Make default if first address
      label: 'Home'
    };

    const updatedAddresses = [...addresses, newAddressObj];
    setAddresses(updatedAddresses);
    setSelectedAddressId(newAddressObj.id);
    setNewAddress('');
    setShowAddAddress(false);

    // Save to Firestore
    if (auth.currentUser) {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDoc, { addresses: updatedAddresses }, { merge: true });
    }
  };

  const updateQuantity = (pizzaId, delta) => {
    const newCart = { ...cart };
    newCart[pizzaId] = (newCart[pizzaId] || 0) + delta;
    if (newCart[pizzaId] <= 0) {
      delete newCart[pizzaId];
    }
    setCart(newCart);
    saveUserData(newCart);
  };

  const removeFromCart = (pizzaId) => {
    const newCart = { ...cart };
    delete newCart[pizzaId];
    setCart(newCart);
    saveUserData(newCart);
  };

  const calculateTotal = () => {
    return pizzas
      .reduce((total, pizza) => {
        const quantity = cart[pizza.id] || 0;
        return total + quantity * (pizza.price || 0);
      }, 0)
      .toFixed(2);
  };

  if (!auth.currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Your Cart</h2>
          <button onClick={() => navigate('/dashboard')} style={styles.backButton}>
            ← Back to Menu
          </button>
        </div>
        
        <div style={styles.cartContent}>
          <div style={styles.cartItems}>
            {pizzas.filter(pizza => cart[pizza.id]).map(pizza => (
              <div key={pizza.id} style={styles.cartItem}>
                <img src={pizza.image} alt={pizza.name} style={styles.cartItemImage} />
                <div style={styles.cartItemInfo}>
                  <h3>{pizza.name}</h3>
                  <p>${pizza.price?.toFixed(2)}</p>
                </div>
                <div style={styles.quantityControls}>
                  <button onClick={() => updateQuantity(pizza.id, -1)}>-</button>
                  <span>{cart[pizza.id]}</span>
                  <button onClick={() => updateQuantity(pizza.id, 1)}>+</button>
                  <button 
                    onClick={() => removeFromCart(pizza.id)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.checkoutSection}>
            <div style={styles.addressSection}>
              <h3>Delivery Address</h3>
              
              {addresses.map(addr => (
                <div key={addr.id} style={styles.addressOption}>
                  <input
                    type="radio"
                    id={addr.id}
                    name="address"
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                  />
                  <label htmlFor={addr.id}>
                    {addr.label}: {addr.address}
                    {addr.isDefault && ' (Default)'}
                  </label>
                </div>
              ))}

              {showAddAddress ? (
                <div style={styles.newAddressForm}>
                  <textarea
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    style={styles.addressInput}
                    placeholder="Enter new delivery address"
                  />
                  <div>
                    <button onClick={addNewAddress} style={styles.addButton}>
                      Save Address
                    </button>
                    <button 
                      onClick={() => setShowAddAddress(false)}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAddAddress(true)}
                  style={styles.addAddressButton}
                >
                  + Add New Address
                </button>
              )}
            </div>
            
            <div style={styles.cartSummary}>
              <div style={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Delivery Fee:</span>
                <span>$2.00</span>
              </div>
              <div style={styles.totalRow}>
                <span>Total:</span>
                <span>${(parseFloat(calculateTotal()) + 2).toFixed(2)}</span>
              </div>
              <button 
                style={styles.checkoutButton}
                disabled={!selectedAddressId || Object.keys(cart).length === 0}
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    paddingTop: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    margin: 0,
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#FF6B6B',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cartContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '2rem',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr auto',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  cartItemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  cartItemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  removeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginLeft: '1rem',
    cursor: 'pointer',
  },
  checkoutSection: {
    position: 'sticky',
    top: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  addressSection: {
    marginBottom: '2rem',
  },
  addressOption: {
    padding: '1rem',
    marginBottom: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  addAddressButton: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  newAddressForm: {
    marginTop: '1rem',
  },
  addressInput: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    marginRight: '1rem',
    padding: '0.5rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#666',
    padding: '0.5rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cartSummary: {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.5rem 0',
    color: '#666',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0',
    padding: '1rem 0',
    borderTop: '2px solid #eee',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  checkoutButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#FF6B6B',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
}
