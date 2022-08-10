import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

interface SelectorProps {
  nullable?: boolean;
  handleChange: (data: any) => void;
  queryType: any;
  label: string;
}

/* Selects from option created from the query. State for all options is stored here, while state for the selected option is passed up. */
const Selector = ({ nullable = true, handleChange, queryType, label }: SelectorProps) => {
  
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

  // @TODO Mobile and component this
  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => handleChange(data.find(item => item.id === e.target.value))}>
        {nullable && <option value="">None</option>}
        {
          data.map((type: any) => {
            return (
              <option value={type.id} key={type.id}>{type.typeName}</option>
            )
          })
        }
      </select>
    </div>
  )
}

export default Selector