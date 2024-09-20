/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { isUserLoggedIn, storeUserInfo } from "@/services/auth.service";
import { LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./login.css";

const Login = () => {
  const [useEmail, setUseEmail] = useState(true);
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const userLoggedIn = isUserLoggedIn();

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/user");
    }
  }, [router, userLoggedIn]);

  const onFinish = async (values: any) => {
    const res = await userLogin({
      username: values?.email,
      password: values?.password,
    });

    if (res?.error) {
      message.error("Wrong Credentials");
    } else {
      storeUserInfo({ access_token: res?.data?.data?.access_token });
      router.push("/user");
    }
  };

  return (
    <div className="login-form-parent-container">
      <div className="login-style-cotainer">
        <div className="login-form-child-container">
          {/* logo container  */}

          <h2
            style={{ color: "white", fontWeight: "500", paddingBottom: "15px" }}
          >
            Sign In
          </h2>

          {/* form container  */}
          <div className="form container">
            <Form
              name="login"
              onFinish={onFinish}
              style={{ maxWidth: 300, margin: "0 auto" }}
              className="input-container"
            >
              {useEmail ? (
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your E-mail or username!",
                    },
                  ]}
                >
                  <Input
                    className="input-field-login"
                    prefix={<MailOutlined />}
                    placeholder="Email or username"
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      pattern: /^\d{10}$/,
                      message: "The input is not valid phone number!",
                    },
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    className="input-field-login"
                    prefix={<PhoneOutlined />}
                    placeholder="Phone Number"
                  />
                </Form.Item>
              )}
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
                className="common-style"
              >
                <Input.Password
                  className="input-field-login"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{
                    width: "100%",
                    color: "black",
                    backgroundColor: "#FFBF00",
                    height: "40px",
                  }}
                  className="common-style"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
