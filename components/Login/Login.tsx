import type { NextPage } from "next";
import { Form, Input, Button, Space } from "antd";
import { useState } from "react";
import { postAuth } from "../../services/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SocketIOClient from "socket.io-client";
//TODO STYLES
// TODO ERROR

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface onFinishProps {
  email: string;
  password: string;
}

interface Token {
  ok: boolean;
  token: string;
}

const Login: NextPage<Props> = ({ setIsLogin }) => {
  const [error, setError] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    const socket = SocketIOClient.connect(process.env.URL_API, {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      setIsConnected(true);
      console.log(isConnected);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log(isConnected);
    });
    socket.on("status", (data: any) => {
      console.log("hello", data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  });

  const onFinish = async (values: onFinishProps) => {
    const token: Token = await postAuth(values);
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
    console.log("error", errorInfo);
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
              <Input className="form-input" />
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
              <Input.Password className="form-input" />
            </Form.Item>
            {error ? (
              <Form.Item style={{ color: "#ff4d4f" }}>
                <p>Incorrect user or password!</p>
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
