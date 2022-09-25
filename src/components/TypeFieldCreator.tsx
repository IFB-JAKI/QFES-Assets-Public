import { IonButton } from '@ionic/react';
import React from 'react'
import { FieldInputs } from '../types/FieldInputs';

interface TypeFieldCreatorProps {
  fields: FieldInputs[];
  setFields: any;
}

const TypeFieldCreator = ({ fields, setFields }: TypeFieldCreatorProps) => {

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
  return (
    <>
      {fields.map((field, index) => {
        return (
          <div key={index} className="my-3">
            <input
              name="name"
              placeholder="Name"
              value={field.name}
              onChange={(e) => { handleNameChange(index, e) }}
              className="mr-3"
            />
            <select name="type" value={field.type} onChange={(e) => { handleTypeChange(index, e) }}>
              <option disabled value="default">Select a Type</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="date">Date</option>
              <option value="signature">Digital Signature</option>
            </select>
            <IonButton onClick={() => { removeField(index) }}>Delete</IonButton>
          </div>
        )
      })}
      <IonButton onClick={(e) => addField()}>Add Field</IonButton>
    </>
  )
}

export default TypeFieldCreator