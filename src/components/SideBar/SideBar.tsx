import { IonItem, IonList, IonNavLink, IonRouterLink } from '@ionic/react'
import React from 'react'
import qfesIcon from '../../assets/img/qfesIcon.png'

interface SideBarProps {
  active: string
}

const SideBar = ({ active }: SideBarProps) => {
  return (
    <div className="w-64 bg-primary-100 text-primary-300">
      <div className="bg-primary- h-screen w-full">
        <div className="flex flex-col items-center h-full p-4">
            <div className="flex h-16 items-center w-full mb-4">
              <img src={qfesIcon} alt="QFES Icon Grey" className='h-[51px] w-[45px] ml-2'></img>
              <h1 className='ml-3 text-white text-2xl font-normal'>QFES Assets</h1>
            </div>
            <div className="w-full h-[1px] rounded-full bg-primary-200"></div>
            <div className='w-full'>
              <IonRouterLink routerLink="/Home" className='text-primary-300 text-xl hover:text-primary-400'>Home</IonRouterLink>
            </div>
            <div className='w-full'>
              <IonRouterLink routerLink="/Search" className='text-primary-300 text-xl hover:text-primary-400'>Assets</IonRouterLink>
            </div>
            <div className='w-full'>
              <IonRouterLink routerLink="/Statistics" className='text-primary-300 text-xl hover:text-primary-400'>Statistics</IonRouterLink>
            </div>
            <div className='w-full'>
              <IonRouterLink routerLink="/Reports" className='text-primary-300 text-xl hover:text-primary-400'>Reports</IonRouterLink>
            </div>
            <div className='w-full grow'></div>
            <div className='w-full'>
              <IonRouterLink routerLink="/Settings" className='text-primary-300 text-xl hover:text-primary-400'>Settings</IonRouterLink>
            </div>
            <div className='w-full'>
              <p>Sign Out</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar