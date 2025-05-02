// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

// يمكنك تعديل هذا لاحقًا ليتحقق من JWT من localStorage
const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token; // يرجع true إذا فيه توكن
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
