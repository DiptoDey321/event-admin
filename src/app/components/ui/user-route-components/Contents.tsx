"use client";
import { Layout } from "antd";
const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Content>{children}</Content>
    </div>
  );
};

export default Contents;
