import { NextPage } from "next";
import React, { useState, useContext } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { SocketContext } from "../../contexts/socketContext";

const { TextArea } = Input;

interface Props {
  uid: number;
  channelId: number;
}

//@ts-ignore
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const SendMessage: NextPage<Props> = ({ uid, channelId }) => {
  const [value, setValue] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { socket, setSocket } = useContext(SocketContext);

  const handleChange = (e: any) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = () => {
    setSubmitting(true);
    if (!value) {
      console.log("emty");
    } else {
      console.log("message", value);
      socket.emit("send-message", value);
      setTimeout(() => setSubmitting(false), 3000);
    }
  };

  return (
    <Comment
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={
        <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
        />
      }
    />
  );
};
export default SendMessage;
