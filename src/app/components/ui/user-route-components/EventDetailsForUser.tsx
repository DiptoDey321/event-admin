import {
  useFetchEventByIdQuery,
  useFetchEventsQuery,
  useUpdateEventStatusMutation,
} from "@/redux/api/eventsApi";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, message, Modal, Space, Spin, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import EventModal from "../event/EventModal";

interface DataType {
  _id: string;
  key: string;
  created_by: {
    first_name: string;
    last_name: string;
  };
  title: string;
  address: string;
  venue_name: string;
  event_email: string;
  description: string;
  event_start_date_time: string;
  event_end_date_time: string;
  event_status: string;
  phone: string;
}

type DataIndex = keyof DataType;

const EventDetailsForUser: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [updateEventStatus] = useUpdateEventStatusMutation();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    data: eventDetails,
    error: eventDetailsError,
    isLoading: eventDetailsLoading,
  } = useFetchEventByIdQuery(selectedEventId as string, {
    skip: !selectedEventId,
  });

  const { data, error, isLoading } = useFetchEventsQuery(undefined);

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

  const transformData = (dataArray: any) => {
    return dataArray?.map((item: any, index: any) => ({
      index: index + 1,
      created_by: ` ${item.created_by.first_name} ${item.created_by.last_name}`,
      title: item.title,
      address: item.address,
      venue_name: item.venue_name,
      event_email: item.event_email || item.phone, 
      description: item.description,
      event_start_date_time: item.event_start_date_time,
      event_end_date_time: item.event_end_date_time,
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
      title: "User",
      dataIndex: "created_by",
      key: "created_by",
      width: 200,
      ...getColumnSearchProps("created_by"),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      ...getColumnSearchProps("title"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 250,
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Venue Name",
      dataIndex: "venue_name",
      key: "venue_name",
      width: 200,
      ...getColumnSearchProps("venue_name"),
    },
    {
      title: "User Email / Phone",
      dataIndex: "event_email",
      key: "event_email",
      width: 200,
    },
    {
      title: "Event Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
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
    {
      title: "Event Status",
      dataIndex: "event_status",
      key: "event_status",
      width: 200,
      render: (text) => {
        let color = "black";
        if (text === "approved") {
          color = "green";
        } else if (text === "declined") {
          color = "red";
        } else if (text === "pending") {
          color = "orange";
        }
        return (
          <span style={{ color }}>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {record.event_status != "approved" && (
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleApprove(record?._id);
              }}
              style={{ marginRight: 8 }}
            >
              Approve
            </Button>
          )}

          {record.event_status != "rejected" && (
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation(); 
                handleReject(record?._id);
              }}
              style={{ marginRight: 8 }}
            >
              Reject
            </Button>
          )}

          {record.event_status != "pending" && (
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation(); 
                handlePending(record?._id);
              }}
              style={{ marginRight: 8 }}
            >
              Pending
            </Button>
          )}
        </div>
      ),
    }
  ];

  const handleApprove = async (key: string) => {
    const res = await updateEventStatus({ id: key, status: "approved" });
    message.success("Approved !");
  };

  const handleReject = async (key: string) => {
    const res = await updateEventStatus({ id: key, status: "rejected" });
    message.warning("Rejected !");
  };

  const handlePending = async (key: string) => {
    const res = await updateEventStatus({ id: key, status: "pending" });
    message.warning("On Pending !");
  };

  const handleDelete = (key: string) => {
    console.log("Deleted:", key);
  };

  const handleRowClick = (record: any) => {
    setSelectedEventId(record._id);
    setIsModalVisible(true);
  };

  const handleCanel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="">
        <Table
          style={{
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          scroll={{ x: 1200, y: 400 }}
          columns={columns}
          dataSource={transformData(data?.data)}
          onRow={(record) => ({
            onClick: () => {
              handleRowClick(record);
            },
          })}
        />
      </div>

      <Modal
        title="Event Details"
        visible={isModalVisible}
        onCancel={() => handleCanel()}
        footer={null}
        centered
        width={900}
      >
        <div style={{ maxHeight: "450px", overflowY: "scroll" }}>
          {eventDetailsLoading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50px",
              }}
            >
              <Spin />
            </div>
          )}
          {eventDetails?.data && (
            <EventModal eventDetails={eventDetails?.data}></EventModal>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EventDetailsForUser;
