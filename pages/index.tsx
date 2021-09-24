import { Space } from 'antd'
import type { NextPage } from 'next'
import Login from '../components/Login'

const Home: NextPage = () => {
  return (
    <div className='container'>
          <Login />
    </div>
  )
}

export default Home
