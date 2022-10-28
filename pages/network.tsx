import type { NextPage } from 'next'
import { BsWifiOff } from 'react-icons/bs';

const NoNetwork: NextPage = () => {
  return (
    <div className='bg-blue-500 h-screen flex items-center justify-center'>
      <div className='flex items-center flex-col'>
        <i className='block text-9xl mb-5 text-white'><BsWifiOff /></i>
        <p className='font-extrabold text-6xl font-poppins mb-1'>WHOOPS!</p>
        <p className='text-base font-poppins font-bold mb-1'>SLOW OR NO INTERNET CONNECTION</p>
        <p className='text-sm'>Check your internet settings and try again</p>
      </div>
    </div>
  )
}

export default NoNetwork;