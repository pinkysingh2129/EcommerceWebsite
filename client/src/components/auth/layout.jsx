
import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-black">
        <div className="max-w-md text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Ecommerce Shopping
            </h1>
        </div>
        </div>

      {/* Right Section */}
        <div className="flex flex-1 items-center justify-center bg-gray-100">
        <Outlet />
        </div>
    </div>
    );
}

export default AuthLayout;

