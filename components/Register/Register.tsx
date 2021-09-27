import type {NextPage} from 'next';
import { postUser } from '../../services/user'
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
//TODO STYLES
// DONE ERROR
const Register: NextPage =  () => {
  const [error, setError]= useState(false)

  const onFinish = async (values: any) => {
  const user:any = await postUser(values)
  console.log(user.ok)
  if(!user.ok){
    return setError(!user.ok)
  }
  else{
    setError(!user.ok)
//navegacion a otro lado
  }

  };
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
      label="Name"
      name="username"
      rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your Email!', pattern: /\S+@\S+\.\S+/ ,whitespace: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password, min 6 and max 20!', whitespace: true, min: 6, max: 20 }]}
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
export default Register
