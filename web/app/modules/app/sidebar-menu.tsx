import * as React from "react";
import { Link } from "react-router-dom";

export const SidebarMenu = () => {
      return <div className="sidebar-menu">
         <Link to="/i" >
            Dashboard
         </Link>
         <Link to="/i/self" >
            Profile
         </Link>
         <Link to="/logout" >
            Log Out
         </Link>
      </div>;
   }
