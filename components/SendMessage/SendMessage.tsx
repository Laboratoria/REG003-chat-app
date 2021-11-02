import { NextPage } from "next";
import React, { useState, useContext } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { SocketContext } from "../../contexts/socketContext";
import { postMessage } from "../../services/message";

const { TextArea } = Input;

interface Props {
  uid: number;
  channelId: number;
  userImage?: string;
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

const SendMessage: NextPage<Props> = ({ uid, channelId, userImage }) => {
  const [value, setValue] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { socket, setSocket } = useContext(SocketContext);

  const token = localStorage.getItem("token");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    setSubmitting(true);
    if (!value) {
      console.log("emty");
    } else {
      const payload = {
        content: value,
        channelId,
        uid,
      };
      token ? postMessage(token, payload) : console.log("No token provided");
      setTimeout(() => setSubmitting(false), 3000);
    }
  };

  return (
    <Comment
      avatar={
        <Avatar src={userImage} alt="Han Solo" />
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
