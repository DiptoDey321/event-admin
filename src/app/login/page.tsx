/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import "./login.css";
import { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { MailOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Login = () => {
  const [useEmail, setUseEmail] = useState(true);
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const res = await userLogin({
         username : values?.email,
          password: values?.password,
        }).unwrap();
          if (res?.is_success) {
          storeUserInfo({ access_token: res?.data?.access_token });
          router.push("/user");
        }

        console.log(res);
        
    } catch (error) {
      
    }
    console.log(values);
    
    // try {
    //   if (values.hasOwnProperty("phone")) {
    //     const res = await userLogin({
    //       iso_code: "BD",
    //       phone: values?.phone,
    //       password: values?.password,
    //       is_phone_selected: true,
    //     }).unwrap();
    //     if (res?.is_success) {
    //       storeUserInfo({ access_token: res?.data?.access_token });
    //       router.push("/user");
    //     }
    //   } else {
    //     const res = await userLogin({
    //       email: values?.email,
    //       password: values?.password,
    //       is_phone_selected: false,
    //     }).unwrap();
    //     if (res?.is_success) {
    //       storeUserInfo({ access_token: res?.data?.access_token });
    //       dispatch(
    //         forUserLoggedIn({
    //           user: res.data.user,
    //         })
    //       );
    //       router.push("/user");
    //     }
    //   }
    // } catch (error) {
    //   message.warning("invalid username or password");
    // }
  };

  return (
    <div className="login-form-parent-container">
      <div className="login-style-cotainer">
       
        
            <div className="login-form-child-container">
              {/* logo container  */}

              <h2 style={{ color: "white", fontWeight: "500", paddingBottom:"15px" }}>Sign In</h2>

              {/* btn container ==> email or phone */}
              {/* <div className="login-btn-container">
                <div
                  onClick={() => setUseEmail(true)}
                  style={{ marginRight: 8, cursor: "pointer" }}
                  className={`login-common-style ${
                    useEmail ? "btn-active-color " : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.5"
                    height="10.5"
                    viewBox="0 0 25.5 19.5"
                    className={`${useEmail ? "icon-active-color" : ""}`}
                  >
                    <path
                      id="Path_2710"
                      data-name="Path 2710"
                      d="M2329.469-221.7h-21.017a2.249,2.249,0,0,0-2.241,2.25v15a2.25,2.25,0,0,0,2.241,2.25h21.017a2.25,2.25,0,0,0,2.241-2.25v-15A2.248,2.248,0,0,0,2329.469-221.7Zm-.31,1.5-10.152,10.192-10.24-10.192Zm-21.455,15.44v-14.386l7.2,7.162Zm1.056,1.061,7.2-7.228,2.523,2.511a.745.745,0,0,0,1.054,0l2.46-2.47,7.161,7.189Zm21.455-1.061-7.161-7.189,7.161-7.19Z"
                      transform="translate(-2306.21 221.705)"
                      fill="white"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span>Email</span>
                </div>

                <span style={{ color: "#FFBF00", fontSize: "15px" }}>|</span>

                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setUseEmail(false)}
                  className={`login-common-style ${
                    !useEmail ? "btn-active-color " : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="12.5"
                    viewBox="0 0 23 33.5"
                    className={`${!useEmail ? "icon-active-colorq" : ""}`}
                  >
                    <path
                      id="mobile-svgrepo-com"
                      d="M16.5,29.25h.017M11.6,34.5h9.8c1.96,0,2.94,0,3.689-.382a3.5,3.5,0,0,0,1.529-1.53C27,31.84,27,30.86,27,28.9V8.6c0-1.96,0-2.94-.382-3.689a3.5,3.5,0,0,0-1.529-1.53C24.34,3,23.36,3,21.4,3H11.6c-1.96,0-2.94,0-3.689.381a3.5,3.5,0,0,0-1.53,1.53C6,5.66,6,6.64,6,8.6V28.9c0,1.96,0,2.94.381,3.689a3.5,3.5,0,0,0,1.53,1.53C8.66,34.5,9.64,34.5,11.6,34.5Z"
                      transform="translate(-5 -2)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Phone</span>
                </div>
              </div> */}

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
                        // {
                        //   type: "email",
                        //   message: "The input is not valid E-mail!",
                        // },
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

              {/* forget password  */}
              <div
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flex: "start",
                }}
                className="reset-password"
              >
                <span style={{ color: "#9399A3", fontSize: "14px" }}>
                  Forgot password?{" "}
                  <span
                    style={{
                      color: "#FFBF00",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Reset
                  </span>
                </span>
              </div>
            </div>
         

       
      </div>
    </div>
  );
};

export default Login;
