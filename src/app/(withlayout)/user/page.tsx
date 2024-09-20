"use client"

import DashboardOverview from "@/app/components/ui/user-route-components/DashboardOverview";
import EventDetailsForUser from "@/app/components/ui/user-route-components/EventDetailsForUser";
import TicketsSalesReport from "@/app/components/ui/user-route-components/TicketsSalesReport";
import type { TabsProps } from "antd";
import { Tabs } from "antd";


const LoggedUser = () => {

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
      children: <TicketsSalesReport/>,
    },
  ];
  return (
    <div style={{padding:'0px 50px'}} className="dep-user-main-menu">
        <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
  );
};

export default LoggedUser;
