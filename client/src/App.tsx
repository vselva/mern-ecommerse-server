import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Register from "./pages/register"

function App() {

  return <>
    <div className="container mt-5">
        <div className="row">
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    </div>
  </>
}

export default App
