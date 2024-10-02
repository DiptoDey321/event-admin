"use client"

import { useGetDashboardTotalCountQuery } from "@/redux/api/authApi";
import {
  CalendarOutlined,
  DollarOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const DashboardOverview = () =>{
      const { data, error, isLoading } =
        useGetDashboardTotalCountQuery(undefined);
        
  return (
    <div style={{ paddingTop: "32px" }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <ShoppingOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Total Orders</h3>
            <p>{data?.data?.total_orders == ''? 0 : data?.data?.total_orders}</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <UserOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Total Users</h3>
            <p>{data?.data?.total_users == ''? 0 : data?.data?.total_users}</p>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <UserOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Total Sell Tickets</h3>
            <p>{data?.data?.total_sell_ticket == "" ? 0 : data?.data?.total_sell_ticket}</p>
          </Card>
        </Col>
      </Row>

      <h3 style={{ color: "white", paddingBottom: "10px", paddingTop: "20px" }}>
        Events
      </h3>
      <hr />
      <Row gutter={[32, 32]} style={{ paddingTop: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <CalendarOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Total Events</h3>
            <p>
              {data?.data?.total_events?.total == ""
                ? 0
                : data?.data?.total_events?.total}
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <CalendarOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Approved Events</h3>
            <p>
              {" "}
              {data?.data?.total_events?.approved_events == ""
                ? 0
                : data?.data?.total_events?.approved_events}
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <CalendarOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Pending Events</h3>
            <p>
              {" "}
              {data?.data?.total_events?.pending_events == ""
                ? 0
                : data?.data?.total_events?.pending_events}
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <CalendarOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Rejected Events</h3>
            <p>
              {" "}
              {data?.data?.total_events?.rejected_events == ""
                ? 0
                : data?.data?.total_events?.rejected_events}
            </p>
          </Card>
        </Col>
      </Row>

      <h3 style={{ color: "white", paddingBottom: "10px", paddingTop: "20px" }}>
        Finance Report
      </h3>
      <hr />

      <Row gutter={[32, 32]} style={{ paddingTop: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <DollarOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Charged Amount</h3>
            <p>{data?.data?.total_sell?.charge_amount_sum == ''? 0 : data?.data?.total_sell?.charge_amount_sum}</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <DollarOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Paid Amount</h3>
            <p>{data?.data?.total_sell?.paid_amount_sum == '' ? 0 :data?.data?.total_sell?.paid_amount_sum  }</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card bordered={false}>
            <DollarOutlined style={{ fontSize: "24px", color: "#40a9ff" }} />
            <h3 style={{ paddingTop: "10px" }}>Stored Amount</h3>
            <p>{data?.data?.total_sell?.store_amount_sum == ''? 0 :data?.data?.total_sell?.store_amount_sum }</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardOverview