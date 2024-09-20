import { useFetchApprovedEventsQuery, useGetSaleOrderQuery } from "@/redux/api/eventsApi";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Modal, Space, Table } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import BarChart from "./BarChart";

const TicketsSalesReport = () => {

  const { data, error, isLoading } = useFetchApprovedEventsQuery(undefined);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  type DataIndex = keyof DataType;

   const {
     data: saleOrderData,
     error: saleOrderError,
     isLoading: isSaleOrderLoading,
   } = useGetSaleOrderQuery(selectedEventId, {
     skip: !selectedEventId, 
   });

   const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{ padding: 8, width: "250px" }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  interface DataType {
    _id: string;
    key: string;
    title: string;
    created_by : string
    address: string;
    venue_name: string;
    event_email: string;
    event_start_date_time: string;
    event_end_date_time: string;
  }

  const transformData = (dataArray: any) => {
    return dataArray?.map((item: any, index: any) => ({
      index: index + 1, // Adding 1 to start from 1 instead of 0
      created_by: `${item.created_by.first_name} ${item.created_by.last_name}`,
      title: item.title,
      address: item.address,
      venue_name: item.venue_name,
      event_email: item.event_email || item.phone, // Use email if available, otherwise phone
      description: item.description,
      event_start_date_time: moment(item.event_start_date_time).format('YYYY-MM-DD HH:mm:ss'),
      event_end_date_time: moment(item.event_end_date_time).format('YYYY-MM-DD HH:mm:ss'),
      event_status: item.event_status,
      _id: item._id,
    }));
  };

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
      // render: (created_by) =>
      //   `${created_by.first_name} ${created_by.last_name}`,
      width: 200,
      ...getColumnSearchProps("created_by"),
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
      // render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Event End Time",
      dataIndex: "event_end_date_time",
      key: "event_end_date_time",
      width: 200,
      // render: (text) => new Date(text).toLocaleString(),
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


  console.log(data?.data);
  
  
  return (
    <div>
      <Table
        style={{ cursor: "pointer", transition: "background-color 0.3s ease" }}
        scroll={{ x: 1200, y: 400 }}
        columns={columns}
        dataSource={transformData(data?.data)}
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
        {chartData.length> 0 ? <BarChart data={chartData}/> : 
        <div style={{height:"200px" , display:'flex', justifyContent: 'center' , alignItems:' center'}}>
          <p>No records available</p>
        </div>}
      </Modal>
    </div>
  );
};

export default TicketsSalesReport;
