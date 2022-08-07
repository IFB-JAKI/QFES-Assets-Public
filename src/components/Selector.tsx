import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react'

interface SelectorProps {
  nullable?: boolean;
  update: (value: any) => void;
  queryType: any;
  label: string;
}

const Selector = ({ nullable = true, update, queryType, label }: SelectorProps) => {

  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const getOptions = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: queryType,
          authMode: 'AWS_IAM'
        });
        setOptions(result.data.listAssetTypes.items);
      } catch (e) {
        console.log(e);
      }
      return;
    };
  }, [])

  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => update(e.target.value)}>
        {nullable && <option value="">None</option>}
        {
          options.map((type: any) => {
            return (
              <option value={type.id}>{type.name}</option>
              )
            })
          }
      </select>
    </div>
  )
}

export default Selector