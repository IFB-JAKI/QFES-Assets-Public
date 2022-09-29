import { IonIcon, IonInput } from '@ionic/react'
import { API } from 'aws-amplify';
import { closeCircle, closeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react'
import { listAssets } from '../graphql/queries';

const AssetSelector = () => {
 
  const [text, setText] = useState<string>();
  const [assets, setAssets] = useState(Array<any>());
  const [parent, setParent] = useState<string>();

  useEffect (() => {
    const fetchAssets = async () => {
      const result: any = await API.graphql({
        query: listAssets,
        authMode: 'AWS_IAM'
      });
      setAssets(result.data.listAssets.items);
    }
    fetchAssets();
  }, []);

  const handleParentSelect = (parent: string) => {
    setText('');
    setParent(parent);
  }

  return (
    <div>
      {parent ? 
        <div className='bg-orange rounded w-fit flex items-center text-white p-1' onClick={e => setParent(undefined)}>
          {assets.find(item => item.id === parent)?.assetName}
          <IonIcon className='cursor-pointer' slot="end" icon={closeOutline} />
        </div>
        :
        <IonInput value={text} placeholder={"Parent Asset"} onIonChange={e => setText(e.detail.value!)}/>
      }
      
      {text && text !== '' && assets.map((asset: any, index: number) => {
        if (asset.assetName.toLowerCase().includes(text.toLowerCase()) && index < 10) {
          return (
            <div className="cursor-pointer" key={asset.id} onClick={e => handleParentSelect(asset.id)}>
              {asset.assetName}
            </div>
          )
        }
      })}
    </div>
  )

}

export default AssetSelector