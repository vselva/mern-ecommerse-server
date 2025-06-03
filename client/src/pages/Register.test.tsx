import { render, screen } from "@testing-library/react"
import { AuthProvider } from "../context/AuthContext"
import { BrowserRouter as Router } from "react-router-dom"
import Register from "./register"
import { expect } from "vitest";


test('renders Register Form Correctly', () => {
    render(<AuthProvider>
        <Router>
            <Register />
        </Router>
    </AuthProvider>);

    // getByLabelText 
    // - matches <label for="name">Name</label> <input id="name" /
    // - matches <input type="text" id="name" aria-label="Name" />
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // getByPlaceholderText
    // - matches <input type="email" id="email" placeholder="Enter your email" />
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
});
