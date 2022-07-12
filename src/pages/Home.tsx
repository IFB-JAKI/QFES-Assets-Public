import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

import { API } from 'aws-amplify';
import { createAsset } from '../graphql/mutations'
import { listAssets } from '../graphql/queries';

import React, { useState } from 'react';

interface HomeProps {
  user: any;
  signOut: any;
}

const Home = ({ signOut, user }:HomeProps) => {

  const [assets, setAssets] = useState([]);

  const addAsset = async (): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: createAsset,
        variables: {input: {name: "test2", description: "testDescription2"}},
        authMode: 'AWS_IAM'
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    return;
  };

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
          <IonTitle>Alec's testing grounds Please ignore</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => {addAsset()}} >Create Asset</IonButton>
        <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => {listAsset()}} >List Assets</IonButton>
        {
          assets.map((asset: any) => {
            return (
              <div key={asset.id}>
                <p style={{display: "inline", marginLeft: "20px"}}>{asset.id}</p>
                <p style={{display: "inline", marginLeft: "20px"}}>{asset.name}</p>
                <p style={{display: "inline", marginLeft: "20px"}}>{asset.description}</p>
              </div>
            )
          })
        }
        <p>Hey {user.attributes.name}</p>
        <IonButton onClick={signOut}>Sign Out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
