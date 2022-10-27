import { IonIcon, IonInput } from '@ionic/react'
import { closeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react'

interface MultiAssetSelectorProps {
  assets: Array<any>;
  setChildAssets: (assetIDs: Array<string>) => void;
  childAssets: Array<string>;
  parentAsset: string | undefined;
}

const MultiAssetSelector = ({ assets, childAssets, setChildAssets, parentAsset }: MultiAssetSelectorProps) => {

  const [text, setText] = useState<string>();
  const [filteredAssets, setFilteredAssets] = useState(assets);

  // cant select parent and child at same time
  // cant select child in other group.
  useEffect(() => {
    if (assets.length > 0) {
      const tempFiltered = assets.filter(asset => asset.id !== parentAsset);
      setFilteredAssets(tempFiltered.filter(asset => asset.groupID === null));
    }
  }, [parentAsset, assets])

  const handleAssetSelect = (assetID: string) => {
    setText('');
    setChildAssets([...childAssets, assetID]);
  }

  const handleAssetRemove = (assetID: string) => {
    setChildAssets(childAssets.filter(item => item !== assetID));
  }

  return (
    <div className='relative'>
      <div className='w-64 shadow flex items-center'>
        <IonInput className='grow' value={text} placeholder={"Asset Name or ID"} onIonChange={e => setText(e.detail.value!)} />
        {text && text !== '' && <IonIcon className='cursor-pointer pr-1 text-2xl text-primary-300' slot="end" icon={closeOutline} onClick={e => setText('')} />}
      </div>
      {text && text !== '' && <div className='shadow-lg w-64 p-3 z-50 absolute bg-white'>
        {filteredAssets.map((asset: any, index: number) => {
          if (asset.assetName.toLowerCase().includes(text.toLowerCase()) && index < 10 && asset.id !== childAssets.find(item => item === asset.id)) {
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
        {childAssets.map((assetID: string) => {
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