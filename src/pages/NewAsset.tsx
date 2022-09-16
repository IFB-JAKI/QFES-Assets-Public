import React, { useState, useEffect } from 'react'
import { IonPage, IonContent, IonButton, useIonRouter, IonCheckbox } from '@ionic/react'
import BackButton from '../components/BackButton'
import { getAssetType, listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { createAsset } from '../graphql/mutations';
import { API } from 'aws-amplify';
import Selector from '../components/Selector';

const NewAsset = () => {

  interface typeFieldsInterface {
    name: string,
    type: string,
    value?: string
  }

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [type, setType] = useState({ name: '', id: null, dataTemplate: '' });
  const [typeFields, setTypeFields] = useState(Array<typeFieldsInterface>());

  const [group, setGroup] = useState(null);
  const [status, setStatus] = useState({ name: null, id: null });
  const [location, setLocation] = useState({ name: null, id: null });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let typeInputs = typeFields.map((field) => {
      return { name: field.name, value: field.value }
    });
    
    let assetDetails = {
      assetName: name,
      description: description,
      typeID: type.id,
      groupID: group,
      statusID: status.id,
      assetlocaID: location.id,
      assetTypeData: JSON.stringify(typeInputs)
    }

    const createAssetCall = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: createAsset,
          variables: { input: assetDetails },
          authMode: 'AWS_IAM'
        });
        // @TODO Success or error toast here
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
        let parsedTemplate = JSON.parse(type.dataTemplate);
        // give value a default, required for controlled form element
        parsedTemplate.map((field: typeFieldsInterface) => {
          field.value = '';
        })
        setTypeFields(parsedTemplate);
      } catch (e) {
        console.log('Error parsing JSON');
      }
    } else {
      setTypeFields([]);
    }
  }, [type]);

  const handleTypeChange = (index: number, e: any) => {
    let data = [...typeFields];
    data[index].value = e.target.value;
    setTypeFields(data);
  }

  return (
    <IonPage>
      <IonContent>
        <h1>New Asset</h1>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Asset Name" ></input>
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Asset Description"></input>
          <Selector label="Type" queryType={listAssetTypes} handleChange={setType} nameKey="typeName" />
          <p>Asset Data: </p>
          {
            (typeFields && typeFields.length > 0) && typeFields.map((field, index) => {
              let fieldJsx;
              if (field.type === 'text') {
                fieldJsx = <input type="text" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
              } else if (field.type === 'number') {
                fieldJsx = <input type="number" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
              } else if (field.type === 'date') {
                fieldJsx = <input type="date" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
              } else if (field.type === 'boolean') {
                fieldJsx = <IonCheckbox value={field.value} onChange={e => handleTypeChange(index, e)}></IonCheckbox>
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