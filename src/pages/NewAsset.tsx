import React, { useState, useEffect } from 'react'
import { IonPage, IonContent, IonButton, useIonRouter, IonCheckbox } from '@ionic/react'
import BackButton from '../components/BackButton'
import { getAssetType, listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';
import Selector from '../components/Selector';

const NewAsset = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [type, setType] = useState({ name: '', id: '', dataTemplate: '' });
  const [typeFields, setTypeFields] = useState(Array<any>());

  const [group, setGroup] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

  const router = useIonRouter();

  // @TODO Images after image upload / storage setup

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name, description);
  }

  useEffect(() => {
    if (type && type.dataTemplate !== '') {
      try {
        setTypeFields(JSON.parse(type.dataTemplate));
      } catch (e) {
        console.log('Error parsing JSON');
      }
    } else {
      setTypeFields([]);
    }
  }, [type]);

  return (
    <IonPage>
      <IonContent>
        <h1>New Asset</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)} placeholder="Asset Name" ></input>
          <br></br>
          <input onChange={(e) => setDescription(e.target.value)} placeholder="Asset Description" ></input>
          <br></br>
          <Selector label="Type" queryType={listAssetTypes} handleChange={setType} nullable={true} />
          {
            typeFields.map((field, index) => {
              let fieldJsx;
              if (field.type === 'text') {
                fieldJsx = <input type="text"></input>
              } else if (field.type === 'number') {
                fieldJsx = <input type="number" ></input>
              } else if (field.type === 'date') {
                fieldJsx = <input type="date" ></input>
              } else if (field.type === 'boolean') {
                fieldJsx = <IonCheckbox></IonCheckbox>
              }
              return (
                <div key={index}>
                  <label>{field.name}: </label>
                  {fieldJsx}
                </div>
              )
            }, [])
          }
          <IonButton routerLink='/newType'>New Type</IonButton>
          <br></br>
          {/* <Selector label="Group" queryType={listAssetGroups} update={setGroup} nullable={true} /> */}
          <br></br>
          {/* <Selector label="Status" queryType={listAssetStatuses} update={setStatus} nullable={true} /> */}
          <br></br>
          {/* <Selector label="Location" queryType={listAssetLocations} update={setLocation} nullable={true} /> */}
          <br></br>
          <IonButton>Submit</IonButton>
        </form>

        <BackButton text="back" />
      </IonContent>
    </IonPage>
  )
}

export default NewAsset