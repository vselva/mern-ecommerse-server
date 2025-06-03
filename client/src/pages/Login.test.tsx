import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router } from "react-router-dom";

test('Renders Login Form Correctly', () => {
    render(
        <AuthProvider>
            <Router>
                <Login />
            </Router>
        </AuthProvider>
    );
    // getByRole - matches <button>Login</button>
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // getByRole 
    // - matches <label for="email">Email</label> <input id="email" /> ...
    // - matches <input type="email" id="email" aria-label="Email" /> ...
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();

    // getByRole - <form aria-label="Login Form">
    expect(screen.getByRole('form')).toBeInTheDocument();

    // getByLabelText 
    // - matches <label for="password">Password</label> <input id="password" /> ...
    // - matches <input type="password" id="password" aria-label="Password" /> ...
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // GetByPlaceholder
    // - matches <input type="email" id="email" placeholder="Enter your email" />
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    
    // getByDisplayValue - reads the value of an input field, select, textarea, etc.
    // - matches <input type="email" id="email" value="rememberMe" />
    expect(screen.getByDisplayValue('rememberMe')).toBeInTheDocument();

    // getByDataTestId - matches elements with data-testid attribute
    // - matches <input data-testid="rememberMe" />
    expect(screen.getByTestId('rememberMe')).toBeInTheDocument();
});

