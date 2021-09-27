import { Space } from 'antd'
import type { NextPage } from 'next'
import Login from '../components/Login/Login'
/* import Register from '../components/Register/Register' */
//TODO ROUTER
const Home: NextPage = () => {
  return (
    <div className='container'>
       {/*  <Register></Register> */}
      <Login></Login>
    </div>
  )
}

export default Home
