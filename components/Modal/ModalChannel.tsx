import type { NextPage } from "next";
import { Modal, Form, Input, Button } from "antd";

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
}

const ModalChannel: NextPage<Props> = ({
  setIsModalVisible,
  isModalVisible,
}) => {
    console.log('hola mundo');
    
  const handleOk = () => {
    console.log("line13ok", isModalVisible);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    
    setIsModalVisible(false);
  
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Create new Channel"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
      name="basic"

      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="name"
        name="name"
        labelCol={{ span: 24 }}
        rules={[{ required: true, message: `Please type in the channel's name. !` }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="description"
        name="descriptio"
        labelCol={{ span: 24 }}
        rules={[{ required: true, message: 'Please input your description!' }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
    </Modal>
  );
};

export default ModalChannel;
