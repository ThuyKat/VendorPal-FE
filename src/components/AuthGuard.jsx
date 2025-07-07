import { Navigate, Outlet } from 'react-router-dom';
import { hasPermission, isAuthenticated } from '../utils/auth';

function AuthGuard({ permission, fallbackPath = '/pos' }) {
    console.log("AuthGuard rendered with permission:", permission);
    if (!isAuthenticated()) {
        console.log("User is not authenticated, redirecting to login");
        return (
            <Navigate to="/login" 
            state={{message:"You must log in first"}}
            replace />
        );
}
    
    if (permission && !hasPermission(permission)) {
        return <Navigate to={fallbackPath} replace />;
    }
    
    return <Outlet/>;
}

export default AuthGuard;