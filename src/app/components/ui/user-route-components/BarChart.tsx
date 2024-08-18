import React from "react";
import "./UserRouteStyle.css";
import dynamic from "next/dynamic";
import { Select } from "antd";
const Area = dynamic(
  () => import("@ant-design/plots").then(({ Area }) => Area),
  {
    ssr: false,
  }
);

const BarChart = ({data}:any) => {
  const config = {
    data: data,
    xField: (d: any) => new Date(d.date),
    yField: "price",
    style: {
      fill: "linear-gradient(-90deg, white 0%, #ffbf00 100%)",
    },
    axis: {
      y: { labelFormatter: "~s" },
    },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };

  
  return (
    <div>
      <div style={{ height: "300px", paddingTop:"20px" }}>
        <Area {...config} />
      </div>
    </div>
  );
};

export default BarChart;
