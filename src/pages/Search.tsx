import React, { useEffect, useState } from 'react'
import { IonButton, IonPage, IonBackButton, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonThumbnail  } from '@ionic/react'
import BackButton from '../components/BackButton'
import { pin, wifi, wine, warning, walk, } from 'ionicons/icons';
import { listAssets } from '../graphql/queries';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';



const Search = () => {
  const [assets, setAssets] = useState([]);
  const listAsset = async (): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: listAssets,
        authMode: 'AWS_IAM'
      });
      console.log(result);
      setAssets(result.data.listAssets.items);
    } catch (e) {
      console.log(e);
    }
    return;
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SEARCH</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <BackButton text="back" />
        <IonCard>
          <IonItem detail routerLink="/AssetPage">
            
          <IonThumbnail slot="start">
            <img src="https://www.australiancomputertraders.com.au/assets/full/HP850G5i52-r.jpg?20220226055643" />
          </IonThumbnail>
          <IonCardHeader>
          <IonCardSubtitle color="danger">On Loan</IonCardSubtitle>
            <IonCardTitle>HP Laptop</IonCardTitle>
            <IonIcon name="arrow-dropright" size="large" color="white" slot="end"></IonIcon>
            
            </IonCardHeader>
            
          </IonItem>
        </IonCard>

        <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => {listAsset()}} >List Assets</IonButton>
        {
          assets.map((asset: any) => {
            return (
              <div key={asset.id}>
                
                <IonCard>
                  
                <IonItem detail routerLink={"/asset/" + asset.id}>
            
                    <IonThumbnail slot="start">
                      <img src="https://www.australiancomputertraders.com.au/assets/full/HP850G5i52-r.jpg?20220226055643" /> placeholder
                    </IonThumbnail>
                    <IonCardHeader>
                      <IonCardSubtitle color="danger">On Loan</IonCardSubtitle>
                      <IonCardTitle>{asset.id}</IonCardTitle>
                      
                    </IonCardHeader>
                    
                    <IonButton fill="outline" slot="end">View</IonButton>
            
                  </IonItem>
                </IonCard>
              </div>
            )
          })
        }
      </IonContent>
    </IonPage>
  )
}


export default Search