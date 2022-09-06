import React, { useState, useEffect } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset, getAssetGroup, getAssetStatus, getAssetLocation, getAssetType } from '../graphql/queries';
import { listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { updateAssetStatus, updateAsset } from '../graphql/mutations';
import BackButton from '../components/BackButton';
import Selector from '../components/Selector';

interface AssetProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const Asset: React.FC<AssetProps> = ({ match }) => {

  const [asset, setAsset] = useState<any>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [type, setType] = useState({ name: '', id: null, dataTemplate: '' });
  const [typeFields, setTypeFields] = useState(Array<any>());

  const [group, setGroup] = useState(null);
  const [status, setStatus] = useState({ name: null, id: null });
  const [location, setLocation] = useState({ name: null, id: null });

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

    fetchAsset();

  }, [match.params.id]);

  //When user clicks on Edit Name button, field becomes enabled
  const handleNameSubmit = () => {
    const input = document.getElementById("nameInput")! as HTMLInputElement;
    input.disabled = false;
  }

  //When user clicks on Edit Description button, field becomes enabled
  const handleDescSubmit = () => {
    const input = document.getElementById("descInput")! as HTMLInputElement;
    input.disabled = false;
  }

  return (
    <IonPage>
      <IonContent>
        {
          (asset) ? (
            <>
              <h1>Asset Page for {asset.assetName}</h1>
              <form onSubmit={handleSubmit}>
                <br></br>
                <h1>Asset Name:</h1>
                <input onChange={(e) => setName(e.target.value)} placeholder={asset.assetName} disabled={true} id={"nameInput"}></input>
                <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => { handleNameSubmit() }}>Edit Asset Name</IonButton>
                {/* <img src="src\pages\images\editItem.png" alt="Edit Asset" width="50" height="50"></img> */}
                <br></br>
                <br></br>
                <h1>Asset Description:</h1>
                <input onChange={(e) => setDescription(e.target.value)} placeholder={description} disabled={true} id={"descInput"}></input>
                <IonButton color="primary" onClick={(event: React.MouseEvent<HTMLElement>) => { handleDescSubmit() }}>Edit Asset Description</IonButton>
                <br></br>
                <br></br>
                <h1>Asset Type:</h1>
                <Selector label="Type" queryType={listAssetTypes} handleChange={setType} nameKey="typeName" />
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
                <h1>Asset Group:</h1>
                <Selector label="Group" queryType={listAssetGroups} handleChange={setGroup} nameKey="name" />
                <br></br>
                <h1>Asset Status:</h1>
                <Selector label="Status" queryType={listAssetStatuses} handleChange={setStatus} nameKey="statusName" />
                <br></br>
                <h1>Asset Location:</h1>
                <Selector label="Location" queryType={listAssetLocations} handleChange={setLocation} nameKey="locationName" />
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