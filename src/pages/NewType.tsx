import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import BackButton from '../components/BackButton'

const NewType = () => {

  const [name, setName] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <IonPage>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)} placeholder="Name"></input>
        </form>
        <BackButton />
      </IonContent>
    </IonPage>
  )
}

export default NewType