import { describe, vi } from "vitest";
import PrivateRoute from "./PrivateRoute";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";

// Mock the useAuth hook
vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
    AuthProvider: ({ children }) => <div>{children}</div>,
}));

// Mock components for testing
const ProtectedComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

// write test code for PrivateRoute component
describe("PrivateRoute", () => {
    test("Renders child component when authenticated", () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
        });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/protected" element={
                        <PrivateRoute>
                            <ProtectedComponent />
                        </PrivateRoute>
                    } />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it("Redirects to login when not authenticated", async() => {
        useAuth.mockReturnValue({
            isAuthenticated: false,
        });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/protected" element={
                        <PrivateRoute>
                            <ProtectedComponent />
                        </PrivateRoute>
                    } />
                    <Route path="/login" element={<LoginComponent />} />
                </Routes>
            </MemoryRouter>
        );
        expect(await screen.findByText('Login Page')).toBeInTheDocument();
    });
});
