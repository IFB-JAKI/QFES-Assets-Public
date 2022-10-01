import { IonButton, IonCheckbox, IonContent, IonInput, IonLabel, IonList, IonPage, IonSearchbar } from '@ionic/react'
import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import AssetSelector from '../components/AssetSelector'
import { listAssetTypes, listAssetGroups, listAssetStatuses, listAssetLocations, listAssets } from '../graphql/queries'
import MultiAssetSelector from '../components/MultiAssetSelector'

const NewGroup = ({ user }: any) => {

  const handleSubmit = () => {
    // waiting on asset page to be finished
  }

  const [parentAsset, setParentAsset] = useState<string>();
  const [childAssets, setChildAssets] = useState<Array<string>>([]);
  const [assets, setAssets] = useState<any>([]);

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

  return (
    <IonPage>
      <Header user={user} title="New Group" />
      <IonContent>
        <div className="m-2 p-2 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <IonLabel>Parent Asset</IonLabel>
            <AssetSelector assets={assets} parentAsset={parentAsset} setParentAsset={setParentAsset} childAssets={childAssets} />
            <IonLabel>Child Assets</IonLabel>
            <MultiAssetSelector assets={assets} childAssets={childAssets} setChildAssets={setChildAssets} parentAsset={parentAsset} />
            <IonButton type='submit'>Submit</IonButton>
          </form>
          <BackButton text="back" />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default NewGroup