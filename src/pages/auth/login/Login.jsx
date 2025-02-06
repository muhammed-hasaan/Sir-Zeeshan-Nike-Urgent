import  { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Spin,
  message,
} from "antd";
import {  useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const handleLogin = async (values) => {
   const email = 'admin@gmail.com'
   const pass = '1234567890'

   if (email === values.email && pass === values.password) {
    localStorage.setItem('isActive','true')
    navigate('/').then(() => window.location.reload())
   }else {
    message.error('Invalid Cred ')
   }
   
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", background: "#f4f4f4" }}
    >
      <Col xs={22} sm={14} md={12} lg={10} xl={8}>
        <Card
          title={
            <Title level={3} style={{ textAlign: "center" }}>
              Login
            </Title>
          }
          bordered={false}
          style={{
            borderRadius: "10px",
            padding: "24px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
          }}
        >
          <Form
            name="login"
            onFinish={handleLogin}
            layout="vertical"
            disabled={disabled}
          >
            {/* Email Field */}
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input className="inp" placeholder="Enter your email" />
                </Form.Item>
              </Col>
            </Row>

            {/* Password Field */}
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    className="inp"
                    placeholder="Enter your password"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Remember Me Checkbox */}
            {/* <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            {/* Login Button */}
            <Form.Item>
              <Button
                type={disabled ? "" : "primary"}
                htmlType="submit"
                block
                disabled={disabled}
                style={
                  disabled
                    ? {
                        border: "1px solid #000",
                        background: "transparent",
                      }
                    : {}
                }
              >
                {disabled ? (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          color: "#000",
                        }}
                        spin
                      />
                    }
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
