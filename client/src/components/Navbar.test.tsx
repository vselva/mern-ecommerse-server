
import { fireEvent, getByRole, render, renderHook, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { BrowserRouter as Router } from "react-router-dom"
import { act } from 'react';
import { vi } from 'vitest';


test('renders Navbar with correct links', () => {
    render(
        <AuthProvider>
            <Router>
                <Navbar />
            </Router>
        </AuthProvider>
    );
    expect(screen.getByText('E-Shop')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
});

test('renders Login and Register links when not authenticated', () => {
    render(
        <AuthProvider>
            <Router>
                <Navbar />
            </Router>
        </AuthProvider>
    );
    // getByRole - matches links: 
    // <a href="/dashboard">Dashboard</a>, 
    // <a href="/login">Login</a>, 
    // <a href="/register">Register</a>
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /forget password/i })).not.toBeInTheDocument();

    // getByRole for three links in the navbar
    expect(screen.getAllByRole('link')).toHaveLength(6);

    // getByRole for <img src="/vite.svg" alt="Vite logo" />
    expect(screen.getByRole('img', { name: /vite logo/i })).toBeInTheDocument();

    // getByAltText - matches <img src="/vite.svg" alt="Vite logo" />
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument();

    // rendered DOM can be debugged with this command
    // console.log(screen.debug());
});
