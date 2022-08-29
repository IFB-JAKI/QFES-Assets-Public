import React from 'react'

interface SideBarOptionProps {
  children: React.ReactNode;
  route?: string;
}

const SideBarOption = ({ children }: SideBarOptionProps) => {
  return (
    <div className='w-full bg-primary-100 hover:bg-primary-200 hover:text-white hover:cursor-pointer text-xl p-3 rounded-md transition ease-in-out'>
      {children}
    </div>
  )
}

export default SideBarOption