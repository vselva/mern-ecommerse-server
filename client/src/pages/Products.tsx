import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialProducts = [
    { id: 1, name: "Product A", price: 19.99 },
    { id: 2, name: "Product B", price: 29.99 },
    { id: 3, name: "Product C", price: 39.99 },
];

const Products: React.FC = () => {
    const [products, setProducts] = useState(initialProducts);

    const handleDelete = (id: number) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    return (
        <div className="container mt-4">
            <h4>Products</h4>
            <table className="table table-striped mt-3" aria-label="Products Table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price ($)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            {/* <td>{prod.name}</td> */}
                            { /* makeing product name as row header */}
                            <th scope="row">{prod.name}</th>
                            <td>{prod.price.toFixed(2)}</td>
                            <td>
                                <Link to={`/products/edit/${prod.id}`} className="btn btn-sm btn-primary me-2">
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(prod.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={3} className="text-center">
                                No products found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Products;