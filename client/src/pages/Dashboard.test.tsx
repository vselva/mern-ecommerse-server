import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext"
import { BrowserRouter as Router } from "react-router-dom"
import Dashboard from "./Dashboard"

test('renders Dashboard with correct elements', () => {

    render(<AuthProvider>
        <Router>
            <Dashboard />
        </Router>
    </AuthProvider>);

    // expect(screen.getByRole('list')).toHaveLength(3); 
    // only for selecting a single element. 
    // But in this page we have many list items and this getByRole will not work as expected.
    // Instead queryByRole will work as expected.

    // queryByRole - matches all <ul> elements
    expect(screen.getAllByRole('list')).toHaveLength(2);

    // getByRole - matches <ul aria-label="Orders List">
    expect(screen.getByRole('list', { name: /Orders List/i })).toBeInTheDocument();
    expect(screen.getAllByRole('list', { name: /Orders List/i })).toHaveLength(1); // same as above


    // getByText -<h4>Welcome to Dashboard Page!</h4>
    // matches the text content of an element
    expect(screen.getByText(/Welcome to Dashboard Page!/g)).toBeInTheDocument();

});

