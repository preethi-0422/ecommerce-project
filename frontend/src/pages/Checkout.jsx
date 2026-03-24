import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
 

export default function Checkout() {
  const navigate = useNavigate();
  const userId = 1; // TODO: replace with AuthContext

  const [cartItems] = useState([
    { productId: 1, productName: "Sample Product", quantity: 2, unitPrice: 499 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity, 0
  );

  const handlePlaceOrder = () => {
    setLoading(true);
    setError(null);

    api.post(`/orders/${userId}`, {
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity:  item.quantity,
      })),
    })
      .then(() => navigate("/orders"))
      .catch(() => setError("Failed to place order. Please try again."))
      .finally(() => setLoading(false));
  };

  return (
    <>
      
      <div className="page-container" style={{ maxWidth: "700px" }}>
        <h2 className="page-heading">Checkout</h2>

        <div className="card">
          <h3 className="checkout-subheading">Order Summary</h3>

          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.unitPrice}</td>
                  <td>₹{item.unitPrice * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="order-total">Total: ₹{total}</div>

          {error && <p className="msg-error">{error}</p>}

          <button
            className="btn btn-primary"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </>
  );
}
 