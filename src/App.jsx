import './App.css';
import { ParkingProvider } from './context/context.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import LoadPage from './components/LoadPage/LoadPage.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Income from './components/Income/Income.jsx';
import CollectBill from './components/CollectBill/CollectBill.jsx';
import Banks from './components/Banks/Banks.jsx';
import Products from './components/Products/Products.jsx';
import Services from './components/Services/Services.jsx';
import Customers from './components/Customer/Customers.jsx';
import NotFoundPage from './components/404/404NotFound.jsx';

function App() {

  return (
    <>
      <ParkingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/load" element={<LoadPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ingreso" element={<Income />} />
            <Route path="/salida" element={<CollectBill />} />
            <Route path="/bancos" element={<Banks />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/clientes" element={<Customers />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ParkingProvider>
    </>
  )
}

export default App;