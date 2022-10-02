import { IonButton, IonCheckbox, IonContent, IonInput, IonLabel, IonList, IonPage, IonSearchbar } from '@ionic/react'
import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import AssetSelector from '../components/AssetSelector'
import { listAssetTypes, listGroups, listAssetStatuses, listAssetLocations, listAssets } from '../graphql/queries'
import MultiAssetSelector from '../components/MultiAssetSelector'
import { createGroup } from '../graphql/mutations'

const NewGroup = ({ user }: any) => {

  const [parentAsset, setParentAsset] = useState<string>();
  const [childAssets, setChildAssets] = useState<Array<string>>([]);
  const [assets, setAssets] = useState<any>([]);
  const [availableID, setAvailableID] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // status check - all assets must be available
    event.preventDefault();

    const invalidAssets = assets.filter((asset: any) => asset.statusID !== availableID && childAssets.includes(asset.id))
    if (assets.find((asset: any) => asset.id === parentAsset).statusID !== availableID) {
      invalidAssets.push(assets.find((asset: any) => asset.id === parentAsset))
    }
    if (invalidAssets.length > 0) {
      alert("The following assets are not available and cannot be added to a group: " + invalidAssets.map((asset: any) => asset.assetName).join(", "))
      return
    }
    console.log(invalidAssets)

    const createGroupCall = async () => {
      try {
        const group = {
          asset: parentAsset,
          ChildAssets: childAssets,
        }
        const groupResult: any = await API.graphql({
          query: createGroup,
          variables: { input: group }
        });
        console.log("Group created:", groupResult);
      } catch (e: any) {
        console.log("Error creating Group:", e);
      }
    }

    createGroupCall();
  }

  useEffect(() => {
    const fetchAssets = async () => {
      const result: any = await API.graphql({
        query: listAssets,
        authMode: 'AWS_IAM'
      });
      setAssets(result.data.listAssets.items);
    }
    fetchAssets();
    const getAvailableID = async () => {
      try {
        const availableID: any = await API.graphql({
          query: listAssetStatuses,
          variables: { filter: { statusName: { eq: "Available" } } }
        })
        setAvailableID(availableID.data.listAssetStatuses.items[0].id)
      } catch (e: any) {
        console.log(e)
      }
    }
    getAvailableID();
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