import { IonCard, IonItem, IonThumbnail, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react'
import React from 'react'

interface itemProps {
  asset: any
}

const SearchItem = ({ asset }: itemProps) => {
  return (
    <div key={asset.id}>
      <IonCard>
        <IonItem detail routerLink={"/asset/" + asset.id}>
          <IonThumbnail slot="start">
            <img src="https://www.australiancomputertraders.com.au/assets/full/HP850G5i52-r.jpg?20220226055643" /> placeholder
          </IonThumbnail>
          <IonCardHeader>
            <IonCardSubtitle color="danger">On Loan</IonCardSubtitle>
            <IonCardTitle>{asset.assetName}</IonCardTitle>
          </IonCardHeader>
          <IonButton fill="outline" slot="end">View</IonButton>
        </IonItem>
      </IonCard>
    </div>
  )
}

export default SearchItem