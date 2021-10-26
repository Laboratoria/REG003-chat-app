import type { NextPage } from "next";
import React, { useState, useContext, useEffect } from "react";
import CommentChat from "../../components/Comment/Comment";
import HeaderChat from '../../components/Header_chat/HeaderChat'
import SendMessage from "../../components/SendMessage/SendMessage";


//TODO ROUTER

const Home: NextPage = () => {

  return (
    <div className="container">
      <HeaderChat></HeaderChat>
      <CommentChat></CommentChat>
      <CommentChat></CommentChat>
      <SendMessage></SendMessage>
    </div>
  );
};

export default Home;
