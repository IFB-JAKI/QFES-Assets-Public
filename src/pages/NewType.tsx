import { IonButton, IonContent, IonPage } from '@ionic/react'
import { API } from 'aws-amplify';
import React from 'react'
import BackButton from '../components/BackButton'
import { createAssetType } from '../graphql/mutations';
import { useIonRouter } from '@ionic/react';
import { FieldInputs } from '../types/FieldInputs';
import TypeFieldCreator from '../components/TypeFieldCreator';

const NewType = () => {

  const [name, setName] = React.useState('');
  const [assetFields, setAssetFields] = React.useState(Array<FieldInputs>());
  const [assetLogFields, setAssetLogFields] = React.useState(Array<FieldInputs>());

  const router = useIonRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const assetFieldsJSON = JSON.stringify(assetFields);

    let typeDetails = {
      name: name,
      dataTemplate: assetFieldsJSON
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

  // @TODO validation

  return (
    <IonPage>
      <IonContent>
        <form onSubmit={(e) => handleSubmit(e)} className="m-6">
          <label className="mr-3">Type Name:</label>
          <input onChange={(e) => setName(e.target.value)} placeholder="Name" className="my-3"></input>
          <br></br>
          <label className="mr-3">Asset Fields:</label>
          <br></br>
          <TypeFieldCreator fields={assetFields} setFields={setAssetFields}/>
          <br></br>
          <label className="mr-3 mt-6">Asset Log Fields:</label>
          <br></br>
          <TypeFieldCreator fields={assetLogFields} setFields={setAssetLogFields}/>
          <br></br>
          <IonButton type='submit'>Submit</IonButton>
        </form>
        <BackButton />
      </IonContent>
    </IonPage>
  )
}

export default NewType