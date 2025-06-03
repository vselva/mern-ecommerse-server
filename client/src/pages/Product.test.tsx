import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { render, screen } from "@testing-library/react";
import Products from "./Products";
import { expect } from "vitest";


test('renders Products with correct elements', () => {

    render(
        <AuthProvider>
            <Router>
                <Products />
            </Router>
        </AuthProvider>
    );

    // getByRole - <h4>Products</h4>
    expect(screen.getByRole('heading', { name: /Products/i })).toBeInTheDocument();

    // getByRole -
    // - <table className="table table-striped mt-3" aria-label="Products Table">
    // - <table className="table table-striped mt-3"> <caption>Products Table</caption> ...
    expect(screen.getByRole('table', { name: /Products Table/i})).toBeInTheDocument();

    // getByRole - <table aria-label="Products Table"><thead><tr><th>Name</th> ...
    expect(screen.getByRole('columnheader', { name: /Name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Price/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Actions/i })).toBeInTheDocument();

    // getByRole - Row Header - <th scope="row">Product A</th>
    expect(screen.getByRole('rowheader', { name: /Product A/i })).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: /Product B/i })).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: /Product C/i })).toBeInTheDocument();
    // getByRole - <td>$19.99</td>
    expect(screen.getByRole('cell', { name: /19.99/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /29.99/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /39.99/i })).toBeInTheDocument();
});
