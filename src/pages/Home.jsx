import React from 'react'
import appLayout from '../components/Layout/appLayout'

const Home = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center text-bold text-3xl bg-[#F0F0F0] text-black'>Select a friend to Chat</div>
  )
}

export default appLayout()(Home)