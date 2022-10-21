import React, { useState, useEffect } from 'react'
import { IonPage, IonContent, IonButton, useIonRouter, IonCheckbox } from '@ionic/react'
import BackButton from '../components/BackButton'
import { getAssetType, listSimpleAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { createAsset } from '../graphql/mutations';
import { API } from 'aws-amplify';
import Selector from '../components/Selector';
import Header from '../components/Header';

interface GroupsProps {
  user: any;
}
const NewAsset = ({ user }: GroupsProps) => {

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

  // const getImage = async (e: any) => {
  //   const file = e.target.files[0];
  //   try {
  //     await Storage.put(file.name, file, {
  //       contentType: "image/png", // contentType is optional
  //     });
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // }

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
      <Header title={"New Asset"} user={user} />
      <IonContent>
        <div className="m-4 mb-0">
          <BackButton text="back" />
        </div>
        <div className="bg-white p-4 m-4 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
          <div className="bg-stone rounded-lg shadow md:w-1/2 lg:w-80 pr-4 mb-2" key={1}>
            <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Asset Name: </label></h1>
            <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat'value={name} onChange={(e) => setName(e.target.value)} placeholder="Asset Name" ></input>
          </div>
          <div className="bg-stone rounded-lg shadow md:w-1/2 lg:w-80 pr-4" key={1}>
            <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Asset Description: </label></h1>
            <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat'value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Asset Description"></input>
          </div>
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
                } else if (field.type === 'signature') {
                  fieldJsx = <input type="signature" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
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
            <Selector label="Group" queryType={listSimpleAssetGroups} handleChange={setGroup} nameKey="name" />
            <Selector label="Status" queryType={listAssetStatuses} handleChange={setStatus} nameKey="statusName" />
            <Selector label="Location" queryType={listAssetLocations} handleChange={setLocation} nameKey="locationName" />
            <IonButton type='submit'>Submit</IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default NewAsset