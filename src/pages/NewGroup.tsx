import { IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

const NewGroup = ({ user }: any) => {
  return (
    <IonPage>
      <Header user={user} title="New Group" />
    </IonPage>
  )
}

export default NewGroup