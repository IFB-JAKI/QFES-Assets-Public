import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonItem, IonThumbnail, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSplitPane } from '@ionic/react';
import SideBar from '../components/SideBar/SideBar';
interface HomeProps {
  user: any;
  signOut: any;
}

const Home = ({ signOut, user }: HomeProps) => {
  return (
    <IonPage id="main">
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonTitle>Info and control screen for testing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Home;
