/* eslint-disable @next/next/no-img-element */
import { removeUserInfo } from "@/services/auth.service";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import "./UserRouteStyle.css";

const { Option } = Select;


interface MenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const RightNav:React.FC<MenuProps> =({ isOpen, closeMenu })=> {
  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    console.log(`selected ${value}`);
  };

  const handleButtonClick = () => {
    console.log("Button in option clicked");
  };

  const handleLogOut = () =>{
    removeUserInfo();
     router.push("/login");
  }


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
          <li>Admins -</li>
          <li>Category -</li>
          <li>Payments -</li>
          <li>Customization -</li>
          <li>Declined Events -</li>
          <li onClick={() => handleLogOut()}>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default RightNav