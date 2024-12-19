import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";

function AdminLayout(){
    return(
        <div className="flex min-h-screen w-full"> {/*admin sidebar */}
        <AdminSideBar/>
            <div className=" flex flex-1 flex-col "> {/*admin header*/} 
            <AdminHeader/>
            <main className=" flex min-h-[90vh] w-[90vw] m-4 bg-muted/40 p-4 md:p-6"> <Outlet/>  </main> </div>
        </div>
    );
}

export default AdminLayout;

{/* flex-1 flex max-h-[300vh] max-w-[300vw] bg-muted/40 p-4 md:p-6*/ }