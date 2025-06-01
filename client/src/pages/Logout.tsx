import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const doLogout = async () => {
            await logout();
            navigate('/login')
        }
        
        doLogout();
    }, [Logout, navigate]);
    return <>
        <h2>Loggint out...</h2>
    </>
}

export default Logout;
