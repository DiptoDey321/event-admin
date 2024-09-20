/* eslint-disable @next/next/no-img-element */
import { removeUserInfo } from "@/services/auth.service";
import { message, Select } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from 'react';
import "./UserRouteStyle.css";

const { Option } = Select;


interface MenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const RightNav:React.FC<MenuProps> =({ isOpen, closeMenu })=> {
  const router = useRouter();

  const handleLogOut = () =>{
    removeUserInfo();
     router.push("/login");
  }

  const pathname = usePathname()


  return (
    <div className={`dep-menu ${isOpen ? "open" : ""}`} onClick={closeMenu}>
      <div className="dep-menu-content" onClick={(e) => e.stopPropagation()}>
        <div className="dep-organization-name-pic">
     

          <span style={{ fontSize: "20px" }}>Super-Admin</span>
          <div className="dep-profile-pic-container">
            <img
              src="https://i.ibb.co/M6yN563/blank-profile-picture-973460-960-720.webp"
              alt="dp image"
            />
          </div>
        </div>

        <div>
        
        </div>

        <ul>
          <li className={pathname == '/user' ? 'active-color' : ''} onClick={()=>location.href='/user'} >Home -</li>
          <li className={pathname == '/category' ? 'active-color' : ''} onClick={()=> location.href='/category'} >Category -</li>
          <li onClick={()=> message.info("Coming soon") }>Payments -</li>
          <li onClick={()=> message.info("Coming soon")}>Customization -</li>
          <li onClick={()=> message.info("Coming soon")}>Declined Events -</li>
          <li onClick={() => handleLogOut()}>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default RightNav