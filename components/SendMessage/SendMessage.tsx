import { NextPage } from "next";
import React, { useState, useContext } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { postMessage } from "../../services/message";

const { TextArea } = Input;

interface Props {
  uid: number;
  channelId: number;
}

const SendMessage: NextPage<Props> = ({ uid, channelId }) => {
  const [value, setValue] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();

  const token = localStorage.getItem("token");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    setSubmitting(true);
    console.log(setSubmitting);
    if (!value) {
      console.log("emty");
    } else {
      const payload = {
        content: value,
        channelId,
        uid,
      };
      token ? postMessage(token, payload) : console.log("No token provided");
      form.resetFields(["message_input"]);
      setTimeout(() => setSubmitting(false), 3000);
    }
  };

  return (
    <Comment
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={
        <Form form={form}>
          <Form.Item name="message_input">
            <TextArea rows={4} onChange={handleChange} value={value} />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={submitting}
              onClick={handleSubmit}
              type="primary"
            >
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      }
    />
  );
};
export default SendMessage;
