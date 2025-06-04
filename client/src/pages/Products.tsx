import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Products: React.FC = () => {

    const { isAuthenticated, token } = useAuth();

    const [products, setProducts] = useState([]);

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(() => {
                setProducts(products.filter((p) => p._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };

    useEffect(() => {
        if(isAuthenticated) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const fetchProducts = async () => {
                try {
                    const res = await axios.get('http://localhost:8000/api/products/');
                    console.log("Fetched products:", res.data);
                    setProducts(res.data);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            fetchProducts();
        }
    }, []);

    return (
        <div className="container mt-4">
            <h4>Products</h4>
            <table className="table table-striped mt-3" aria-label="Products Table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price (Rs.)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod._id}>
                            {/* <td>{prod.name}</td> */}
                            { /* makeing product name as row header */}
                            <th scope="row">{prod.name}</th>
                            <td>{prod.description}</td>
                            <td>{prod.price.toFixed(2)}</td>
                            <td>
                                <Link to={`/products/edit/${prod.id}`} className="btn btn-sm btn-primary me-2">
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(prod._id)}
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