'use client'
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface Category {
  _id: string;
  title: string;
  parent_id?: string | null;
}


const CategoryPage =() => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  
  const [form] = Form.useForm();

  const showModal = (category: Category | null = null) => {
    setIsModalVisible(true);
    setCurrentCategory(category);
    setIsEditing(!!category);
    if (category) {
      form.setFieldsValue(category); 
    } else {
      form.resetFields();
    }
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      if (isEditing && currentCategory) {
        const result = await updateCategory({ id: currentCategory._id, categoryData: {"title" : values.title, "parent_id": ""}}).unwrap();
        if(result?.is_success){
          message.success("Category edited successfully")
        }
      } else {
        const result = await addCategory({"title" : values.title, "parent_id": ""}).unwrap();

        if(result?.is_success){
          message.success("New Category Added")
        }
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to save category", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteCategory(id).unwrap();
      if(result?.is_success){
        message.success('Deleted Successfully')
      }
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const columns: ColumnsType<Category> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 300,
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => showModal(record)}>Edit</Button>
          <Popconfirm title="Are you sure you want to delete this category?" onConfirm={() => handleDelete(record._id)}>
            <Button danger icon={<DeleteOutlined />} type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  console.log(data);
  

  return (
    <div style={{padding:'20px 50px 20px 50px'}}>
      <Button type="primary" onClick={() => showModal()}>Add Category</Button>
      
      <div style={{padding:'20px 0px 0px 0px'}}>
      <Table columns={columns} dataSource={data?.data} loading={isLoading} rowKey="_id" pagination={false} />
      </div>
      
      {/* Modal for Add/Edit Category */}
      <Modal
        title={isEditing ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleFormSubmit}
        centered
        footer={null}
      >
        <Form style={{padding: "20px"}} form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Category Title"
            rules={[{ required: true, message: 'Please enter category title' }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item name="parent_id" label="Parent Category (optional)">
            <Input />
          </Form.Item> */}

        <Form.Item style={{paddingTop: "10px"}}>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
          <Button onClick={() =>handleFormSubmit()}>Submit</Button>
          </div>
          </Form.Item>
        </Form>

         
      </Modal>
    </div>
  )
}

export default CategoryPage