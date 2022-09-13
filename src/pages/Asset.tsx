import React, { useState, useEffect, useRef } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox, useIonLoading, IonLoading, IonButtons, IonInput, IonItem, IonLabel, IonModal } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset, getAssetGroup, getAssetStatus, getAssetLocation, getAssetType } from '../graphql/queries';
import { listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { updateAssetStatus, updateAsset } from '../graphql/mutations';
import BackButton from '../components/BackButton';
import Selector from '../components/Selector';
import { AssetType } from '../models';
import { resultingClientExists } from 'workbox-core/_private';
import { OverlayEventDetail } from '@ionic/core/components';

interface AssetProps
  extends RouteComponentProps<{
    id: string;
  }> { }

interface Status {
  id: string;
  statusName: string;
}

const Asset: React.FC<AssetProps> = ({ match }) => {

  // user input
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState({ name: '', id: undefined, dataTemplate: '', logTemplate: '' });
  const [status, setStatus] = useState({ name: '', id: undefined });
  const [location, setLocation] = useState({ name: '', id: undefined });
  const [group, setGroup] = useState(null);

  // dynamic field states
  const [typeFields, setTypeFields] = useState(Array<any>());
  const [logFields, setLogFields] = useState(Array<any>());

  // array of all possible statuses
  const [allStatuses, setAllStatuses] = useState(Array<Status>());

  // utility vars
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(true); // @TODO set false and show user that changes are not saved.


  const updateAssetCall = async (assetDetails: any, callback?: Function): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: updateAsset,
        variables: { input: assetDetails },
        authMode: 'AWS_IAM'
      });
      if (callback) {
        callback(result.data.updateAsset);
      }
    } catch (e) {
      console.log(e);
    }
    return;
  };

  // updates the asset status and page state with the new status if it is a valid status
  const updateStatusCall = async (statusName: string): Promise<void> => {
    let status = allStatuses.find((status) => status.statusName === statusName);
    if (status?.id) {
      updateAssetCall({ id: match.params.id, statusID: status.id }, (asset: any) => {
        try {
          setStatus({ name: allStatuses[asset.statusID].statusName, id: asset.statusID });
        } catch {
          console.log('Error updating status');
        }
      });
    } else {
      console.log('Error updating status');
    }
  };

  const handleLoanSubmit = () => {
    updateStatusCall('On Loan');
  }

  const handleReturnSubmit = () => {
    updateStatusCall('Available');
  }

  const handleMainSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let assetDetails = {
      id: match.params.id,
      assetName: name,
      description: description,
      typeID: type.id,
      groupID: group,
      assetlocaID: location.id
    };

    updateAssetCall(assetDetails);
  }

  //item is being archived
  // const handleArchiveSubmit = () => {
  //   //event.preventDefault();

  //   if(asset.statusID == "a038cae9-333c-485a-a56d-8a18877df97a"){
  //     presentAlert({
  //       header: 'Hold On!',
  //       subHeader: 'Asset cannot be archived while on loan.',
  //       message: 'Return asset before archiving',
  //       buttons: ['OK'],
  //     })
  //     return;
  //   }
  //   let assetDetails = {
  //     id: asset.id,
  //     statusID: '2748283f-120c-4153-8afc-f2fe68c94201'
  //   }

  //   const createStatusUpdate = async (): Promise<void> => {
  //     try {
  //       const result: any = await API.graphql({
  //         query: updateAsset,
  //         variables: { input: assetDetails },
  //         authMode: 'AWS_IAM'
  //       });
  //       // @TODO Success or error toast here
  //       console.log(result);
  //       setAsset(result.data.updateAsset);
  //       const resultUpdated: any = await API.graphql({
  //         query: getAsset,
  //         variables: { id: match.params.id },
  //         authMode: 'AWS_IAM'
  //       });
  //       const statusResult: any = await API.graphql({
  //         query: getAssetStatus,
  //         variables: { id: resultUpdated.data.getAsset.statusID },
  //         authMode: 'AWS_IAM'
  //       });
  //       setAsset(resultUpdated.data.getAsset);
  //       setStatus(statusResult.data.getAssetStatus);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     return;
  //   };
  //   createStatusUpdate();
  // }

  // //item is being restored
  // const handleRestoreSubmit = () => {
  //   //event.preventDefault();

  //   let assetDetails = {
  //     id: asset.id,
  //     statusID: '6e09c2e2-34a5-4da6-93f6-94fe5019705b'
  //   }

  //   const createStatusUpdate = async (): Promise<void> => {
  //     try {
  //       const result: any = await API.graphql({
  //         query: updateAsset,
  //         variables: { input: assetDetails },
  //         authMode: 'AWS_IAM'
  //       });
  //       // @TODO Success or error toast here
  //       console.log(result);
  //       setAsset(result.data.updateAsset);
  //       const resultUpdated: any = await API.graphql({
  //         query: getAsset,
  //         variables: { id: match.params.id },
  //         authMode: 'AWS_IAM'
  //       });
  //       const statusResult: any = await API.graphql({
  //         query: getAssetStatus,
  //         variables: { id: resultUpdated.data.getAsset.statusID },
  //         authMode: 'AWS_IAM'
  //       });
  //       setAsset(resultUpdated.data.getAsset);
  //       setStatus(statusResult.data.getAssetStatus);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     return;
  //   };
  //   createStatusUpdate();
  // }

  // Fetch all valid statuses
  useEffect(() => {
    const getAllStatuses = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: listAssetStatuses,
          authMode: 'AWS_IAM'
        });
        setAllStatuses(result.data.listAssetStatuses.items);
      } catch (e) {
        console.log(e);
      }
      return;
    }
    getAllStatuses();
  }, [])

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
        // wait for all data, then populate type form
        Promise.all([
          setName(asset.assetName),
          setDescription(asset.description),
          fetchType(asset.typeID),
          fetchStatus(asset.statusID),
          fetchLocation(asset.assetlocaID),
        ]).then(
          () => {
            if (type && type.dataTemplate !== '') {
              {
                try {
                  setTypeFields(JSON.parse(type.dataTemplate));
                } catch (e) {
                  setError("Could not parse data template for type " + type.name);
                }
              }
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
        setStatus({ name: statusResult.data.getAssetStatus.statusName, id: statusResult.data.getAssetStatus.id });
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
        setLocation(locationResult.data.getAssetLocation);

      } catch (e) {
        console.log(e);
      }
      return;
    }

    fetchAsset();

  }, [match.params.id]);

  // get type fields and event fields from selected type
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
    if (type && type.logTemplate !== '') {
      try {
        setLogFields(JSON.parse(type.logTemplate));
      } catch (e) {
        setError("Could not parse log template for type " + type.name);
      }
    }
  }, [type]);

  // modal logic
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      // action in modal confirmed
      // need to setup state for inputs then handle submit.
    }
  }

  return (
    <IonPage>
      <IonContent>
        {
          (loaded) ? (
            (error === '') ? (
              <>
                <h1>Asset Page for {name}</h1>
                <form onSubmit={handleMainSubmit}>
                  <h1>Asset Name:</h1>
                  <input onChange={(e) => setName(e.target.value)} placeholder={name} defaultValue={name}></input>
                  <h1>Asset Description:</h1>
                  <input onChange={(e) => setDescription(e.target.value)} placeholder={description} defaultValue={description}></input>
                  <Selector label="Asset Type: " queryType={listAssetTypes} handleChange={setType} nameKey="typeName" defaultValue={type?.id && type.id} />
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
                  <Selector label="Asset Location: " queryType={listAssetLocations} handleChange={setLocation} nameKey="locationName" defaultValue={location?.id && location.id} />
                  <Selector label="Asset Group" queryType={listAssetGroups} handleChange={setGroup} nameKey="name" />
                  <h1>Select an Image:</h1>
                  <input type="file" accept='image/jpeg, image/png'></input>
                  <IonButton type='submit'>Submit</IonButton>
                </form>

                {(status.name === 'Available') ? (
                  <IonButton id="open-modal">Loan</IonButton>
                ) : (
                  // @TODO add return
                  ''
                )}

                <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                  <IonHeader>
                    <IonToolbar>
                      <IonButtons slot="start">
                        <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                      </IonButtons>
                      <IonTitle>Loan Asset</IonTitle>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent className="ion-padding">
                    <IonItem>
                      <IonLabel position="stacked">Borrower</IonLabel>
                      <IonInput ref={input} type="text" placeholder="Borrower Name" />
                    </IonItem>
                    {
                      (logFields && logFields.length > 0) && (
                      logFields.map((field, index) => {
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
                      )
                  }
                    <IonButton onClick={confirm}>Loan</IonButton>
                  </IonContent>
                </IonModal>

                <BackButton text="back" />
              </>
            ) : (
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