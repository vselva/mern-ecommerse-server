import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [ loginFormData, setLoginFormData ] = useState({
        email: '',
        password: ''
    });

    const [ responseMessage, setResponseMessage ] = useState('');

    const handleChange = (e:any) => {
        setLoginFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = async (e:any) => {
        e.preventDefault();
        console.log('submitHandler');
        try {
            const res = await axios
                .post(
                    'http://localhost:8000/api/auth/login/',
                    loginFormData
                );
            const token = res.data.token;
            console.log('token:', token);
            navigate("/dashboard");
        } catch (err:any) {
            console.log(err.response?.data?.error);
            setResponseMessage(err.response?.data?.error);
        }       
    }

    return <>
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h2 className="mb-4 text-center">Login</h2>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={loginFormData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={loginFormData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
            <span 
                className="d-block my-2 text-center text-warning">
                { responseMessage }
            </span>


            <div className="text-center mt-3">
                <span>
                    <a href="/register"
                        className="btn btn-outline-secondary w-100">
                        Don't have an account? Register
                    </a>
                </span>
            </div>
           
        </div>
    </>
}

export default Login;
