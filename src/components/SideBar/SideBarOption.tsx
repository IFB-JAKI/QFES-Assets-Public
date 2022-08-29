import React from 'react'
import { useIonRouter } from '@ionic/react';

interface SideBarOptionProps {
  children: React.ReactNode;
  route?: string;
  onClick?: Function;
}

const SideBarOption = ({ children, route, onClick }: SideBarOptionProps) => {
  const router = useIonRouter();

  const navigate = (event: React.MouseEvent<HTMLElement>) => {
    if (route && route != undefined) {
      router.push(route);
    }
    if (onClick && onClick != undefined) {
      onClick();
    }
  }

  return (
    <div onClick={(e) => {navigate(e)}} className='w-full bg-primary-100 hover:bg-primary-200 hover:text-white hover:cursor-pointer text-xl p-3 rounded-md transition ease-in-out'>
      {children}
    </div>
  )
}

export default SideBarOption