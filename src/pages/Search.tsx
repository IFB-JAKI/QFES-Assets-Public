import React, { useEffect, useState } from 'react'
import { IonButton, IonPage, IonBackButton, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonThumbnail } from '@ionic/react'
import BackButton from '../components/BackButton'
import { pin, wifi, wine, warning, walk, } from 'ionicons/icons';
import { listAssets } from '../graphql/queries';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import SearchItem from '../components/SearchItem';

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

  useEffect(() => {
    listAsset();
  } , []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SEARCH</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <BackButton text="back" />
        {
          assets.map((asset: any) => {
            return (
              <SearchItem key={asset.id} asset={asset} />
            )
          })
        }
      </IonContent>
    </IonPage>
  )
}


export default Search