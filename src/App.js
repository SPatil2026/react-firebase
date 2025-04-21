import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import Create from './components/Create'
import Login from './components/Login'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Cart from './components/Cart'

export default function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const db = getFirestore();

  React.useEffect(() => {
    const fetchPizzas = async () => {
      const pizzasRef = collection(db, 'pizzas');
      const snapshot = await getDocs(pizzasRef);
      const pizzasList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPizzas(pizzasList);
    };
    
    fetchPizzas();
  }, [db]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard pizzas={pizzas} />} />
          <Route path="/cart" element={<Cart pizzas={pizzas} />} />
          <Route path="/signup" element={<Create />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}
