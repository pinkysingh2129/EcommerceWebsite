import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout(){
    return(
        <div className="flex min-h-screen w-full flex-1 flex-col"> 
                <ShoppingHeader/> 
            <main className=" flex flex-col w-full"> 
                <Outlet/>
            </main> 
        </div>
    );
}

export default ShoppingLayout;

{/*flex flex-col bg-white overflow-hidden */}