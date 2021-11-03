import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { Comment, Tooltip, Avatar } from "antd";

interface Props {
  user: any;
  body: string;
  time: string;
  attachment?: string;
  token: string;
  /*     id: number;
        userId: string */
}

const CommentChat: NextPage<Props> = ({
  user,
  body,
  time,
  attachment,
  token,
}) => {
  const updatedAtDay = time.split("T")[0];
  const messageTime = time.split("T")[1].slice(0, -5);

  return (
    <Comment
      author={user.username}
      avatar={<Avatar src={user.profile_image} />}
      content={
        <div>
          <p>{body}</p>

          {attachment ? <img src={attachment} alt="attachment" /> : ""}
        </div>
      }
      datetime={<span>{messageTime}</span>}
    />
  );
};

export default CommentChat;
