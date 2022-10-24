import { IonButton, IonCheckbox, IonContent, IonInput, IonLabel, IonList, IonPage, IonSearchbar, useIonAlert, useIonRouter, useIonToast } from '@ionic/react'
import { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import AssetSelector from '../components/AssetSelector'
import { listAssetTypes, listSimpleAssetGroups, listAssetStatuses, listAssetLocations, listAssets, getSimpleAssetGroup, getAsset } from '../graphql/queries'
import MultiAssetSelector from '../components/MultiAssetSelector'
import { createSimpleAssetGroup, deleteSimpleAssetGroup, updateAsset, updateSimpleAssetGroup } from '../graphql/mutations'
import { RouteComponentProps } from 'react-router'

interface EditGroupProps
    extends RouteComponentProps<{
        id: string;
    }> { }
    
const EditGroup: React.FC<EditGroupProps> = ({ match }) => {

  const [parentAsset, setParentAsset] = useState<string>();
  const [parentAssetCopy, setParentAssetCopy] = useState<string>();
  const [childAssets, setChildAssets] = useState<Array<string>>([]);
  const [childAssetsCopy, setChildAssetsCopy] = useState<Array<string>>([]);
  const [assets, setAssets] = useState<any>([]);
  const [availableID, setAvailableID] = useState<string>();
  const [deleteAlert] = useIonAlert();
  const [toast] = useIonToast();

  const router = useIonRouter();

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

    const updateSimpleAssetGroupCall = async () => {
      try {
        const groupResult: any = await API.graphql({
          query: updateSimpleAssetGroup,
          variables: {
            input: {
              id: match.params.id,
              parentAssetID: parentAsset
            }
          }
        });
        childAssets.forEach(async (childAsset: string) => {
        await API.graphql({
            query: updateAsset,
            variables: {
              input: {
                id: childAsset,
                groupID: groupResult.data.updateSimpleAssetGroup.id
              }
            }
          });
        // remove groupID from assets that are no longer in the group
        childAssetsCopy.forEach(async (childAsset: string) => {
          if (!childAssets.includes(childAsset)) {
            await API.graphql({
              query: updateAsset,
              variables: {
                input: {
                  id: childAsset,
                  groupID: null
                }
              }
            });
          }
        })
        // remove old group
        if (parentAssetCopy !== parentAsset) {
          await API.graphql({
              query: updateAsset,
              variables: {
                input: {
                  id: parentAsset,
                  groupID: groupResult.data.updateSimpleAssetGroup.id
                }
              }
            });
          }
          await API.graphql({
            query: updateAsset,
            variables: {
              input: {
                id: parentAssetCopy,
                groupID: null
              }
            }
          });
        });
        const presentToast = () => {
          toast({
            message: 'Group updated successfully',
            duration: 1500,
            position: 'bottom'
          });
        }
        presentToast();
      } catch (e: any) {
        console.log("Error creating Group:", e);
      }
    }
    updateSimpleAssetGroupCall();
  }

  const deleteGroup = async () => {
    // ionic alert to confirm if they want to delete the group
    // if yes, delete the group and remove the groupID from all assets in the group
    // if no, do nothing
    const deleteGroupCall = async () => {
      try {
        await API.graphql({
          query: deleteSimpleAssetGroup,
          variables: {
            input: {
              id: match.params.id,
            }
          }
        });
        // remove groupID from all assets in the group
        childAssets.forEach(async (childAsset: string) => {
          await API.graphql({
            query: updateAsset,
            variables: {
              input: {
                id: childAsset,
                groupID: null
              }
            }
          });
        })
        await API.graphql({
          query: updateAsset,
          variables: {
            input: {
              id: parentAsset,
              groupID: null
            }
          }
        });
        await router.push("/groups");
      } catch (e: any) {
        console.log("Error deleting Group:", e);
      }
    }
    deleteAlert({
      header: 'Delete Group',
      message: 'Are you sure you want to delete this group?',
      buttons: [
        'Cancel',
        { text: 'Confirm', handler: () => deleteGroupCall() }
      ],
    })
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
    const fetchGroupData = async () => {
      try {
        const groupData: any = await API.graphql({
          query: getSimpleAssetGroup,
          variables: { id: match.params.id },
          authMode: 'AWS_IAM'
        })
        if (groupData) {
          setParentAsset(groupData.data.getSimpleAssetGroup.parentAssetID)
          setParentAssetCopy(groupData.data.getSimpleAssetGroup.parentAssetID)
        }
      } catch (e: any) {
        console.log(e);
      }
    }
    fetchGroupData();
  }, []);

  // update child assets on parent change
  useEffect(() => {
    const fetchChildAssets = async () => {
      try {
        const childData: any = await API.graphql({
          query: listAssets,
          variables: { filter: { groupID: { eq: match.params.id } } },
          authMode: 'AWS_IAM'
        })
        if (parentAsset) {
          setChildAssets(childData.data.listAssets.items.map((asset: any) => asset.id))
          setChildAssetsCopy(childData.data.listAssets.items.map((asset: any) => asset.id))
        }
      } catch (e: any) {
        console.log(e)
      }
    }
    fetchChildAssets();
  }, [parentAsset])

  return (
    <IonPage>
      <Header title="Edit Group" />
      <IonContent>
        <div className="m-2 p-2 rounded bg-white">
          <form onSubmit={handleSubmit}>
          <IonLabel>Parent Asset</IonLabel>
            <AssetSelector assets={assets} parentAsset={parentAsset} setParentAsset={setParentAsset} childAssets={childAssets} currentGroup={match.params.id} />
            <IonLabel>Child Assets</IonLabel>
            <MultiAssetSelector assets={assets} childAssets={childAssets} setChildAssets={setChildAssets} parentAsset={parentAsset} />
            <IonButton type='submit' disabled={parentAsset ? false : true}>Update</IonButton>
            <IonButton onClick={deleteGroup}>Delete</IonButton>
          </form>
          <BackButton text="back" />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default EditGroup