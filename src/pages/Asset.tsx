import React, { useState, useEffect } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox } from '@ionic/react'
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

  const [asset, setAsset] = useState<any>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [type, setType] = useState({ typeName: '', id: null, dataTemplate: '' });
  const [typeFields, setTypeFields] = useState(Array<any>());

  const [group, setGroup] = useState(null);
  const [status, setStatus] = useState({ statusName: '', id: null });
  const [location, setLocation] = useState({ locationName: '', id: null });

  const router = useIonRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Alert to ask if they would like to submit, the use if statement to go through exisiting code, otherwise return to form
    let assetDetails = {
      assetName: name,
      description: description,
      typeID: type.id,
      groupID: group,
      statusID: status.id,
      assetlocaID: location.id
    }

    const updateAssetCall = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: updateAsset,
          variables: { input: assetDetails },
          authMode: 'AWS_IAM'
        });
        // @TODO Success or error toast here
        console.log(result);
      } catch (e) {
        console.log(e);
      }
      return;
    };
    updateAssetCall();
  }

  useEffect(() => {

    const fetchAsset = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: getAsset,
          variables: { id: match.params.id },
          authMode: 'AWS_IAM'
        });

        console.log(result);
        setAsset(result.data.getAsset);

      } catch (e) {
        console.log(e);
      }
      return;
    }

    const fetchStatus = async (): Promise<void> => {
      try {
        const statusResult: any = await API.graphql({
          query: getAssetStatus,
          variables: { id: asset.statusID },
          authMode: 'AWS_IAM'
        });

        console.log(statusResult);
        setStatus(statusResult.data.getAssetStatus);

      } catch (e) {
        console.log(e);
      }
      return;
    }

    const fetchType = async (): Promise<void> => {
      try {
        const typeResult: any = await API.graphql({
          query: getAssetType,
          variables: { id: asset.typeID },
          authMode: 'AWS_IAM'
        });

        console.log(typeResult);
        setType(typeResult.data.getAssetType);

      } catch (e) {
        console.log(e);
      }
      return;
    }

    const fetchLocation = async (): Promise<void> => {
      try {
        const locationResult: any = await API.graphql({
          query: getAssetLocation,
          variables: { id: asset.assetlocaID },
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
    fetchStatus();
    fetchType();
    fetchLocation();

  }, [match.params.id]);

  return (
    <IonPage>
      <IonContent>
        {
          (asset) ? (
            <>
              <h1>Asset Page for {asset.assetname}</h1>
              {/* <h1>Type is {typeof type.typeName}</h1> */}
              <form onSubmit={handleSubmit}>
                <br></br>
                <h1>Asset Name:</h1>
                <input onChange={(e) => setName(e.target.value)} placeholder={asset.assetName} defaultValue={asset.assetName}></input>
                {/* <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => { handleNameSubmit() }}>Edit Asset Name</IonButton> */}
                {/* <img src="src\pages\images\editItem.png" alt="Edit Asset" width="50" height="50"></img> */}
                <br></br>
                <br></br>
                <h1>Asset Description:</h1>
                <input onChange={(e) => setDescription(e.target.value)} placeholder={description} defaultValue={description}></input>
                {/* <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => { handleDescSubmit() }}>Edit Asset Description</IonButton> */}
                <br></br>
                <br></br>
                <Selector label="Asset Type: " queryType={listAssetTypes} handleChange={setType} nameKey="typeName" defaultValue={type.typeName !== null ? (type.typeName !== undefined ? type.typeName : '') : ''} />
                <br></br>
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
                <IonButton routerLink='/newType'>New Type</IonButton>
                <br></br>
                <p>Asset Data: </p>
                <br></br>
                <Selector label="Asset Group" queryType={listAssetGroups} handleChange={setGroup} nameKey="name" />
                <br></br>
                { }
                <Selector label="Asset Status:" queryType={listAssetStatuses} handleChange={setStatus} nameKey="statusName" defaultValue={status.statusName !== null ? (status.statusName !== undefined ? status.statusName : '') : ''} />
                <br></br>
                <Selector label="Asset Location:" queryType={listAssetLocations} handleChange={setLocation} nameKey="locationName" defaultValue={location.locationName !== null ? (location.locationName !== undefined ? location.locationName : '') : ''} />
                <br></br>
                <h1>Select an Image:</h1>
                <input type="file" accept='image/jpeg, image/png'></input>
                <br></br>
                <IonButton type='submit'>Submit</IonButton>
              </form>

              <BackButton text="back" />
            </>
          ) :
            (
              <div>
                <BackButton text="back" />
                <h1>ERROR 404! There is no asset with that ID! Go back</h1>
              </div>
            )
        }
      </IonContent>
    </IonPage>
  )
}

export default Asset