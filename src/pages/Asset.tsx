import React, { useState, useEffect } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox, useIonLoading, IonLoading } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset, getAssetGroup, getAssetStatus, getAssetLocation, getAssetType } from '../graphql/queries';
import { listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { updateAssetStatus, updateAsset } from '../graphql/mutations';
import BackButton from '../components/BackButton';
import Selector from '../components/Selector';
import { AssetType } from '../models';
import { resultingClientExists } from 'workbox-core/_private';

interface AssetProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const Asset: React.FC<AssetProps> = ({ match }) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [type, setType] = useState({ name: '', id: undefined, dataTemplate: '' });
  const [typeFields, setTypeFields] = useState(Array<any>());

  const [status, setStatus] = useState({ name: '', id: undefined });
  const [location, setLocation] = useState({ name: '', id: undefined });
  const [group, setGroup] = useState(null);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   //Alert to ask if they would like to submit, the use if statement to go through exisiting code, otherwise return to form
  //   let assetDetails = {
  //     assetName: name,
  //     description: description,
  //     typeID: type.id,
  //     groupID: group,
  //     statusID: status.id,
  //     assetlocaID: location.id
  //   }

  //   const updateAssetCall = async (): Promise<void> => {
  //     try {
  //       const result: any = await API.graphql({
  //         query: updateAsset,
  //         variables: { input: assetDetails },
  //         authMode: 'AWS_IAM'
  //       });
  //       // @TODO Success or error toast here
  //       console.log(result);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     return;
  //   };
  //   updateAssetCall();
  // }

  useEffect(() => {

    // fetch asset and construct form with existing data
    const fetchAsset = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: getAsset,
          variables: { id: match.params.id },
          authMode: 'AWS_IAM'
        });
        let asset = result.data.getAsset;
        if (!asset) {
          throw new Error('Asset ID not found');
        }
        Promise.all([
          setName(asset.assetName),
          setDescription(asset.description),
          fetchType(asset.typeID),
          fetchStatus(asset.statusID),
          fetchLocation(asset.assetlocaID),
        ]).then(
          () => {
          if (type && type.dataTemplate !== '') {
             { try {
              setTypeFields(JSON.parse(type.dataTemplate));
            } catch (e) {
              setError("Could not parse data template for type " + type.name);
            }}
          }
        }).then(
          () => setLoaded(true)
        );
      } catch (e: any) {
        setLoaded(true);
        setError(e.message);
      }
      return;
    }

    const fetchStatus = async (statusID: string): Promise<void> => {
      try {
        const statusResult: any = await API.graphql({
          query: getAssetStatus,
          variables: { id: statusID },
          authMode: 'AWS_IAM'
        });

        console.log(statusResult);
        setStatus(statusResult.data.getAssetStatus);

      } catch (e) {
        console.log(e);
      }
      return;
    }

    const fetchType = async (typeId: string): Promise<void> => {
      try {
        const typeResult: any = await API.graphql({
          query: getAssetType,
          variables: { id: typeId },
          authMode: 'AWS_IAM'
        });
        setType(typeResult.data.getAssetType);
      } catch (e) {
        console.log(e);
      }
      return;
    }

    const fetchLocation = async (locationID: string): Promise<void> => {
      try {
        const locationResult: any = await API.graphql({
          query: getAssetLocation,
          variables: { id: locationID },
          authMode: 'AWS_IAM'
        });

        console.log(locationResult);
        setLocation(locationResult.data.getAssetLocation);

      } catch (e) {
        console.log(e);
      }
      return;
    }

    fetchAsset();

  }, [match.params.id]);

  useEffect(() => {
    if (type && type.dataTemplate !== '') {
      try {
        setTypeFields(JSON.parse(type.dataTemplate));
      } catch (e) {
        setError("Could not parse data template for type " + type.name);
      }
    } else {
      setTypeFields([]);
    }
  }, [type]);

  return (
    <IonPage>
      <IonContent>
        {
          (loaded) ? (
            (error === '') ? (
            <>
              <h1>Asset Page for {name}</h1>
              <form >
                <h1>Asset Name:</h1>
                <input onChange={(e) => setName(e.target.value)} placeholder={name} defaultValue={name}></input>
                <h1>Asset Description:</h1>
                <input onChange={(e) => setDescription(e.target.value)} placeholder={description} defaultValue={description}></input>
                <Selector label="Asset Type: " queryType={listAssetTypes} handleChange={setType} nameKey="typeName" defaultValue={type?.id && type.id}/>
                {
                  typeFields.map((field, index) => {
                    let fieldJsx;
                    if (field.type === 'text') {
                      fieldJsx = <input type="text"></input>
                    } else if (field.type === 'number') {
                      fieldJsx = <input type="number" ></input>
                    } else if (field.type === 'date') {
                      fieldJsx = <input type="date" ></input>
                    } else if (field.type === 'boolean') {
                      fieldJsx = <IonCheckbox></IonCheckbox>
                    }
                    return (
                      <div key={index}>
                        <label>{field.name}: </label>
                        {fieldJsx}
                      </div>
                    )
                  }, [])
                }
                <p>Asset Data: </p>
                <Selector label="Asset Status: " queryType={listAssetStatuses} handleChange={setStatus} nameKey="statusName" defaultValue={status?.id && status.id}/>
                <Selector label="Asset Location: " queryType={listAssetLocations} handleChange={setLocation} nameKey="locationName" defaultValue={location?.id && location.id}/>
                <Selector label="Asset Group" queryType={listAssetGroups} handleChange={setGroup} nameKey="name" />
                <h1>Select an Image:</h1>
                <input type="file" accept='image/jpeg, image/png'></input>
                <IonButton type='submit'>Submit</IonButton>
              </form>
              <BackButton text="back" />
            </>
            ): (
              <div>
                <BackButton text="back" />
                <h1>{error}</h1>
              </div>
            )
          ) :
            (
              <IonLoading
              cssClass='my-custom-class'
              isOpen={!loaded}
              onDidDismiss={() => setLoaded(true)}
              message={'Loading...'}
              />
            )
        }
      </IonContent>
    </IonPage>
  )
}

export default Asset