import { IonIcon, IonItem, IonList, IonNavLink, IonRouterLink } from '@ionic/react'
import { documentTextOutline, homeOutline, listOutline, logOutOutline, statsChartOutline } from 'ionicons/icons'
import React from 'react'
import qfesIcon from '../../assets/img/qfesIcon.png'
import SideBarOption from './SideBarOption'

interface SideBarProps {
  signOut: any
}

const SideBar = ({ signOut }: SideBarProps) => {
  return (
    <div className="w-full bg-primary-100 text-primary-300">
      <div className="bg-primary- h-screen w-full">
        <div className="flex flex-col items-center h-full pb-4 px-4">
            <div className="flex h-16 items-center w-full">
              <img src={qfesIcon} alt="QFES Icon Grey" className='h-[51px] w-[45px] ml-2'></img>
              <h1 className='ml-3 text-white text-2xl font-normal'>QFES Assets</h1>
            </div>
            <div className="w-full h-[1px] rounded-full bg-primary-200 mb-1"></div>
            <SideBarOption route="/Home">
              <IonIcon icon={homeOutline} className='mr-3'></IonIcon>
              Home
            </SideBarOption>
            <SideBarOption route="/Search">
            <IonIcon icon={listOutline} className='mr-3'></IonIcon>
            Assets
            </SideBarOption>
            <SideBarOption route="/Types">
              <IonIcon icon={statsChartOutline} className='mr-3'></IonIcon>
              Types
              </SideBarOption>
              <SideBarOption route="/Groups">
              <IonIcon icon={statsChartOutline} className='mr-3'></IonIcon>
              Groups
              </SideBarOption>
            <div className='w-full grow'></div>
            <SideBarOption onClick={signOut}>
              <IonIcon icon={logOutOutline} className='mr-3'></IonIcon>
              Sign Out
            </SideBarOption>
        </div>
      </div>
    </div>
  )
}

export default SideBar