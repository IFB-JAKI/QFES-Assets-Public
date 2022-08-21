import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonItem, IonThumbnail, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
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
        <IonButton color="primary" routerLink="/NewType">New Type</IonButton>
        <IonButton color="primary" routerLink="/Reports">Reports</IonButton>
        <IonButton color="primary" routerLink="/Statistics">Statistics</IonButton>
        <IonButton color="primary" routerLink="/AssetPage">View Asset</IonButton>
        <IonButton color="primary" routerLink="/NewStatus">New Status</IonButton>
        <IonButton color="primary" routerLink="/NewLocation">New Location</IonButton>
        <IonButton onClick={signOut}>Sign Out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
