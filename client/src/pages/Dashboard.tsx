import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const { isAuthenticated } = useAuth();

    return <>
        <h2>Dashboard</h2>
    </>
}

export default Dashboard;
