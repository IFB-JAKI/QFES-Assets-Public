import { IonButton, IonCheckbox, IonContent, IonInput, IonLabel, IonList, IonPage, IonSearchbar } from '@ionic/react'
import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import Selector from '../components/Selector'
import { createAsset } from '../graphql/mutations'
import AssetSelector from '../components/AssetSelector'
import { listAssetTypes, listAssetGroups, listAssetStatuses, listAssetLocations } from '../graphql/queries'

const NewGroup = ({ user }: any) => {

  const handleSubmit = () => {
    
  }



  return (
    <IonPage>
      <Header user={user} title="New Group" />
      <IonContent>
        <div className="m-2 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <IonLabel>Parent Asset</IonLabel>
            <AssetSelector />
            <IonButton type='submit'>Submit</IonButton>
          </form>
          <BackButton text="back" />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default NewGroup