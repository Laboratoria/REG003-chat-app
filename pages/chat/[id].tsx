import type { NextPage } from "next";
import { useState, useContext, useEffect } from "react";
import HeaderChat from '../../components/Header_chat/HeaderChat'


//TODO ROUTER

const Home: NextPage = () => { 

  return (
    <div className="container">
    <HeaderChat></HeaderChat>
    </div>
  );
};

export default Home;
