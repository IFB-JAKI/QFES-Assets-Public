import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { createAsset, updateAsset, deleteAsset } from '../graphql/mutations'
import { listAssets } from '../graphql/queries';


import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React from 'react';

interface HomeProps {
  user: any;
  signOut: any;
}

const Home = ({ signOut, user }:HomeProps) => {
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
    } catch (e) {
      console.log(e);
    }
    return;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => {addAsset()}} >Create Asset</IonButton>
        <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => {listAsset()}} >List Assets</IonButton>
        <p>Hey {user.username}</p>
        <IonButton onClick={signOut}>Sign Out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
