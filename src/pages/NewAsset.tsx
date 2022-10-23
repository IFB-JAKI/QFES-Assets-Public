import React, { useState, useEffect } from 'react'
import { IonPage, IonContent, IonButton, useIonRouter, IonCheckbox, useIonToast } from '@ionic/react'
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
  const [QRCode, setQRCode] = useState('');

  const [type, setType] = useState({ name: '', id: null, dataTemplate: '' });
  const [typeFields, setTypeFields] = useState(Array<typeFieldsInterface>());

  const [group, setGroup] = useState(null);
  const [status, setStatus] = useState({ name: null, id: null });
  //const [location, setLocation] = useState({ name: null, id: null });
  const [location, setLocation] = useState('');
  const [presentToast] = useIonToast();

  const presentActionToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    presentToast({
      message: message,
      duration: 1500,
      position: position,

    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name)
    if(name === "" || status.id === null || QRCode === ""){
      presentActionToast('bottom', "Please fill in required fields (*)");
      return;
    }

    let typeInputs = typeFields.map((field) => {
      return { name: field.name, value: field.value }
    });

    let assetDetails = {
      assetName: name,
      QRCode: QRCode,
      description: description,
      typeID: type.id,
      groupID: group,
      statusID: status.id,
      assetlocaID: location,
      assetTypeData: JSON.stringify(typeInputs)
    }

    const createAssetCall = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: createAsset,
          variables: { input: assetDetails },
          authMode: 'AWS_IAM'
        });
        console.log(result);
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-stone rounded-lg shadow w-full pr-4 mb-2" key={1}>
            <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Asset Name*: </label></h1>
            <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat'value={name} onChange={(e) => setName(e.target.value)} placeholder="Asset Name" ></input>
          </div>
          <div className="bg-stone rounded-lg shadow w-full pr-4 mb-2" key={2}>
            <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Asset Description: </label></h1>
            <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat'value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Asset Description"></input>
          </div>
          <div className="bg-stone rounded-lg shadow w-full pr-4 mb-2" key={3}>
            <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>QFES Asset ID*: </label></h1>
            <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat'value={QRCode} onChange={(e) => setQRCode(e.target.value)} placeholder="QFES Asset ID"></input>
          </div>
          </div>
          <h1 className='text-2xl font-montserrat mt-4 font-bold '>Asset Type:</h1>
            <Selector label="" queryType={listAssetTypes} handleChange={setType} nameKey="typeName" />
            <IonButton color="secondary" routerLink='/newType'>New Type</IonButton>
          <h1 className='text-2xl font-montserrat mt-4 font-bold '>General Asset Data:</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-stone rounded-lg shadow md:w-1/2 lg:w-full  p-2 lg:h-3/4 text-white pl-2 pt-2 font-bold font-montserrat">
              <Selector label="Asset Group: " queryType={listSimpleAssetGroups} handleChange={setGroup} nameKey="name" />
            </div>
            <div className="top-0 bg-stone rounded-lg shadow md:w-1/2 lg:h-3/4 lg:w-full p-2 text-white pl-2 pt-2 font-bold font-montserrat">
            <Selector label="Status*: " queryType={listAssetStatuses} handleChange={setStatus} nameKey="statusName" />
            </div>
            <div className="bg-stone rounded-lg md:w-1/2 shadow lg:w-full pr-4 mb-2 " key={1}>
              <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Asset Location: </label></h1>
              <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat'value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Asset Location"></input>
            </div>
            </div>
            {
              (typeFields && typeFields.length > 0) && typeFields.map((field, index) => {
                let fieldJsx;
                if (field.type === 'text') {
                  fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="text" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                } else if (field.type === 'number') {
                  fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="number" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                } else if (field.type === 'date') {
                  fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="date" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                } else if (field.type === 'boolean') {
                  fieldJsx = <IonCheckbox className="bg-neutral-400 text-white w-full rounded" value={field.value} onChange={e => handleTypeChange(index, e)}></IonCheckbox>
                } else if (field.type === 'signature') {
                  fieldJsx = <input type="signature" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                }
                return (
                  <div className="bg-stone rounded-lg shadow md:w-1/2 lg:w-80 mt-2" key={index}>
                    <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>{field.name}: </label></h1>
                    <h2 className='font-montserrat rounded p-1 pl-2 pb-2 pr-2 content-end'>{fieldJsx}</h2>
                  </div>
                )
              }, [])
            }
            <IonButton type='submit'>Submit</IonButton>
            </form>
          </div>
          
        
      </IonContent>
    </IonPage>
  )
}

export default NewAsset