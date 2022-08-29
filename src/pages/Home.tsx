import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonItem, IonThumbnail, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSplitPane } from '@ionic/react';
import SideBar from '../components/SideBar/SideBar';
interface HomeProps {
  user: any;
  signOut: any;
}

const Home = ({ signOut, user }:HomeProps) => {
  return (
    <IonContent>
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Info and control screen for testing</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          
        </IonContent>
      </IonPage>
    </IonContent>
  );
};

export default Home;
