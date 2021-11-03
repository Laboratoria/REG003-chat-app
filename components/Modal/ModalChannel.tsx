import type { NextPage } from "next";
import { Modal, Form, Input, Button, Radio } from "antd";
import { useState } from "react";
import FormItem from "antd/lib/form/FormItem";
import { postChannel } from "../../services/channels";

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
}

interface onFinishProps {
  nameChannel: string;
  description: string;
}

const ModalChannel: NextPage<Props> = ({
  setIsModalVisible,
  isModalVisible,
}) => {
  const onFinish = async (values: onFinishProps) => {
    const data = await postChannel(values);

    setIsModalVisible(false);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Create new Channel"
      visible={isModalVisible}
      okText="Create"
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        //onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="name"
          name="name"
          labelCol={{ span: 24 }}
          rules={[
            { required: true, message: `Please type in the channel's name. !` },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="description"
          name="description"
          labelCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChannel;
