
const Dashboard = () => {
    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">Dashboard</h2>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            Products
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                iPhone 14 Pro
                                <span className="badge bg-success rounded-pill">12 in stock</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Samsung Galaxy S23
                                <span className="badge bg-success rounded-pill">8 in stock</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                MacBook Air M2
                                <span className="badge bg-warning rounded-pill">3 in stock</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-secondary text-white">
                            Orders
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <strong>#1001</strong> - John Doe - <span className="badge bg-info">Processing</span>
                            </li>
                            <li className="list-group-item">
                                <strong>#1002</strong> - Jane Smith - <span className="badge bg-success">Completed</span>
                            </li>
                            <li className="list-group-item">
                                <strong>#1003</strong> - Bob Lee - <span className="badge bg-danger">Cancelled</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
