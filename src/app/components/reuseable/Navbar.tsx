"use client";
import "./../ui/user-route-components/UserRouteStyle.css";
import { Badge, Button, Tabs } from "antd";
import { BellOutlined, BarsOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import { useState } from "react";
import EventDetailsForUser from "../ui/user-route-components/EventDetailsForUser";
import RightNav from "../ui/user-route-components/RightNav";
import DashboardOverview from "../ui/user-route-components/DashboardOverview";
import TicketsSalesReport from "../ui/user-route-components/TicketsSalesReport";
const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const openNotification = () => {
    console.log("hello");
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: <DashboardOverview />,
    },
    {
      key: "2",
      label: "Events",
      children: <EventDetailsForUser />,
    },
    {
      key: "3",
      label: "Tickets",
      children: <TicketsSalesReport />,
    },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="dep-user-header">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="180"
            height="40.552"
            viewBox="0 0 248.001 40.552"
          >
            <g id="logo-alter" transform="translate(-0.038 0)">
              <path
                id="Path_2673"
                data-name="Path 2673"
                d="M53.308,49.039H22.883a8.654,8.654,0,0,1-8.654-8.654V18.618a8.69,8.69,0,0,1,8.689-8.689h30.39v8.689H23.784a.85.85,0,0,0-.86.86v5.661H53.308v8.654H22.883v5.666a.891.891,0,0,0,.249.657.83.83,0,0,0,.611.249H53.308Z"
                transform="translate(-14.19 -9.145)"
                fill="#ffbf00"
              />
              <path
                id="Path_2674"
                data-name="Path 2674"
                d="M142.226,10l-16.7,35.816a6.536,6.536,0,0,1-2.576,2.9,7.371,7.371,0,0,1-3.838,1.018,7.574,7.574,0,0,1-3.864-.952,6.2,6.2,0,0,1-2.545-2.937L96,10h9.982l12.334,26.384a.784.784,0,0,0,.769.54.7.7,0,0,0,.769-.54L132.239,10Z"
                transform="translate(-54.337 -9.18)"
                fill="#ffbf00"
              />
              <path
                id="Path_2675"
                data-name="Path 2675"
                d="M231.408,49.039H201a8.654,8.654,0,0,1-8.654-8.654V18.618a8.353,8.353,0,0,1,2.545-6.144,8.364,8.364,0,0,1,6.144-2.545h30.405v8.689h-29.6a.85.85,0,0,0-.855.86v5.661h30.4v8.654H201v5.666a.871.871,0,0,0,.249.657.809.809,0,0,0,.606.249h29.524Z"
                transform="translate(-101.64 -9.145)"
                fill="#ffbf00"
              />
              <path
                id="Path_2676"
                data-name="Path 2676"
                d="M313,48.284h-8.654v-27.7a2.7,2.7,0,0,0-1.985-2.5,19.157,19.157,0,0,0-6.735-.835,19.885,19.885,0,0,0-6.73.789,2.666,2.666,0,0,0-1.939,2.545v27.7H278.3V19.675q0-6.368,5.014-9.071,4.108-2.214,12.329-2.214,8.084,0,12.38,2.392a9.447,9.447,0,0,1,5.014,8.893Z"
                transform="translate(-143.839 -8.39)"
                fill="#ffbf00"
              />
              <path
                id="Path_2677"
                data-name="Path 2677"
                d="M391.059,18.654H352V10h39.079Zm-15.18,30.42h-8.654V23.006h8.654Z"
                transform="translate(-180.022 -9.18)"
                fill="#ffbf00"
              />
              <path
                id="Path_2678"
                data-name="Path 2678"
                d="M429.076,12.68a6.154,6.154,0,0,1,5.966-3.93,6.232,6.232,0,0,1,6.007,3.93L457.72,48.46H448.19L435.856,22.031a.774.774,0,0,0-.814-.509.85.85,0,0,0-.769.509l-8.328,17.755h13.841l4.072,8.654H412.41Z"
                transform="translate(-209.681 -8.567)"
                fill="#ffbf00"
              />
            </g>
          </svg>
        </div>
        <div className="dep-user-menu">
          <p>Welcome, Super-Admin{}</p>
          {/* <Badge count={5}>
            <Button
              type="primary"
              shape="circle"
              icon={<BellOutlined />}
              onClick={openNotification}
            />
          </Badge> */}
          <Button
            type="primary"
            shape="circle"
            icon={<BarsOutlined />}
            onClick={toggleMenu}
          />
        </div>
      </div>

      <div className="dep-user-main-menu">
        <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
      </div>

      <div className="">
        <RightNav isOpen={menuOpen} closeMenu={closeMenu} />
        {menuOpen && <div className="backdrop" onClick={closeMenu} />}
      </div>
    </>
  );
};

export default Navbar;
