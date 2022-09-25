import React, { useState, useEffect, useRef } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox, useIonLoading, IonLoading, IonButtons, IonInput, IonItem, IonLabel, IonModal, useIonAlert } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset, getAssetGroup, getAssetStatus, getAssetLocation, getAssetType } from '../graphql/queries';
import { listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { updateAssetStatus, updateAsset, createAssetLog } from '../graphql/mutations';
import BackButton from '../components/BackButton';
import Selector from '../components/Selector';
import { AssetType } from '../models';
import { resultingClientExists } from 'workbox-core/_private';
import { OverlayEventDetail } from '@ionic/core/components';
import { parse } from 'path';
import SignatureCanvas from 'react-signature-canvas'

interface AssetProps
  extends RouteComponentProps<{
    id: string;
  }> { }

interface Status {
  id: string;
  statusName: string;
}

interface FieldsInterface {
  name: string,
  type: string,
  value?: string
}

const Asset: React.FC<AssetProps> = ({ match }) => {
  const [presentAlert] = useIonAlert();
  // user input
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState({ name: '', id: undefined, dataTemplate: '', logTemplate: '' });
  const [status, setStatus] = useState({ name: '', id: undefined });
  const [location, setLocation] = useState({ name: '', id: undefined });
  const [group, setGroup] = useState(null);
  const [assetTypeData, setAssetTypeData] = useState(Array<FieldsInterface>());

  // dynamic field states
  const [typeFields, setTypeFields] = useState(Array<any>());
  const [logFields, setLogFields] = useState(Array<any>());

  // array of all possible statuses
  const [allStatuses, setAllStatuses] = useState(Array<Status>());

  // utility vars
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(true); // @TODO set false and show user that changes are not saved.

  // modal logic
  const modal = useRef<HTMLIonModalElement>(null);
  const BorrowerInput = useRef<HTMLIonInputElement>(null);

  //sigPad
  const [dataURL, setDataURL] = React.useState<string | null>(null);
  let padRef = React.useRef<SignatureCanvas>(null);
  const clear = () => {
    padRef.current?.clear();
  };

  const trim = () => {
    const url = padRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (url) setDataURL(url);
  };

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
          let tempStatus = allStatuses.find((status) => status.id === asset.statusID);
          if (tempStatus && tempStatus?.statusName) {
            setStatus({ name: tempStatus.statusName, id: asset.statusID });
          }
        } catch (e) {
          console.log(e);
        }
      });
    } else {
      console.log('Error updating status');
    }
  };

  const handleLoanSubmit = () => {
    // create loan event
    // get loan event id, assign to asset
    
    const createLoanEvent = async () => {
      let assetLogData = Array<any>();
      let now = new Date().valueOf();
      let assetLogDataString = JSON.stringify(assetLogData);
      let BorrowerUserName = (BorrowerInput.current?.value) ? BorrowerInput.current?.value : 'Unknown';
      try {
        const result: any = await API.graphql({
          query: createAssetLog,
          variables: { input: { 
            assetID: match.params.id,
            assetLogData: assetLogDataString,
            borrowerUsername: BorrowerUserName,
            borrowDate: now,
          } },
          authMode: 'AWS_IAM'
        });
        await updateAssetCall({ id: match.params.id, currentEvent: result.data.createAssetLog.id });
      } catch (e) {
        console.log(e);
      }
      return;
    }
    createLoanEvent();
    updateStatusCall('On Loan');
  }

  const handleReturnSubmit = () => {
    updateStatusCall('Available');
    let now = new Date().valueOf();
    // create return event
    const createReturnEvent = async () => {
      try {
        const result: any = await API.graphql({
          query: createAssetLog,
          variables: { input: { 
            assetID: match.params.id,
            returnDate: now,
          } },
          authMode: 'AWS_IAM'
        });
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
    createReturnEvent();
  }

  const handleArchiveSubmit = () => {
    if(status.name == "On Loan"){
        presentAlert({
            header: 'Hold On!',
            subHeader: 'Asset cannot be archived while on loan.',
            message: 'Return asset before archiving',
            buttons: ['OK'],
          })
          return;
        }
    updateStatusCall('Archived');  
  }

  const handleRestoreSubmit = () => {
    const createRestoreEvent = async () => {

    }
    createRestoreEvent();
    updateStatusCall('Available');  
  }

  const handleMainSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let typeInputs = typeFields.map((field) => {
      return { name: field.name, value: field.value }
    });

    let assetDetails = {
      id: match.params.id,
      assetName: name,
      description: description,
      typeID: type.id,
      groupID: group,
      assetlocaID: location.id,
      assetTypeData: JSON.stringify(typeInputs)
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
    setTypeFields([]);
    if (type && type.dataTemplate) {
      {
        try {
          let parsedTemplate = JSON.parse(type.dataTemplate);
          let merged = []
          if (assetTypeData) {
            for(let i=0; i<parsedTemplate.length; i++) {
              let found = assetTypeData.find((item: any) => item.name === parsedTemplate[i].name);
              if (found && found?.value) {
                merged.push({
                  ...parsedTemplate[i],
                  ...found
                });
              } else {
                merged.push({...parsedTemplate[i], value: ''});
              }
            }
          } else {
            merged = parsedTemplate;
          }
          setTypeFields(merged);
        } catch (e) {
          console.log(e);
          setError("Could not parse data template for type " + type.name);
        }
      }
    }
    if (type && type.logTemplate) {
      {
        try {
          let parsedTemplate = JSON.parse(type.logTemplate);
          // give value a default, required for controlled form element
          parsedTemplate.map((field: FieldsInterface) => {
            field.value = '';
          })
          setLogFields(parsedTemplate);
        } catch (e) {
          setError("Could not parse log template for type " + type.name);
        }
      }
    }
  }, [assetTypeData, type]);

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
        console.log(asset)
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
          setAssetTypeData(JSON.parse(asset.assetTypeData))
        ]).then(() => 
            setLoaded(true)
          );
      } catch (e: any) {
        setLoaded(true);
        setError(e.message);
      }
      return;
    }

    const fetchStatus = async (statusID: string): Promise<void> => {
      if (statusID) {
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
    }

    const fetchType = async (typeId: string): Promise<void> => {
      if (typeId) {
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
    }

    const fetchLocation = async (locationID: string): Promise<void> => {
      if (locationID) {
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
      }
      return;
    }
    if (match.params.id) {
      fetchAsset();
    }
  }, [match.params.id]);

  function confirm() {
    modal.current?.dismiss(BorrowerInput.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      // action in modal confirmed
      handleLoanSubmit();
    }
  }

  const handleTypeChange = (index: number, e: any) => {
    let data = [...typeFields];
    data[index].value = e.target.value;
    setTypeFields(data);
  }

  const handleLogChange = (index: number, e: any) => {
    let data = [...logFields];
    data[index].value = e.target.value;
    setLogFields(data);
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
                        fieldJsx = <input type="text" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                      } else if (field.type === 'number') {
                        fieldJsx = <input type="number" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                      } else if (field.type === 'date') {
                        fieldJsx = <input type="date" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                      } else if (field.type === 'boolean') {
                        fieldJsx = <IonCheckbox value={field.value} onChange={e => handleTypeChange(index, e)}></IonCheckbox>
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

                {/*Display the button for Loan/Return */}
                {status.name === "Available" &&<IonButton id="open-modal">Loan</IonButton>}
                {status.name === "On Loan" &&<IonButton onClick={handleReturnSubmit}>Return</IonButton>}
               
                {/*Display the button for Archive/Restore */}
                {(status.name === 'Available'|| status.name === 'On Loan') ?
                (<IonButton onClick={handleArchiveSubmit}>Archive Asset</IonButton> ) 
                : (<IonButton onClick={handleRestoreSubmit}>Restore Asset</IonButton>)}
                
                

                
 
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
                      <IonInput ref={BorrowerInput} type="text" placeholder="Borrower Name" />
                      

                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Digital Signature</IonLabel>
                      <SignatureCanvas ref={padRef} penColor='black'
                        canvasProps={{width: 550, height: 200, className: 'sigCanvas'}}/>

                        <IonButton color = 'light' onClick={clear}>Clear</IonButton>
                        <IonButton color = 'light' onClick={trim}>Finish</IonButton>

                    </IonItem>
                    {
                      (logFields && logFields.length > 0) && (
                        logFields.map((field, index) => {
                          let fieldJsx;
                          if (field.type === 'text') {
                            fieldJsx = <input type="text" value={field.value} onChange={e => handleLogChange(index, e)}></input>
                          } else if (field.type === 'number') {
                            fieldJsx = <input type="number" value={field.value} onChange={e => handleLogChange(index, e)}></input>
                          } else if (field.type === 'date') {
                            fieldJsx = <input type="date" value={field.value} onChange={e => handleLogChange(index, e)}></input>
                          } else if (field.type === 'boolean') {
                            fieldJsx = <IonCheckbox  value={field.value} onChange={e => handleLogChange(index, e)}></IonCheckbox>
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