import React, { useContext } from 'react'
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from '../contexts/AuthContext';

const navbar = () => {

  const {user,logout} = useContext(AuthContext);

  return (
    <div className='bg-neutral-900 h-10 w-full flex items-center justify-between p-4 border-b border-neutral-800'>
        <h1 className='font-bold  text-neutral-100 tracking-wider'>BookMySeat</h1>
        {user && <AiOutlineLogout className='text-white cursor-pointer' onClick={logout}/>}
    </div>
  )
}

export default navbar