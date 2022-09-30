import { IonIcon, IonInput } from '@ionic/react'
import { API } from 'aws-amplify';
import { closeCircle, closeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react'
import { listAssets } from '../graphql/queries';

interface AssetSelectorProps {
  assets: Array<any>;
  setParentAsset: (assetID: string | undefined) => void;
  parentAsset?: string;
}

const AssetSelector = ({ assets, setParentAsset, parentAsset }: AssetSelectorProps) => {

  const [text, setText] = useState<string>();

  const handleParentSelect = (parentAsset: string) => {
    setText('');
    setParentAsset(parentAsset);
  }

  return (
    <div className='relative'>
      {parentAsset ?
        <div className='bg-orange rounded w-fit flex items-center text-white p-1' onClick={e => setParentAsset(undefined)}>
          {assets.find(item => item.id === parentAsset)?.assetName}
          <IonIcon className='cursor-pointer' slot="end" icon={closeOutline} />
        </div>
        :
        <div className='w-64 shadow flex items-center'>
          <IonInput className='grow' value={text} placeholder={"Asset Name or ID"} onIonChange={e => setText(e.detail.value!)} />
          {text && text !== '' && <IonIcon className='cursor-pointer pr-1 text-2xl text-primary-300' slot="end" icon={closeOutline} onClick={e => setText('')} />}
        </div>
      }
      {text && text !== '' && <div className='shadow-lg w-64 p-3 z-50 absolute bg-white'>
        {assets.map((asset: any, index: number) => {
          if (asset.assetName.toLowerCase().includes(text.toLowerCase()) && index < 10 && asset.id !== parentAsset) {
            return (
              <div className="cursor-pointer hover:bg-primary-400 transition ease-in-out p-1 rounded" key={asset.id} onClick={e => handleParentSelect(asset.id)}>
                {asset.assetName}
              </div>
            )
          }
        })
        }
      </div>
      }
    </div>
  )

}

export default AssetSelector