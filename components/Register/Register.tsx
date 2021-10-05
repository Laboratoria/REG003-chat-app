import type { NextPage } from "next";
import { postUser } from "../../services/user";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import React from "react";
//TODO STYLES
// DONE ERROR
interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface onFinishProps {
  email: string;
  password: string;
  username: string;
}

interface userResponse {
  ok: boolean;
  message: string;
}

const Register: NextPage<Props> = ({ setIsLogin }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values: onFinishProps) => {
    const user: userResponse = await postUser(values);
    console.log("USER", user);
    if (!user.ok) {
      setErrorMessage(user.message);
      return setError(!user.ok);
    } else {
      setError(!user.ok);
      //navegacion a otro lado
    }
  };

  const toLogin = () => {
    setIsLogin(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <section className="register">
        <div className="register__header">
          <h2>Welcome to</h2>
          <h3>Chat-app</h3>
        </div>
        <p>Create account</p>
        <div className="register__body">
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                  pattern: /\S+@\S+\.\S+/,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              labelCol={{ span: 24 }}
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
              <Input.Password />
            </Form.Item>

            {error ? (
              <Form.Item style={{ color: "#ff4d4f" }}>
                <p>{errorMessage}</p>
              </Form.Item>
            ) : null}
            <br />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <p className="paragraph">¿Have an account? </p>
              <a onClick={toLogin} className="paragraph__pink">
                {" "}
                Log In{" "}
              </a>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};
export default Register;
