import React from 'react'
import appLayout from '../components/Layout/appLayout'

const Home = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center text-bold text-3xl bg-[#1a1a1a] text-gray-400'>Select a friend to Chat</div>
  )
}

export default appLayout()(Home)