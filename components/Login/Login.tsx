import type {NextPage} from 'next';
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { postAuth } from '../../services/auth';

//TODO STYLES
// TODO ERROR

const Login: NextPage = () => {

  const [error, setError]= useState(false)

  const onFinish = async (values: any) => {
  const token:any = await postAuth(values)
  console.log(token.ok)
  if(!token.ok){
    return setError(!token.ok)
  }
  else{
    setError(!token.ok)
    localStorage.setItem('token', token.token)
//navegacion a otro lado
  }
}
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:');
      };

    return (
        <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your Email!', pattern: /\S+@\S+\.\S+/, whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password, min 6 and max 20!', whitespace: true, min: 6, max: 20 }]}
      >
        <Input.Password />
      </Form.Item>
      {error ? <Form.Item>
    <p>User or password incorret</p>
  </Form.Item>: null}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
}

export default Login
