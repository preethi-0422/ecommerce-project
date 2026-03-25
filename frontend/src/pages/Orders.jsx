import { useEffect, useState } from "react";
import api from "../services/api";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
 

export default function Orders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

 const { user } = useAuth();
  const userId = user?.id || 1;

  useEffect(() => {
    api.get(`/orders/user/${userId}`)
      .then(res => setOrders(res.data))
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = (orderId) => {
    api.put(`/orders/${orderId}/cancel`)
      .then(res => setOrders(prev =>
        prev.map(o => o.orderId === orderId ? res.data : o)
      ))
      .catch(() => alert("Could not cancel order"));
  };

  if (loading) return <p className="msg-center">Loading orders...</p>;
  if (error) return <p className="msg-center">{error}</p>;

  return (
    <>
       
      <div className="page-container">
        <h2 className="page-heading">My Orders</h2>

        {orders.length === 0 ? (
          <p className="msg-center">You have no orders yet.</p>
        ) : (
          orders.map(order => (
            <div key={order.orderId} className="card">

              <div className="card-header">
                <span>Order #{order.orderId}</span>
                <span className={`badge badge-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <p className="order-meta">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.unitPrice}</td>
                      <td>₹{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="card-footer">
                <strong>Total: ₹{order.totalAmount}</strong>
                {order.status === "PENDING" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancel(order.orderId)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </>
  );
}