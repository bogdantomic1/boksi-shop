import "../css/Admin.css";

type Order = {
  id: number;
  customer: string;
  product: string;
  quantity: number;
  status: "Pending" | "Shipped" | "Delivered";
};

const orders: Order[] = [
  { id: 101, customer: "Alice", product: "Sneakers", quantity: 2, status: "Pending" },
  { id: 102, customer: "Bob", product: "Backpack", quantity: 1, status: "Shipped" },
  { id: 103, customer: "Charlie", product: "Jacket", quantity: 3, status: "Delivered" },
  { id: 104, customer: "Diana", product: "T-Shirt", quantity: 4, status: "Pending" },
];

export default function Admin() {
  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
