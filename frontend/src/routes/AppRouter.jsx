import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders   from "../pages/Orders";
import Checkout from "../pages/Checkout";
import Navbar   from "../components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"         element={<div style={{ padding: "40px", textAlign: "center" }}>App is running ✓</div>} />
        <Route path="/orders"   element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}