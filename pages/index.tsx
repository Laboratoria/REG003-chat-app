import { Space } from 'antd'
import type { NextPage } from 'next'
import { useState } from 'react'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
//TODO ROUTER
const Home: NextPage<any> = () => {
  const [ isLogin, setIsLogin ] = useState(false);

  return (
    <div className='container'>
       { isLogin ? <Login setIsLogin={setIsLogin}></Login> : <Register setIsLogin={setIsLogin}></Register>}
    </div>
  )
}

export default Home
