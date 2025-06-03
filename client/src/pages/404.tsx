import React from "react";

const NotFound = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <h2 className="mb-3">Page Not Found!</h2>
                <p className="lead mb-4">
                    Sorry, the page you are looking for does not exist.<br />
                    Please check the URL and try again!
                </p>
                <a href="/" className="btn btn-primary">
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;