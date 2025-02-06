import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Load products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const openModal = (product = null) => {
    setEditProduct(product);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditProduct(null);
  };

  // const handleFormSubmit = async (values) => {
  //   if (editProduct) {
  //     // Update existing product
  //     const updatedProducts = products.map((product) =>
  //       product._id === editProduct._id ? { ...product, ...values } : product
  //     );
  //     localStorage.setItem("products", JSON.stringify(updatedProducts));
  //     setProducts(updatedProducts);
  //     message.success("Product updated successfully!");
  //   } else {
  //     // Add new product
  //     const newProduct = { ...values, _id: Date.now() }; // Generating _id as timestamp
  //     const updatedProducts = [...products, newProduct];
  //     localStorage.setItem("products", JSON.stringify(updatedProducts));
  //     setProducts(updatedProducts);
  //     message.success("Product added successfully!");
  //   }
  //   closeModal();
  // };


  const handleFormSubmit = async (values) => {
    if (editProduct) {
      // Update the specific product
      const updatedProducts = products.map((product) =>
        product._id === editProduct._id ? { ...product, ...values } : product
      );
      
      // Update localStorage with the new products list
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      
      // Set the products state to the updated list
      setProducts(updatedProducts);
      
      message.success("Product updated successfully!");
    } else {
      // Add new product logic (same as before)
      const newProduct = { ...values, _id: Date.now() }; // Generating _id as timestamp
      const updatedProducts = [...products, newProduct];
      
      // Update localStorage with the new products list
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      
      // Set the products state to the updated list
      setProducts(updatedProducts);
      
      message.success("Product added successfully!");
    }

    // Close the modal after submit
    closeModal();
};

  const handleDelete = async (id) => {
    const updatedProducts = products.filter((product) => product._id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    message.success("Product deleted successfully!");
  };

  const columns = [
   
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    { title: "Stock", dataIndex: "qty", key: "qty" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Products Management
      </h2>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 768 }}
      />

      <Modal
        title={editProduct ? "Edit Product" : "Add Product"}
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          initialValues={editProduct || { name: "", price: 0, qty: 0 }}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item name="name" label="Product Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="oldPrice"
            label="Old price"
            style={{
              width: "20%",
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="qty" label="Stock">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editProduct ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
