import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { input } from 'aws-amplify';
import React from 'react'
import BackButton from '../components/BackButton'

interface FieldInputs {
  index?: number;
  name: string;
  type: string;
}

const NewType = () => {

  const [name, setName] = React.useState('');
  const [fields, setFields] = React.useState(Array<FieldInputs>());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    let newField: FieldInputs = { name: '', type: '' };
    setFields([...fields, newField]);
  }

  const removeField = (index: number) => {
    let newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  }


  return (
    <IonPage>
      <IonContent>
        <form onSubmit={handleSubmit} className="m-6">
          <label className="mr-3">Type Name:</label>
          <input onChange={(e) => setName(e.target.value)} placeholder="Name" className="my-3"></input>
          <br></br>
          <label className="mr-3">Fields:</label>
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
          <IonButton>Submit</IonButton>
        </form>
        <BackButton />
      </IonContent>
    </IonPage>
  )
}

export default NewType