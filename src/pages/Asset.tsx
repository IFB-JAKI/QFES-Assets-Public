import React, { useState, useEffect, useRef } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox, useIonLoading, IonLoading, IonButtons, IonInput, IonItem, IonLabel, IonModal, useIonAlert, useIonModal, useIonToast } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API, Storage } from 'aws-amplify';
import { getAsset, getSimpleAssetGroup, getAssetStatus, getAssetLocation, getAssetType, getAssetLog, listAssetLogs } from '../graphql/queries';
import { listSimpleAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { updateAssetStatus, updateAsset, createAssetLog, deleteAsset } from '../graphql/mutations';
import BackButton from '../components/BackButton';
import Selector from '../components/Selector';
import { AssetType } from '../models';
import { resultingClientExists } from 'workbox-core/_private';
import { OverlayEventDetail } from '@ionic/core/components';
import { parse } from 'path';
import SignatureCanvas from 'react-signature-canvas'
import { ButtonGroup } from '@aws-amplify/ui-react';
import { Router } from '@aws-amplify/ui-react/dist/types/components/Authenticator/Router';
import LoanModal from '../components/LoanModal';
import { bool } from 'prop-types';
import Header from '../components/Header';
import { qrCode, remove } from 'ionicons/icons';

interface AssetProps
  extends RouteComponentProps<{
    id: string;
  }> {
    user: any;
   }

interface Status {
  id: string;
  statusName: string;
}

interface FieldsInterface {
  name: string,
  type: string,
  value?: string
}

interface GroupsProps {
  user: any;
}

const Asset: React.FC<AssetProps> = ({ match, user }) => {
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  // user input
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [QRCode, setQRCode] = useState('');
  const [type, setType] = useState({ name: '', id: undefined, dataTemplate: '', logTemplate: '' });
  const [status, setStatus] = useState({ name: '', id: undefined });
  //const [location, setLocation] = useState({ name: '', id: undefined });
  const [assetLocation, setLocation] = useState('');
  const [group, setGroup] = useState('');
  const [assetTypeData, setAssetTypeData] = useState(Array<FieldsInterface>());
  const [currentLoanEvent, setCurrentLoanEvent] = useState('');
  const [displaySig, setDisplaySig] = useState(false);

  //const [currentLoanEventInfo, setCurrentLoanEventInfo] = useState({name: '', id: undefined, username: undefined, dateOfBorrow: Date, dateOfReturn: Date});

  // dynamic field states
  const [typeFields, setTypeFields] = useState(Array<any>());
  const [logFields, setLogFields] = useState(Array<any>());

  // array of all possible statuses
  const [allStatuses, setAllStatuses] = useState(Array<Status>());

  // utility vars
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(true);

  // modal logic
  const modal = useRef<HTMLIonModalElement>(null);
  const [borrower, setBorrower] = useState('');
  const [dataUrl, setDataUrl] = useState('');
  const [modalSaved, setModalSaved] = useState(true);

  const router = useIonRouter();

  const [imageKey, setImageKey] = useState('');
  const [signedURL, setSignedURL] = useState('');
  const [signedSigURL, setSigneSigURL] = useState('');

  const [loanLog, setLoanLog] = useState(Array<any>());
  const [currentLoanEventInfo, setCurrentLoanEventInfo] = useState();
  const [itemLoanedDate, setItemLoanedDate] = useState(Date);
  const [itemReturnedDate, setItemReturnedDate] = useState(Date);
  const [loanUser, setLoanUser] = useState('');
  const [assetLogData1, setAssetLogData1] = useState(Array<any>());
  const [assetLogString, setAssetLogString] = useState('');
  const [digSig, setDigSig] = useState('');
  interface GroupsProps {
    user: any;
  }

  const presentActionToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    presentToast({
      message: message,
      duration: 1500,
      position: position,

    });
  }

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
      console.log(result);
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

  useEffect (() => {
    const handleLoanSubmit = () => {
      // create loan event
      // get loan event id, assign to asset

      const createLoanEvent = async () => {
        let now = new Date().valueOf();
        //setAssetLogData(logFields);
        let assetLogDataString = JSON.stringify(logFields);
        try {
          const result: any = await API.graphql({
            query: createAssetLog,
            variables: {
              input: {
                assetID: match.params.id,
                assetLogData: assetLogDataString,
                borrowerSignature: dataUrl,
                borrowerUsername: borrower,
                borrowDate: now,
              }
            },
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
    if (!modalSaved) {
      handleLoanSubmit();
      setModalSaved(true);
    }
  }, [modalSaved]);

  const handleReturnSubmit = () => {
    
    updateStatusCall('Available');
    let now = new Date().valueOf();
    // create return event
    const createReturnEvent = async () => {
      try {
        const result: any = await API.graphql({
          query: createAssetLog,
          variables: {
            input: {
              assetID: match.params.id,
              returnDate: now,
            }
          },
          authMode: 'AWS_IAM'
        });
        //console.log(result);
        await updateAssetCall({ id: match.params.id, currentEvent: result.data.createAssetLog.id });
      } catch (e) {
        console.log(e);
      }
    }
    createReturnEvent();
    presentActionToast('bottom', "Item Returned");
  }

  const handleArchiveSubmit = () => {
    if (status.name == "On Loan") {
      presentAlert({
        header: 'Hold On!',
        subHeader: 'Asset cannot be archived while on loan.',
        message: 'Return asset before archiving',
        buttons: ['OK'],
      })
      return;
    }
    updateStatusCall('Archived');
    presentActionToast('bottom', "Item Archived");
  }

  const handleRestoreSubmit = () => {
    const createRestoreEvent = async () => {

    }
    presentActionToast('bottom', "Item Restored");
    createRestoreEvent();
    updateStatusCall('Available');

  }

  const removeAsset = async (): Promise<void> => {
    if (status.name == "On Loan") {
      presentAlert({
        header: 'Hold On!',
        subHeader: 'Asset cannot be deleted while on loan.',
        message: 'Return asset before deleting',
        buttons: ['OK'],
      })
      return;
    }
    let deleteDetails = match.params.id;
    try{
      const deleteAssetItem: any = await API.graphql({
        query: deleteAsset,
        variables: {input: {
          id: match.params.id,

        }},
        authMode: 'AWS_IAM'
      })
    }catch(e){
      console.log(e);
      setError("Could not delete asset!");
    }
    
    return
  }

  const handleMainSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let typeInputs = typeFields.map((field) => {
      return { name: field.name, value: field.value }
    });

    let assetDetails = {
      id: match.params.id,
      QRCode: QRCode,
      assetName: name,
      description: description,
      typeID: type.id,
      groupID: group,
      assetlocaID: assetLocation,
      assetTypeData: JSON.stringify(typeInputs),
      imageLink: imageKey
    };
    updateAssetCall(assetDetails);
    setSaved(true);
  }

  // User Uploads Image 
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    await Storage.remove(file.name);
    try {
      const result = await Storage.put(file.name, file, {
        contentType: "image/png, image/jpeg",
        level: "protected"
      });
      setImageKey(result.key);
      downloadImage(result.key);
      setSaved(false);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setSaved(false);
  }

  // Download Image from bucket
  const downloadImage = async (key: string) => {
    setSignedURL(await Storage.get(key, { level: "protected" }));
  }

  const downloadSigImage = async (key: string) => {
    setSigneSigURL(await Storage.get(key, { level: "protected" }));
  }

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
            for (let i = 0; i < parsedTemplate.length; i++) {
              let found = assetTypeData.find((item: any) => item.name === parsedTemplate[i].name);
              if (found && found?.value) {
                merged.push({
                  ...parsedTemplate[i],
                  ...found
                });
              } else {
                merged.push({ ...parsedTemplate[i], value: '' });
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
        if (!asset) {
          throw new Error('Asset ID not found');
        }
        // wait for all data, then populate type form
        Promise.all([
          setName(asset.assetName),
          setDescription(asset.description),
          setQRCode(asset.QRCode),
          fetchType(asset.typeID),
          fetchStatus(asset.statusID),
          fetchLocation(asset.assetlocaID),
          setLocation(asset.assetlocaID),
          setGroup(asset.groupID),
          //setCurrentLoanEvent(asset.currentEvent),
          
          //fetchGroup(asset.groupID),
          setAssetTypeData(JSON.parse(asset.assetTypeData)),
          fetchCurrentEventInfo(asset.currentEvent),
          //console.log(asset)
        ]).then(() =>
          setLoaded(true)
        );
        if (asset.imageLink) {
          setImageKey(asset.imageLink);
          downloadImage(asset.imageLink);
          
        }
      } catch (e: any) {
        setLoaded(true);
        setError(e.message);
      }
      return;
    }
    
    //collects info of the most recent loan/return event
    const fetchCurrentEventInfo = async (currentEvent: string): Promise<void> => {
      if(currentEvent){
        try{
        const onLoanInfo: any = await API.graphql({
          query: getAssetLog,
          variables: {id: currentEvent},
          authMode: 'AWS_IAM' 
        })

        let loanEventInfo = onLoanInfo.data.getAssetLog;
        setCurrentLoanEventInfo(onLoanInfo.data.getAssetLog)
        setDigSig(loanEventInfo.borrowerSignature);
        if (loanEventInfo.borrowerSignature) {
          setImageKey(loanEventInfo.borrowerSignature);
          downloadSigImage(loanEventInfo.borrowerSignature);
        }
        //setCurrentLoanEventInfo({name: onLoanInfo.data.getAssetLog.assetID, id: onLoanInfo.data.getAssetLog.assetID.id, username: onLoanInfo.data.getAssetLog.borrowerUsername, dateOfBorrow: onLoanInfo.data.getAssetLog.borrowDate, dateOfReturn: onLoanInfo.data.getAssetLog.returnDate });
        setItemLoanedDate(loanEventInfo.borrowDate);
        setItemReturnedDate(loanEventInfo.returnDate);
        setLoanUser(loanEventInfo.borrowerUsername);
        setAssetLogString(loanEventInfo.assetLogData);
        const myArray = loanEventInfo.assetLogData.split(",")
        setAssetLogData1(myArray);
        }catch(e){
          console.log(e);
        }
        return;
      }
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

    const fetchGroup = async (groupID: string): Promise<void> => {
      if (groupID) {
        try {
          const groupResult: any = await API.graphql({
            query: getSimpleAssetGroup,
            variables: { id: groupID },
            authMode: 'AWS_IAM'
          });
          setGroup(groupResult.data.getSimpleAssetGroup);
          //console.log(groupResult);
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
          //setLocation(locationResult.data.getAssetLocation);
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

  useEffect(() => {
    // collect loan log information
    const createLoanLogEvent = async () => {
      try {
        const result: any = await API.graphql({
          query: listAssetLogs,
          variables: { limit: 1 },
          authMode: 'AWS_IAM'
        });
        
        // if(currentLoanEvent.length > 1){
        //   const onLoanInfo: any = await API.graphql({
        //     query: getAssetLog,
        //     variables: {id: currentLoanEvent},
        //     authMode: 'AWS_IAM'
        //   })
        //   setCurrentLoanEventInfo(onLoanInfo);
        //   console.log(onLoanInfo);
        // }
        setLoanLog(result.data.listAssetLogs.items);
        
        //setLoanLog(result.data.getAssetLog.items);
      } catch (e) {
        console.log(e);
      }
      return;
    }
    createLoanLogEvent();
  }, []);
  const handleTypeChange = (index: number, e: any) => {
    let data = [...typeFields];
    data[index].value = e.target.value;
    setTypeFields(data);
    setSaved(false);
  }

  // Modal Logic
  const handleLogChange = (index: number, e: any) => {
    let data = [...logFields];
    data[index].value = e.target.value;
    setLogFields(data);
  }

  const [present, dismiss] = useIonModal(LoanModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
    setBorrower: setBorrower,
    logFields: logFields,
    handleLogChange: handleLogChange,
    setDataURL: setDataUrl,
    assetID: match.params.id,
  });

  

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          setModalSaved(false);
          presentActionToast('bottom', "Item Loaned");
        }
      },
    });
  }
  function changeInDescription(e: any) {
    setSaved(false);
    setDescription(e.target.value)
  }

  function changeInQRCode(e: any) {
    setSaved(false);
    setQRCode(e.target.value)
  }

  function changeInName(e: any) {
    setSaved(false);
    setName(e.target.value)
  }

  function changeInLocation(e: any) {
    setSaved(false);
    setLocation(e.target.value);
  }
  function refreshPage() {
    window.location.reload();
  }

  let changes = false;
  return (
    <IonPage>
      <Header title={"Edit Asset"} user={user} />
      <IonContent>
        {
          (loaded) ? (
            (error === '') ? (
              <>
                <div className="m-4 mb-0">
                  <BackButton text="back" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="h-full bg-white p-4 m-4 rounded-lg shadow col-span-2" key={1}>
                    <form onSubmit={handleMainSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className=" col-span-2">
                          <input className="text-3xl font-montserrat font-bold text-primary-200 text-blue bg-white" onChange={(e) => changeInName(e)} placeholder={name} defaultValue={name}></input>
                        </div>
                        <div className="col-span-1">
                          {(status.name === "Available") ? (<h1 className="text-3xl font-montserrat font-bold text-green-600 bg-white md:text-right">{status.name}</h1>)
                            : (status.name === 'On Loan') ?
                              (<h1 className="text-3xl font-montserrat font-bold text-red bg-white md:text-right">{status.name}</h1>)
                              : (status.name === "Archived") ? <h1 className="text-3xl font-montserrat font-bold text-orange bg-white md:text-right">{status.name}</h1>
                                : <h1 className="text-3xl font-montserrat font-bold text-primary-200 text-blue bg-white md:text-right">{status.name}</h1>}
                        </div>

                      </div>
                      <h1 className='text-xl font-san-serif bg-white rounded'><input className="bg-white w-full" onChange={(e) => changeInQRCode(e)} placeholder="QFES QR CODE ID" defaultValue={QRCode}></input></h1>
                      {signedURL ? (<img className="photo" width="300px" height="300px" src={signedURL} />) : (<></>)}
                      <h1 className='text-xl font-montserrat bg-white rounded pt-4'><input className="text-black bg-white w-full" defaultValue={description} onChange={(e) => changeInDescription(e)} placeholder="Asset Description"></input></h1>
                      <h1 className='text-xl font-montserrat bg-white rounded pt-4'><Selector label="Asset Type: " queryType={listAssetTypes} handleChange={setType} nameKey="typeName" defaultValue={type?.id && type.id} /></h1>
                      {
                        typeFields.map((field, index) => {
                          let fieldJsx;
                          if (field.type === 'text') {
                            fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="text" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                          } else if (field.type === 'number') {
                            fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="number" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                          } else if (field.type === 'date') {
                            fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="date" value={field.value} onChange={e => handleTypeChange(index, e)}></input>
                          } else if (field.type === 'boolean') {
                            fieldJsx = <IonCheckbox className="bg-neutral-400 text-white w-full rounded" value={field.value} onChange={e => handleTypeChange(index, e)}></IonCheckbox>
                          }
                          return (
                            <div className="bg-stone rounded-lg shadow md:w-1/2 lg:w-80 m-2" key={index}>
                              <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>{field.name}: </label></h1>
                              <h2 className='font-montserrat rounded p-1 pl-2 pb-2 pr-2 content-end'>{fieldJsx}</h2>
                            </div>
                          )
                        }, [])
                      }
                      <h1 className="text-xl font-montserrat">Asset Data: </h1>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="bg-stone rounded-lg shadow w-full pr-4 mb-2" key={1}>
                          <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Asset Location: </label></h1>
                          <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat' value={assetLocation} onChange={(e) => changeInLocation(e)} placeholder="Asset Location" ></input>
                        </div>
                        <div className="flex m-0 bg-stone rounded-lg pt-2 pb-2 lg:h-3/4 shadow w-full lg:w-80 p-2 m-2 text-white pl-2 pt-2 font-bold font-montserrat">
                          <h1 className="pt-2">Asset Group:</h1>
                          <div className="top-0 right-0">
                            {group === null && <IonButton className="ml-20" routerLink={`/Groups/new`} color="secondary">No Group</IonButton>}
                            {group != null && <IonButton className="ml-20" routerLink={`/group/${group}`} color="secondary">In Group</IonButton>}
                          </div>
                        </div>


                      </div>
                      <div className="mt-2">
                        {/* @TODO Add handling of changing this button to change image if image exists*/}
                        <h1 className="text-xl font-montserrat">Select an Image:</h1>
                        <label htmlFor="imageInput"></label>
                        <input className="ml-2 font-montserrat bg-zinc-800 text-white font-bold p-2 rounded-lg" type="file" accept='image/jpeg, image/png' onChange={uploadImage}></input>
                      </div>
                      <br></br>
                      <br></br>
                      {saved === false && <IonButton type='submit'>Save Changes</IonButton>}
                      {saved === false && <IonButton color="danger" onClick={refreshPage}>Discard Changes</IonButton>}
                    </form>
                  </div>
                  <div className="bg-white p-4 m-4 rounded-lg shadow" key={2}>
                    <h1 className='text-3xl bg-white text-blue font-montserrat font-bold text-primary-200 text-blue'>Most Recent Loan Event</h1>
                    <div className="text-black font-montserrat bg-white ml-2 lg:text-xl md:text-l sm:text-l">
                      {currentLoanEvent != null && itemLoanedDate !== null &&<h1 className="font-bold">ITEM LOANED</h1>}
                      {currentLoanEvent != null && itemLoanedDate === null &&<h1 className="font-bold">ITEM RETURNED</h1>}
                      {currentLoanEvent != null && itemLoanedDate !== null &&<h1>Item on loan by: <strong>{loanUser}</strong></h1>}
                      {
                      loanLog.map((log, index) => {
                          if (itemLoanedDate !== null && itemReturnedDate === null) {
                            //Most recent event is a Loan
                            var myDate = new Date(itemLoanedDate);
                            return (
                              <div>
                                {/* <h1 className="font-montserrat lg:text-xl md:text-l sm:text-l">"Loaned: " + myDate.toLocaleDateString()}</h1> */}
                                <h1 className="font-montserrat lg:text-xl md:text-l sm:text-l">Loaned: <strong>{myDate.toLocaleDateString()}</strong></h1>
                            </div>
                            )
                          }
                          else if(itemLoanedDate !== null && itemReturnedDate !== null){
                            //Most recent Event is a loan and they gave a return Date
                            var loanDate = new Date(itemLoanedDate);
                            var returnDate = new Date(itemReturnedDate);
                            return (
                              <div>
                            <h1 className="font-montserrat lg:text-xl md:text-l sm:text-l ml-4">{("Loaned: " + loanDate.toLocaleDateString())}</h1>
                            <h1 className="font-montserrat lg:text-xl md:text-l sm:text-l ml-4">{("Proposed Return: " + returnDate.toLocaleDateString())}</h1>
                            </div>
                            )
                          }
                          else{
                            //Most recent event is a Return
                            var myDate = new Date(itemReturnedDate);
                            return <ul className="font-montserrat lg:text-xl md:text-l sm:text-l ml-4">{("Returned: " + myDate.toLocaleDateString())}</ul>
                          }
                        }
                      )   
                    }
                      {itemLoanedDate !== null &&<div className="bg-stone rounded-lg shadow m-2 pb-2">
                        {itemLoanedDate !== null &&<h1 className="text-white font-bold p-2">LOAN INPUTS</h1>}
                      {
                        assetLogData1.map((data, count) => {
                          let inputName;
                          let inputUser;
                          let digitalSignature;
                          if(data.includes("name")){
                            const myArray = data.split("\"")
                            inputName = myArray[3]
                          }
                          else if(data.includes("type")){
                            if(data.includes("signature")){
                              digitalSignature = true;

                            }
                          }
                          else if(data.includes("value")){
                            const myArray = data.split("\"")
                            inputUser = myArray[3]
                          }
                          return (
                            <div className="bg-stone rounded-lg shadow pl-2 m-2 mb-0 mt-0 font-montserrat" key={count}>
                            <h1 className="text-white font-bold">{inputName}</h1>
                            <h1 className="text-white">{inputUser}</h1>
                            {digitalSignature ? (<img className="bg-white photo" width="300px" height="300px" src={signedSigURL} />) : (<></>)}
                            </div>
                          )
                        }, [])
                      }
                      </div>}
  
                      
                    </div>
                  </div>
                </div>

                <div className="columns-1 w-2/3">
                  <div className="bg-white p-2 mt-8 m-4 rounded-lg shadow">
                    
                    {/*Display the button for Loan/Return */}
                    {saved === false && <h1 className="text-xl font-montserrat font-bold">Changes must be saved before item can be loaned</h1>}
                    {saved != false && status.name === "Available" && <IonButton onClick={() => openModal()}>Loan</IonButton>}
                    {status.name === "On Loan" && <IonButton onClick={handleReturnSubmit}>Return</IonButton>}

                    {/*Display the button for Archive/Restore */}
                    {(saved === false) ? (null) : (status.name === 'Available' || status.name === 'On Loan') ?
                      (<IonButton color="secondary" onClick={handleArchiveSubmit}>Archive Asset</IonButton>)
                      : (<IonButton color="secondary" onClick={handleRestoreSubmit}>Restore Asset</IonButton>)}
                    {/*Display the button for Delete */}
                    {saved !== false &&<IonButton color="danger" onClick={() => {
                      presentToast({
                        message: 'Are you sure you want to delete this asset?',
                        duration: 10000,
                        buttons: [
                          {
                            text: 'Yes',
                            role: 'confirm',
                            handler: () => removeAsset()
                          },
                          {
                            text: 'No',
                            role: 'cancel'
                          }
                        ]
                      })
                    }}>Delete Asset</IonButton>}
                    


                  </div>
                </div>
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