import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {

  return <>
    <div className="container mt-5">
        <div className="row">
            <Router>
                <Routes>
                    <Route 
                        path="/register" 
                        element={ <Register /> } />
                    <Route 
                        path="/login" 
                        element={ <Login /> } />
                    <Route 
                        path="/dashboard" 
                        element={ <Dashboard /> } />
                </Routes>
            </Router>
        </div>
    </div>
  </>
}

export default App
