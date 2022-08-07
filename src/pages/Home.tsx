import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonBackButton } from '@ionic/react';
import { API } from 'aws-amplify';
import { createAsset } from '../graphql/mutations'
import { listAssets } from '../graphql/queries';
import React, { useEffect, useState } from 'react';


interface HomeProps {
  user: any;
  signOut: any;
}

const Home = ({ signOut, user }:HomeProps) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Info and control screen for testing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton color="primary" routerLink="/Search">Search</IonButton>
        <IonButton color="primary" routerDirection="none" routerLink="/NewAsset">New Asset</IonButton>
        <IonButton color="primary" routerLink="/Reports">Reports</IonButton>
        <IonButton color="primary" routerLink="/Statistics">Statistics</IonButton>
        <IonButton color="primary" routerLink="/AssetPage">View Asset</IonButton>
        <IonButton onClick={signOut}>Sign Out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
