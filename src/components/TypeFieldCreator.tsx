import { IonButton, IonInput, IonLabel, IonItem } from '@ionic/react';
import React from 'react'
import { FieldInputs } from '../types/FieldInputs';

interface TypeFieldCreatorProps {
  fields: FieldInputs[];
  setFields: any;
}

const TypeFieldCreator = ({ fields, setFields }: TypeFieldCreatorProps) => {

  const handleNameChange = (index: number, event: any) => {
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
  return (
    <>
      {fields.map((field, index) => {
        return (
          <div key={index} className="mt-3">
            <IonItem>
              <div className="mb-2">
              <IonItem class="inputOutline">
                <IonInput required
                  name="name"
                  placeholder="Field Name"
                  value={field.name}
                  onIonChange={e => { handleNameChange(index, e) }}
                  className="mr-3"
                />

              </IonItem>
              </div>
              <select className="bg-white"name="type" value={field.type} onChange={(e) => { handleTypeChange(index, e) }}>
                <option disabled value="default">Select a Type</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="signature">Digital Signature</option>
              </select>

              <IonButton className="ml-7" color="danger" size="default" onClick={() => { removeField(index) }}>Delete</IonButton>
            </IonItem>
          </div>
        )
      })}
      <IonItem> <IonButton color="medium" className="my-2" size="default" onClick={(e) => addField()}>New Field</IonButton> </IonItem>
    </>
  )
}

export default TypeFieldCreator