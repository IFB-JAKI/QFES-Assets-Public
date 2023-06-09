import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonMenuButton } from '@ionic/react';
import { personCircle } from 'ionicons/icons';

interface headerProps {
  title: string;
  user?: any;
}

const Header = ({ title, user }: headerProps) => {

  const menuToggle = () => {
    document.querySelector('ion-menu')?.open();
  }

  return (
    <IonHeader collapse='fade' className="ion-no-border">
      <IonToolbar className='h-16'>
        <IonButtons slot="start" className='lg:hidden'>
          <IonMenuButton autoHide={false} onClick={() => menuToggle} />
        </IonButtons>
        <IonButtons slot="secondary">
          <IonButton>
            <IonIcon slot="end" icon={personCircle} />
            {user?.attributes.name}
          </IonButton>
        </IonButtons>
        <IonTitle className='text-3xl font-montserrat font-bold text-primary-200'>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header