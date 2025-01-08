import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout.jsx"; 
import AuthLogin from "./pages/auth/login.jsx";   
import AuthRegister from "./pages/auth/register.jsx";
import AdminLayout from "./components/admin-view/layout.jsx";
import AdminOrders from "./pages/admin-view/orders.jsx";
import AdminFeatures from "./pages/admin-view/features.jsx";
import AdminDashboard from "./pages/admin-view/dashboard.jsx";
import AdminProduct from "./pages/admin-view/product.jsx";
import NotFound from "./pages/not-found/index.jsx";
import ShoppingLayout from "./components/shopping-view/layout.jsx";
import ShoppingAccount from "./pages/shopping-view/account.jsx";
import ShoppingCheckout from "./pages/shopping-view/checkout.jsx";
import ShoppingHome from "./pages/shopping-view/home.jsx";
import ShoppingList from "./pages/shopping-view/listing.jsx";
import CheckAuth from "./components/common/check-auth.jsx";
import UnauthPage from "./pages/unauth-page/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/index.js";


function App() {

  const{user , isAuthenticated} = useSelector(state=> state.auth);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>Header components</h1>
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout/>
          </CheckAuth>
        }> 
          <Route path="login" element={<AuthLogin/>}/>
          <Route path="register" element={<AuthRegister/>}/>
        </Route>
        <Route path="/admin" element={ <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AdminLayout/>
          </CheckAuth>}>
          <Route path="orders" element={<AdminOrders/>} />
          <Route path="features" element={<AdminFeatures/>} />
          <Route path="Dashboard" element={<AdminDashboard/>} />
          <Route path="product" element={<AdminProduct/>} />
        </Route>
        <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShoppingLayout/>
          </CheckAuth>
            } > 
          <Route path="account" element={<ShoppingAccount/>} />
          <Route path="checkout" element={<ShoppingCheckout/>} />
          <Route path="home" element={<ShoppingHome/>} />
          <Route path="listing" element={<ShoppingList/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
        <Route path="/unauth-page" element={<UnauthPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
