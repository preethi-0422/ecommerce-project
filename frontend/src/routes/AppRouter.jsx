import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login         from "../pages/Login";
import Register      from "../pages/Register";
import Orders        from "../pages/Orders";
import Checkout      from "../pages/Checkout";
import Home          from "../pages/Home";
import ProductList   from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Admin         from "../pages/Admin";

import Navbar        from "../components/Navbar";
import PrivateRoute  from "../components/PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login"        element={<Login />} />
        <Route path="/register"     element={<Register />} />
        <Route path="/"             element={<Home />} />
        <Route path="/products"     element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* Protected routes */}
        <Route path="/orders"   element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/admin"    element={<PrivateRoute><Admin /></PrivateRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}