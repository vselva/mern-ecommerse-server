import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Logout from "./pages/Logout"
import { useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import PrivateRoute from "./routes/PrivateRoute"
import NotFound from "./pages/404"
import Products from "./pages/Products"
import Orders from "./pages/Orders"

function App() {

    const { } = useAuth();
    return (<>
        <Router>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <Routes>
                        <Route path="/" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/products" element={<Products />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="*" element={ <NotFound /> } />
                    </Routes>
                </div>
            </div>
        </Router>
    </>);
}

export default App
