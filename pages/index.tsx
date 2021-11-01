import type { NextPage } from "next";
import { useState, useContext, useEffect } from "react";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

//TODO ROUTER

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      {isLogin ? (
        <Login setIsLogin={setIsLogin}></Login>
      ) : (
        <Register setIsLogin={setIsLogin}></Register>
      )}
    </div>
  );
};

export default Home;
