import type { NextPage } from "next";
import { Form, Input, Button, Space } from "antd";
import { useState } from "react";
import { postAuth } from "../../services/auth";
import { useRouter } from "next/router";

//TODO STYLES
// TODO ERROR

const Login: NextPage<any> = ({ setIsLogin }) => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    const token: any = await postAuth(values);
    console.log(token.ok);
    if (!token.ok) {
      return setError(!token.ok);
    } else {
      setError(!token.ok);
      localStorage.setItem("token", token.token);
      router.push("/chat");
      //navegacion a otro lado
    }
  };

  const toRegister = () => {
    setIsLogin(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:");
  };

  return (
    <>
      <section className="container__login">
        <div style={{ display: "inline-block" }}>
          {/* <Space align="end"> */}
          <h3 className="title_violet_thin">Welcome to</h3>
          <h1 className="title_pink_bold">Chat-app</h1>
          {/* </Space> */}
        </div>
        <div>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="form"
          >
            <Form.Item
              label="Email"
              name="email"
              className="form-label"
              // labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                  pattern: /\S+@\S+\.\S+/,
                  whitespace: true,
                },
              ]}
            >
              <Input className="form-input" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              // labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your password, min 6 and max 20!",
                  whitespace: true,
                  min: 6,
                  max: 20,
                },
              ]}
            >
              <Input.Password className="form-input" />
            </Form.Item>
            {error ? (
              <Form.Item>
                <p>User or password incorret</p>
              </Form.Item>
            ) : null}

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" className="login-btn">
                Submit
              </Button>
            </Form.Item>

            <Form.Item>
              <p className="text_violet_thin">¿Do not have an account? </p>
              <a className="text_pink_thin" onClick={toRegister}>
                {" "}
                Create Account{" "}
              </a>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
