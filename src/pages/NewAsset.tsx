import React from 'react'
import { IonPage, IonContent, IonBackButton, useIonRouter  } from '@ionic/react'
import BackButton from '../components/BackButton'

const NewAsset = () => {

  
  
  return (
    <IonPage>
      <h1>New Asset</h1>
      <IonContent>
        <BackButton text="back" />
      </IonContent>
      
    </IonPage>
  )
}

export default NewAsset