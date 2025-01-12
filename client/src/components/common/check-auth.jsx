import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
    console.log(location.pathname,isAuthenticated)

    // If not authenticated, redirect to login
    if (
        !isAuthenticated && 
        !(
        location.pathname.includes("/login") || 
        location.pathname.includes("/register")
    )
) {
    return <Navigate to="/auth/login" />;
    }

    // If user is authenticated and trying to access login/register, redirect to home or dashboard
    if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
    } else {
        return <Navigate to="/shop/home" />;
    }
    }

    // If the user is authenticated but trying to access admin routes with non-admin role
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
    }

    // If the user is authenticated and trying to access shop routes while admin
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
}


export default CheckAuth;
