import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonItem, IonThumbnail, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSplitPane } from '@ionic/react';
import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
interface HomeProps {
  user: any;
}

const Home = ({ user }: HomeProps) => {
  return (
    <IonPage id="main">
      <Header title="Home" user={user}/>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Home;
