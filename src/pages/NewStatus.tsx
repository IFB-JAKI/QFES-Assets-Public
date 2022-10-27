import { IonPage, IonContent, IonButton } from '@ionic/react'
import { API } from 'aws-amplify';
import React from 'react'
import BackButton from '../components/BackButton'
import { createAssetStatus } from '../graphql/mutations';

const NewStatus = () => {

  const [name, setName] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let statusDetails = { statusName: name };
    try {
      const result: any = await API.graphql({
        query: createAssetStatus,
        variables: { input: statusDetails },
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
          <label className="mr-3">Type Name:</label>
          <input onChange={(e) => setName(e.target.value)} placeholder="Name" className="my-3"></input>
          <br></br>
          <IonButton type='submit'>Submit</IonButton>
        </form>
        <BackButton />
      </IonContent>
    </IonPage>
  )
}

export default NewStatus