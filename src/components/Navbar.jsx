import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-[#CC313D] w-full not-first py-2 text-[#FFFFFF]'>
        <h2 className='text-lg font-bold cursor-pointer text-center'>
            <a href="/">To-Doodle</a></h2>
        <ul className='flex gap-2'>
            <li className='w-15 text-center font-bold cursor-pointer transition-all hover:text-[17px]'>
                <a href="/">Home</a></li>
            <li className='w-15 text-center font-bold cursor-pointer transition-all hover:text-[17px]'>
                <a href="/">Tasks</a></li>
        </ul>
      
    </nav>
  )
}

export default Navbar
