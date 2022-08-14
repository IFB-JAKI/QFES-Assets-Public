import { IonPage, IonContent, IonButton } from '@ionic/react'
import { API } from 'aws-amplify';
import React from 'react'
import BackButton from '../components/BackButton'
import { createAssetLocation } from '../graphql/mutations';

const NewLocation = () => {
  
  const [name, setName] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let locationDetails = { locationName: name };
    try {
      const result: any = await API.graphql({
        query: createAssetLocation,
        variables: { input: locationDetails },
        authMode: 'AWS_IAM'
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  return (
    <IonPage>
      <IonContent>
        <form onSubmit={(e) => handleSubmit(e)} className="m-6">
          <label className="mr-3">Location Name:</label>
          <input onChange={(e) => setName(e.target.value)} placeholder="Name" className="my-3"></input>
          <br></br>
          <IonButton type='submit'>Submit</IonButton>
        </form>
        <BackButton />
      </IonContent>
    </IonPage>
  )
}

export default NewLocation