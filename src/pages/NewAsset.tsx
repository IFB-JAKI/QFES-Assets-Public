import React, { useState, useEffect } from 'react'
import { IonPage, IonContent, IonButton, IonSelect, IonSelectOption, useIonRouter } from '@ionic/react'
import BackButton from '../components/BackButton'
import { listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';
import Selector from '../components/Selector';

const NewAsset = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [group, setGroup] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

  const router = useIonRouter();

  // @TODO Images after image upload / storage setup

  // @TODO type data state

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name, description);
  }

  return (
    <IonPage>
      <IonContent>
        <h1>New Asset</h1>

        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)} placeholder="Asset Name" ></input>
          <br></br>
          <input onChange={(e) => setDescription(e.target.value)} placeholder="Asset Description" ></input>
          <br></br>
          <Selector label="Type" queryType={listAssetTypes} update={setType} nullable={true} />
          <IonButton routerLink='/newType'>New Type</IonButton>
          <br></br>
          <Selector label="Group" queryType={listAssetGroups} update={setGroup} nullable={true} />
          <br></br>
          <Selector label="Status" queryType={listAssetStatuses} update={setStatus} nullable={true} />
          <br></br>
          <Selector label="Location" queryType={listAssetLocations} update={setLocation} nullable={true} />
          <br></br>
          <IonButton>Submit</IonButton>
        </form>

        <BackButton text="back" />
      </IonContent>
    </IonPage>
  )
}

export default NewAsset