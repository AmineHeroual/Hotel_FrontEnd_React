// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default PrivateRoute;
