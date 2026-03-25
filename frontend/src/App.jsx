import { Routes, Route } from "react-router-dom";
import "./styles.css"; 
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AddProduct from "./pages/admin/AddProduct";
import AddCategory from "./pages/admin/AddCategory";
import ManageProduct from "./pages/admin/ManageProduct";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* User pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* Admin pages */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/manage-products" element={<ManageProduct />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;