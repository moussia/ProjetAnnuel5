import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/contexts/AuthContext';
import * as React from 'react';

const PrivateRoute = ({ Component, restricted = false }) => {
    const { context } = useContext(AuthContext);

    if (!context.isLoggedIn) return (<Navigate to={{ pathname: '/login' }} replace />);
    if (restricted && context.role !== restricted) {
        return (<Navigate to={{ pathname: '/' }} replace />)
    };

    return (<Component />);
};

export default PrivateRoute;