import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const PrivateRoute = ({ Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axios({ url: 'http://localhost:3003/user/current', withCredentials: true })
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    return (
        isAuthenticated !== null && (
            isAuthenticated
                ? <Component />
                : <Navigate to={{ pathname: '/login' }} replace />
        )
    )
};

export default PrivateRoute;