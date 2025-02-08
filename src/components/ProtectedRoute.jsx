import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export { ProtectedRoute, PublicRoute };
