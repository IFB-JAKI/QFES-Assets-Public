import { IonIcon, IonInput } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';

interface AssetSelectorProps {
  assets: Array<any>;
  setParentAsset: (assetID: string | undefined) => void;
  parentAsset?: string;
  childAssets: Array<string>;
  currentGroup?: string | undefined;
  ignoreGroup?: boolean;
}
// Selects a parent asset for a group, filters assets already selected as children and assets in other groups.
const AssetSelector = ({ assets, setParentAsset, parentAsset, childAssets, currentGroup, ignoreGroup }: AssetSelectorProps) => {

  const [text, setText] = useState<string>();
  const [filteredAssets, setFilteredAssets] = useState(assets);

  const handleParentSelect = (parentAsset: string) => {
    setText('');
    setParentAsset(parentAsset);
  }

  // filter child assets from assets
  useEffect(() => {
    if (!ignoreGroup) {
      if (assets.length > 0) {
        const tempFiltered = assets.filter(asset => !childAssets.includes(asset.id));
        if (currentGroup) {
          setFilteredAssets(tempFiltered.filter(asset => asset.groupID === null || asset.groupID === currentGroup));
        } else {
          setFilteredAssets(tempFiltered.filter(asset => asset.groupID === null));
        }
      }
    } else {
      setFilteredAssets(assets);
    }
  }, [childAssets, assets])

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
        {filteredAssets.map((asset: any, index: number) => {
          if (asset.assetName.toLowerCase().includes(text.toLowerCase()) && (!ignoreGroup ? asset.id !== parentAsset : true)) {
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