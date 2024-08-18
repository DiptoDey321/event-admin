import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useFetchEventsQuery,
  useUpdateEventStatusMutation,
} from "@/redux/api/eventsApi";

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
}

type DataIndex = keyof DataType;

const EventDetailsForUser: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [updateEventStatus] = useUpdateEventStatusMutation();

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

  const columns: TableColumnsType<DataType> = [
    {
      title: "User",
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
      title: "User Email",
      dataIndex: "event_email",
      key: "event_email",
      width: 200,
      ...getColumnSearchProps("event_email"),
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
              onClick={() => handleApprove(record?._id)}
              style={{ marginRight: 8 }}
            >
              Approve
            </Button>
          )}

          {record.event_status != "rejected" && (
            <Button
              type="primary"
              onClick={() => handleReject(record?._id)}
              style={{ marginRight: 8 }}
            >
              Reject
            </Button>
          )}

          {record.event_status != "pending" && (
            <Button
              type="primary"
              onClick={() => handlePending(record?._id)}
              style={{ marginRight: 8 }}
            >
              Pending
            </Button>
          )}
        </div>
      ),
    },

    // {
    //   title: "Delete",
    //   key: "del",
    //   width: 100,
    //   fixed: "right",
    //   render: (_, record) => (
    //     <div style={{ display: "flex", gap: "10px" }}>
    //       <Popconfirm
    //         title="Are you sure to delete this item?"
    //         onConfirm={() => handleDelete(record?._id)}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button danger>
    //           <DeleteOutlined />
    //         </Button>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];

  const handleApprove = async(key: string) => {
    const res = await updateEventStatus({ id: key, status: "approved" });
    message.success("Approved !")    
  };

  const handleReject = async (key: string) => {
    const res = await updateEventStatus({ id: key, status: "rejected" });
    message.warning("Rejected !");
  };

  const handlePending = async(key: string) => {
     const res = await updateEventStatus({ id: key, status: "pending" });
     message.warning("On Pending !");
  };

  const handleDelete = (key: string) => {
    console.log("Deleted:", key);
  };

  return (
    <div>
      <div className="">
        <Table
          scroll={{ x: 1200, y: 400 }}
          columns={columns}
          dataSource={data?.data}
        />
      </div>
    </div>
  );
};

export default EventDetailsForUser;
