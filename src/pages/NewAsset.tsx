import React, { useState, useEffect } from 'react'
import { IonPage, IonContent, IonButton, useIonRouter, IonCheckbox } from '@ionic/react'
import BackButton from '../components/BackButton'
import { getAssetType, listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { createAsset } from '../graphql/mutations';
import { API } from 'aws-amplify';
import Selector from '../components/Selector';

const NewAsset = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [type, setType] = useState({ name: '', id: null, dataTemplate: '' });
  const [typeFields, setTypeFields] = useState(Array<any>());

  const [group, setGroup] = useState(null);
  const [status, setStatus] = useState({ name: null, id: null });
  const [location, setLocation] = useState({ name: null, id: null });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    let assetDetails = {
      assetName: name,
      description: description,
      typeID: type.id,
      groupID: group,
      statusID: status.id,
      assetlocaID: location.id
    }

    const createAssetCall = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: createAsset,
          variables: { input: assetDetails },
          authMode: 'AWS_IAM'
        });
        // @TODO Success or error toast here
        console.log(result);
      } catch (e) {
        console.log(e);
      }
      return;
    };
    createAssetCall();
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
          <input onChange={(e) => setDescription(e.target.value)} placeholder="Asset Description" ></input>
          <Selector label="Type" queryType={listAssetTypes} handleChange={setType} nameKey="typeName" />
          <p>Asset Data: </p>
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
          <Selector label="Group" queryType={listAssetGroups} handleChange={setGroup} nameKey="name" />
          <Selector label="Status" queryType={listAssetStatuses} handleChange={setStatus} nameKey="statusName" />
          <Selector label="Location" queryType={listAssetLocations} handleChange={setLocation} nameKey="locationName" />
          <IonButton type='submit'>Submit</IonButton>
        </form>

        <BackButton text="back" />
      </IonContent>
    </IonPage>
  )
}

export default NewAsset