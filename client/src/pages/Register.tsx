import axios from "axios";
import { useState } from "react"

const Register = () => {
    const [ registerData, setRegisterData ] = useState({
        email: '',
        password: ''
    });

    const [ response, setResponse ] = useState('');

    const handleChange = (e:any) => {
        setRegisterData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleRegisterSubmint = async (e:any) => {
        e.preventDefault();
        try {
            const res = await axios
                .post('http://localhost:8000/api/auth/register/', registerData);
            console.log(res.data);
            setResponse(res.data.message + '. Please login!');
        } catch (err:any) {
            console.log('err:', err);
            setResponse(err.response?.data?.error || 'Registration Failed');
        }
    }

    return <>
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmint} 
            className="container mt-4" 
            style={{ maxWidth: 400 }} >
            <div className="mb-3">
            <input
                name="email"
                type="email"
                className="form-control"
                onChange={handleChange}
                value={registerData.email}
                placeholder="Email"
                autoComplete="email"
            />
            </div>
            <div className="mb-3">
            <input
                name="password"
                type="password"
                className="form-control"
                onChange={handleChange}
                value={registerData.password}
                placeholder="Password"
                autoComplete="new-password"
            />
            </div>
            <button type="submit" 
                className="btn btn-primary w-100">
                Register
            </button>
            <span className="d-block my-2 text-danger">{ response }</span>
            <a href="/login" 
                className="btn btn-outline-secondary w-100 mt-2">
                Already have an account? Login
            </a>
        </form>
    </>
}

export default Register
