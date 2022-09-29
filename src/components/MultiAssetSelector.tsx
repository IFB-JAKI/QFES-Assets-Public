import { IonIcon, IonInput } from '@ionic/react'
import { API } from 'aws-amplify';
import { closeCircle, closeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react'
import { listAssets } from '../graphql/queries';

const MultiAssetSelector = () => {

  const [text, setText] = useState<string>();
  const [assets, setAssets] = useState(Array<any>());
  const [selected, setSelected] = useState(Array<string>());

  useEffect(() => {
    const fetchAssets = async () => {
      const result: any = await API.graphql({
        query: listAssets,
        authMode: 'AWS_IAM'
      });
      setAssets(result.data.listAssets.items);
    }
    fetchAssets();
  }, []);

  const handleAssetSelect = (assetID: string) => {
    setSelected([...selected, assetID]);
  }

  const handleAssetRemove = (assetID: string) => {
    setSelected(selected.filter(item => item !== assetID));
  }

  return (
    <div className='relative'>
      <div className='w-64 shadow flex items-center'>
        <IonInput className='grow' value={text} placeholder={"Asset Name or ID"} onIonChange={e => setText(e.detail.value!)} />
        {text && text !== '' && <IonIcon className='cursor-pointer pr-1 text-2xl text-primary-300' slot="end" icon={closeOutline} onClick={e => setText('')} />}
      </div>
      {text && text !== '' && <div className='shadow-lg w-64 p-3 z-50 absolute bg-white'>
        {assets.map((asset: any, index: number) => {
          if (asset.assetName.toLowerCase().includes(text.toLowerCase()) && index < 10 && asset.id !== selected.find(item => item === asset.id)) {
            return (
              <div className="cursor-pointer hover:bg-primary-400 transition ease-in-out p-1 rounded" key={asset.id} onClick={e => handleAssetSelect(asset.id)}>
                {asset.assetName}
              </div>
            )
          }
        })
        }
      </div>
      }
      <div className='flex flex-wrap mt-3'>
        {selected.map((assetID: string) => {
          return (
            <div className='bg-orange rounded w-fit flex items-center text-white p-1 ml-1' key={assetID} onClick={e => handleAssetRemove(assetID)}>
              {assets.find(item => item.id === assetID)?.assetName}
              <IonIcon className='cursor-pointer' slot="end" icon={closeOutline} />
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default MultiAssetSelector