import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { expect } from "vitest";

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

    // getByRole - matches <button>Logout</button> ...
    expect(screen.getAllByRole('button')).toHaveLength(1); 

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

    // getByTitle - matches elements with title attribute
    // - matches <button title="Login Button">Login</button>
    expect(screen.getByTitle('Login Button')).toBeInTheDocument();

});

test('when user click login form without email and password', async () => {
    render(<AuthProvider>
        <Router>
            <Login />
        </Router>
    </AuthProvider>);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    

    // Fire Event - Click the login button without entering email and password
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);
    expect(await screen.findByText(/User not found/i)).toBeInTheDocument(); // wait till the error message appears
    await waitFor(() => expect(screen.getByText(/User not found/i)).toBeInTheDocument()); // poll the callback until the error message appears

    // Fire Event - Change the email and password input fields
    fireEvent.change(emailInput, { target: { value: 'member@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(emailInput).toHaveValue('member@gmail.com');
    expect(passwordInput).toHaveValue('password123');
    
    fireEvent.click(loginButton);
    expect(await screen.findByText(/User not found/i)).toBeInTheDocument(); // wait till the error message appears
    await waitFor(() => { // poll the callback until the error message appears
        expect(screen.getByText(/User not found/i)).toBeInTheDocument();
    });

    // userEvent - simulates a user event
    await userEvent.type(emailInput, 'member@gmail.com');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.click(loginButton);
    expect(screen.getByText(/Invalid Credentials/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid Credentials/i)).toBeInTheDocument();
    waitFor(() => { expect(screen.getByText(/Invalid Credentials/i)).toBeInTheDocument(); });
    
    // userEvent - simulates a user event clearing email and password fields
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');  
    await userEvent.click(loginButton);
    expect(await screen.findByText(/Invalid Credentials/i)).toBeInTheDocument();
    //console.log(screen.debug());
    waitFor(() => { expect(screen.getByText(/Invalid Credentials/i)).toBeInTheDocument(); });
});

