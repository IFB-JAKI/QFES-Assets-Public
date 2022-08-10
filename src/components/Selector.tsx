import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

interface SelectorProps {
  nullable?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  queryType: any;
  label: string;
}

const Selector = ({ nullable = true, handleChange, queryType, label }: SelectorProps) => {
  
  const [data, setData] = useState<any[]>([]);

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

  useEffect(() => {
    getData();
  }), [];

  // @TODO Mobile and component this
  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => handleChange(e)}>
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