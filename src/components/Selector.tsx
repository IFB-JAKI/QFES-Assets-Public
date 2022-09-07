import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { IonSelect, IonSelectOption, isPlatform } from '@ionic/react';

interface SelectorProps {
  nullable?: boolean;
  handleChange: (data: any) => void;
  queryType: any;
  label: string;
  nameKey: string;
}

/* Selects from option created from the query. State for all options is stored here, while state for the selected option is passed up. */
const Selector = ({ nullable = true, handleChange, queryType, label, nameKey }: SelectorProps) => {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: queryType,
          authMode: 'AWS_IAM'
        });
        setData(result.data[Object.keys(result.data)[0]].items);
      } catch (e) {
        console.log(e);
      }
      return;
    };

    getData();
  }, []);

  if (isPlatform('capacitor')) {
    return (
      <div>
        <IonSelect>
          {nullable && <IonSelectOption value={null}>None</IonSelectOption>}
          {
            data.map((option: any) => {
              return (
                <IonSelectOption key={option.id} value={option.id}>{option[nameKey]}</IonSelectOption>
              )
            })
          }
        </IonSelect>
      </div>
    )
  } else {
    return (
      <div>
        <label>{label}</label>
        <select onChange={(e) => handleChange(data.find(item => item.id === e.target.value))}>
          {nullable && <option value="">None</option>}
          {
            data.map((option: any) => {
              return (
                <option value={option.id} key={option.id}>{option[nameKey]}</option>
              )
            })
          }
        </select>
      </div>
    )
  }
}

export default Selector