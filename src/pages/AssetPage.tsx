import React from 'react'
import { IonButton, IonPage, IonContent  } from '@ionic/react'

const AssetPage = () => {
  return (
    <IonPage>
      <IonContent>
      <IonButton color="medium" href="/home">BACK</IonButton>
      <h1>Asset Page</h1>
      <p>This would be the page of a specfic item, so it would use the get assetquery, 
        or carry the asset info from previous page</p>
      
      
      <IonButton color="primary" href="/AssetPage/EditAsset">Edit Item</IonButton>
      

      </IonContent>
      
    </IonPage>
  )
}

export default AssetPage