import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialOrders = [
    { id: 101, customer: "Alice", total: 59.97, status: "Pending" },
    { id: 102, customer: "Bob", total: 29.99, status: "Shipped" },
    { id: 103, customer: "Charlie", total: 39.99, status: "Delivered" },
];

const Orders: React.FC = () => {
    const [orders, setOrders] = useState(initialOrders);

    const handleDelete = (id: number) => {
        setOrders(orders.filter((o) => o.id !== id));
    };

    return (
        <div className="container mt-4">
            <h4>Orders</h4>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total ($)</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.total.toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>
                                <Link to={`/orders/view/${order.id}`} className="btn btn-sm btn-primary me-2">
                                    View
                                </Link>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(order.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center">
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;