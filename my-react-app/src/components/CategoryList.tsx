// src/components/CategoryList.tsx
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../services/apiCategory";
import type { ICategoryItem } from "../services/types";
import { useState } from "react";
import { Table, Form, Input, Button, message, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CategoryList = () => {
  const { data: list, isLoading, refetch } = useGetCategoriesQuery(undefined);
  const [addCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleFinish = async (values: any) => {
    try {
      if (editingId) {
        await updateCategory({ id: editingId, ...values }).unwrap();
        message.success("Категорію оновлено");
        setEditingId(null);
      } else {
        await addCategory(values).unwrap();
        message.success("Категорію додано");
      }
      form.resetFields();
      refetch();
    } catch {
      message.error("Помилка при збереженні");
    }
  };

  const handleEdit = (item: ICategoryItem) => {
    setEditingId(item.id);
    form.setFieldsValue(item);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id).unwrap();
      message.success("Видалено");
      refetch();
    } catch {
      message.error("Помилка при видаленні");
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Слаг",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Опис",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Дії",
      key: "actions",
      render: (_: any, record: ICategoryItem) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mb-6"
      >
        <Form.Item
          name="name"
          label="Назва"
          rules={[{ required: true, message: "Введіть назву" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="slug"
          label="Слаг"
          rules={[{ required: true, message: "Введіть слаг" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Опис">
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {editingId ? "Оновити" : "Додати"}
            </Button>
            {editingId && (
              <Button
                onClick={() => {
                  form.resetFields();
                  setEditingId(null);
                }}
              >
                Скасувати
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>

      <Table
        dataSource={list}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        bordered
      />
    </div>
  );
};

export default CategoryList;
