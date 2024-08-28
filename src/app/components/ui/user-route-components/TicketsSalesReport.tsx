import { useFetchApprovedEventsQuery, useGetSaleOrderQuery } from "@/redux/api/eventsApi";
import type { TableColumnsType } from "antd";
import { Modal, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";

const TicketsSalesReport = () => {

  const { data, error, isLoading } = useFetchApprovedEventsQuery(undefined);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

   const {
     data: saleOrderData,
     error: saleOrderError,
     isLoading: isSaleOrderLoading,
   } = useGetSaleOrderQuery(selectedEventId, {
     skip: !selectedEventId, 
   });

  interface DataType {
    _id: string;
    key: string;
    title: string;
    address: string;
    venue_name: string;
    event_email: string;
    event_start_date_time: string;
    event_end_date_time: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 100,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "User Name",
      dataIndex: "created_by",
      key: "created_by",
      render: (created_by) =>
        `${created_by.first_name} ${created_by.last_name}`,
      width: 200,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 250,
    },
    {
      title: "Venue Name",
      dataIndex: "venue_name",
      key: "venue_name",
      width: 200,
    },
    {
      title: "User Email",
      dataIndex: "event_email",
      key: "event_email",
      width: 200,
    },
   
    {
      title: "Event Start Time",
      dataIndex: "event_start_date_time",
      key: "event_start_date_time",
      width: 200,
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Event End Time",
      dataIndex: "event_end_date_time",
      key: "event_end_date_time",
      width: 200,
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  const handleRowClick = (record: any) => {
    setSelectedEventId(record._id);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (saleOrderData?.data) {
      const formattedData = saleOrderData?.data?.map((item: any) => ({
        date:moment(item.created_at).format("MMM D YYYY"),

        price: item.paid_amount,
      }));
      setChartData(formattedData);
    }
  }, [saleOrderData]);


  console.log(chartData);
  
  
  return (
    <div>
      <Table
        style={{ cursor: "pointer", transition: "background-color 0.3s ease" }}
        scroll={{ x: 1200, y: 400 }}
        columns={columns}
        dataSource={data?.data}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record);
          },
        })}
      />

      <Modal
        title="Sale Order Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={800}
      >
        {isSaleOrderLoading && <p>Loading chart data...</p>}
        {chartData && <BarChart data={chartData}/>}
      </Modal>
    </div>
  );
};

export default TicketsSalesReport;
