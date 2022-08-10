import { IonButton, IonContent, IonPage } from '@ionic/react'
import { API } from 'aws-amplify';
import React from 'react'
import BackButton from '../components/BackButton'
import { createAssetType } from '../graphql/mutations';
import { useIonRouter } from '@ionic/react';

interface FieldInputs {
  name: string;
  type: string;
}

const NewType = () => {

  const [name, setName] = React.useState('');
  const [fields, setFields] = React.useState(Array<FieldInputs>());

  const router = useIonRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fieldsJSON = JSON.stringify(fields);

    let typeDetails = {
      typeName: name,
      dataTemplate: fieldsJSON
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

  const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let newFields = [...fields];
    newFields[index].name = event.target.value;
    setFields(newFields);
  }

  const handleTypeChange = (index: number, event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    let newFields = [...fields];
    newFields[index].type = event.target.value;
    setFields(newFields);
  }

  const addField = () => {
    let newField: FieldInputs = { name: '', type: 'default' };
    setFields([...fields, newField]);
  }

  const removeField = (index: number) => {
    let newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
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
          {fields.map((field, index) => {
            return (
              <div key={index} className="my-3">
                <input 
                  name="name"
                  placeholder="Name"
                  value={field.name}
                  onChange={(e) => {handleNameChange(index, e)}}
                  className="mr-3"
                />
                <select name="type" value={field.type} onChange={(e) => {handleTypeChange(index, e)}}>
                  <option disabled value="default">Select a Type</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                </select>
                <IonButton onClick={() => { removeField(index) }}>Delete</IonButton>
              </div>
            )
          })}
          <IonButton onClick={(e) => addField()}>Add Field</IonButton>
          <br></br>
          <label className="mr-3 mt-6">Asset Log Fields:</label>
          <br></br>
          <IonButton type='submit'>Submit</IonButton>
        </form>
        <BackButton />
      </IonContent>
    </IonPage>
  )
}

export default NewType