// import { useState } from "react";
// import {
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   DatePicker,
//   Checkbox,
//   Row,
//   Col,
// } from "antd";
// import Button from "../../../components/button/Button";

// const { Option } = Select;

// const AddProduct = () => {
//   const [form] = Form.useForm();
  
//   // onFinish function to handle form submission
//   const onFinish = async (values) => {
//     console.log(values);

//     // Get the existing products array from localStorage (or create an empty array if not found)
//     const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

//     // Add the new product to the array
//     existingProducts.push(values);

//     // Save the updated array back to localStorage
//     localStorage.setItem("products", JSON.stringify(existingProducts));

//     // Optionally, clear the form after submission
//     form.resetFields();
//   };

//   return (
//     <div style={{ padding: "24px", background: "#f4f4f4", minHeight: "100vh" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
//         Add New Product
//       </h2>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         style={{
//           maxWidth: "800px",
//           margin: "0 auto",
//           background: "#fff",
//           padding: "24px",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         }}
//       >
//         {/* Other form fields (Product Name, Description, etc.) */}
        
//         {/* Product Name */}
//         <Form.Item
//           label="Product Name"
//           name="name"
//           rules={[{ required: true, message: "Please enter product name" }]}
//         >
//           <Input placeholder="Enter product name" />
//         </Form.Item>

//         {/* Description */}
//         <Form.Item
//           label="Description"
//           name="desc"
//           rules={[{ required: true, message: "Please enter description" }]}
//         >
//           <Input.TextArea placeholder="Enter product description" rows={4} />
//         </Form.Item>

//         {/* Price */}
//         <Form.Item
//           label="Price"
//           name="price"
//           rules={[{ required: true, message: "Please enter price" }]}
//         >
//           <InputNumber
//             min={0}
//             placeholder="Enter price"
//             style={{ width: "100%" }}
//           />
//         </Form.Item>

//         {/* Categories */}
//         <Form.Item
//           label="Categories"
//           name="categories"
//           rules={[{ required: true, message: "Please select categories" }]}
//         >
//           <Select mode="tags" placeholder="Select categories">
//             <Option value="electronics">Electronics</Option>
//             <Option value="fashion">Fashion</Option>
//             <Option value="home-appliances">Home Appliances</Option>
//           </Select>
//         </Form.Item>

//         {/* Quantity */}
//         <Form.Item
//           label="Quantity"
//           name="qty"
//           rules={[{ required: true, message: "Please enter quantity" }]}
//         >
//           <InputNumber
//             min={0}
//             placeholder="Enter quantity"
//             style={{ width: "100%" }}
//           />
//         </Form.Item>

//         {/* Is Stock Available */}
//         <Form.Item name="isStock" valuePropName="checked">
//           <Checkbox>In Stock</Checkbox>
//         </Form.Item>

//         {/* Submit Button */}
//         <Form.Item>
//           <Button htmlType="submit" style={{ width: "100%" }}>
//             Add Product
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default AddProduct;

import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Row,
  Col,
} from "antd";
import Button from "../../../components/button/Button";

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();

  // onFinish function to handle form submission
  const onFinish = async (values) => {
    console.log(values);

    // Generate a random ID for the new product (using Date.now() to ensure uniqueness)
    const newProduct = {
      ...values,
      _id: Date.now(), // This generates a unique ID based on current timestamp
    };

    // Get the existing products array from localStorage (or create an empty array if not found)
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Add the new product to the array
    existingProducts.push(newProduct);

    // Save the updated array back to localStorage
    localStorage.setItem("products", JSON.stringify(existingProducts));

    // Optionally, clear the form after submission
    form.resetFields();
  };

  return (
    <div style={{ padding: "24px", background: "#f4f4f4", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
        Add New Product
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Other form fields (Product Name, Description, etc.) */}

        {/* Product Name */}
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea placeholder="Enter product description" rows={4} />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            min={0}
            placeholder="Enter price"
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Categories */}
        <Form.Item
          label="Categories"
          name="categories"
          rules={[{ required: true, message: "Please select categories" }]}
        >
          <Select mode="tags" placeholder="Select categories">
            <Option value="electronics">Electronics</Option>
            <Option value="fashion">Fashion</Option>
            <Option value="home-appliances">Home Appliances</Option>
          </Select>
        </Form.Item>

        {/* Quantity */}
        <Form.Item
          label="Quantity"
          name="qty"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber
            min={0}
            placeholder="Enter quantity"
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Is Stock Available */}
        <Form.Item name="isStock" valuePropName="checked">
          <Checkbox>In Stock</Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button htmlType="submit" style={{ width: "100%" }}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
