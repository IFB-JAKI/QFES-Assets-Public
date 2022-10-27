import { IonButton, IonContent, IonPage, useIonToast } from '@ionic/react'
import { API } from 'aws-amplify';
import React from 'react'
import BackButton from '../components/BackButton'
import { createAssetType } from '../graphql/mutations';
import { useIonRouter } from '@ionic/react';
import { FieldInputs } from '../types/FieldInputs';
import TypeFieldCreator from '../components/TypeFieldCreator';
import Header from '../components/Header';
interface NewTypeProps {
  user: any;
}
const NewType = ({ user }: NewTypeProps) => {


  const [name, setName] = React.useState('');
  const [assetFields, setAssetFields] = React.useState(Array<FieldInputs>());
  const [assetLogFields, setAssetLogFields] = React.useState(Array<FieldInputs>());
  const [presentToast] = useIonToast();
  const router = useIonRouter();
  const presentActionToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    presentToast({
      message: message,
      duration: 3000,
      position: position,

    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") {
      presentActionToast('bottom', "Please fill in required fields (*)");
      return;
    }
    const assetFieldsJSON = JSON.stringify(assetFields);
    const assetLogFieldsJSON = JSON.stringify(assetLogFields);

    let typeDetails = {
      typeName: name,
      dataTemplate: assetFieldsJSON,
      logTemplate: assetLogFieldsJSON
    }

    const createType = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: createAssetType,
          variables: { input: typeDetails },
          authMode: 'AWS_IAM'
        });
        // @TODO Success or error toast here
        console.log(result);
        router.goBack();
      } catch (e) {
        console.log(e);
      }
      return;
    };

    createType();
  }

  return (
    <IonPage>
      <Header title={"New Type"} user={user} />
      <IonContent>
        <div className="m-4 mb-0">
          <BackButton text="back" />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="">
          <div className="bg-white p-4 m-4 rounded-lg shadow">
            <div className="bg-stone rounded-lg shadow lg:w-1/4 pr-4 mb-2" key={1}>
              <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Type Name*: </label></h1>
              <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" ></input>
            </div>
            <h1 className='text-2xl font-montserrat mt-4 font-bold '>Information Fields for Asset Type:</h1>
            <div className="w-1/2">
              <TypeFieldCreator fields={assetFields} setFields={setAssetFields} />
            </div>
            <h1 className='text-2xl font-montserrat mt-4 font-bold '>Type Specific Information Required On Asset Loan:</h1>
            <TypeFieldCreator fields={assetLogFields} setFields={setAssetLogFields} />
            <IonButton className="mt-4" type='submit'>Submit</IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default NewType