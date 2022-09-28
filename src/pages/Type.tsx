import React, { useState, useEffect, useRef } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox, useIonLoading, IonLoading, IonButtons, IonInput, IonItem, IonLabel, IonModal, useIonAlert, useIonModal } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset, getAssetGroup, getAssetStatus, getAssetLocation, getAssetType } from '../graphql/queries';
import { listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { updateAssetStatus, updateAsset, createAssetLog, updateAssetType } from '../graphql/mutations';
import BackButton from '../components/BackButton';
import TypeFieldCreator from '../components/TypeFieldCreator';
import Selector from '../components/Selector';
import { AssetType } from '../models';
import { resultingClientExists } from 'workbox-core/_private';
import { OverlayEventDetail } from '@ionic/core/components';
import { parse } from 'path';
import { Router } from '@aws-amplify/ui-react/dist/types/components/Authenticator/Router';
import LoanModal from '../components/LoanModal';
import { FieldInputs } from '../types/FieldInputs';

interface AssetProps
    extends RouteComponentProps<{
        id: string;
    }> { }

interface Status {
    id: string;
    statusName: string;
}

interface Type {
    id: string;
    typeName: string;
}

interface FieldsInterface {
    name: string,
    type: string,
    value?: string
}

interface TypeFieldCreatorProps {
    fields: FieldInputs[];
    setFields: any;
}

const Type: React.FC<AssetProps> = ({ match }) => {
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

    // array of all possible types
    const [allTypes, setAllTypes] = useState(Array<Type>());

    // utility vars
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(true); // @TODO set false and show user that changes are not saved.

    // modal logic
    const BorrowerInput = useRef<HTMLIonInputElement>(null);

    // array of asset fields for type
    const [assetTypeFields, setAssetTypeFields] = React.useState(Array<FieldInputs>());
    const [assetTypeLogFields, setAssetTypeLogFields] = React.useState(Array<FieldInputs>());

    const router = useIonRouter();

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

    // updates the asset type and page state with the new type if it is a valid status
    const updateTypeCall = async (typeDetails: any, callback?: Function): Promise<void> => {
        if (type?.id) {
            try {
                const result: any = await API.graphql({
                    query: updateAssetType,
                    variables: { input: typeDetails },
                    authMode: 'AWS_IAM'
                });
                if (callback) {
                    callback(result.data.updateAsset);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('Error updating type');
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
                    variables: {
                        input: {
                            assetID: match.params.id,
                            assetLogData: assetLogDataString,
                            borrowerUsername: BorrowerUserName,
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
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        }
        createReturnEvent();
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

    const handleTypeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let typeDetails = {
            id: type.id,
            typeName: type.name
        };

        updateTypeCall(typeDetails);
    }

    // const removeField = (index: number) => {
    //     let newFields = [...fields];
    //     newFields.splice(index, 1);
    //     setFields(newFields);
    // }

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
                console.log(asset)
                if (!asset) {
                    throw new Error('Asset ID not found');
                }
                // wait for all data, then populate type form
                Promise.all([
                    setName(asset.assetName),
                    setDescription(asset.description),
                    fetchType(asset.typeID),
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

        const fetchType = async (typeId: string): Promise<void> => {
            if (typeId) {
                try {
                    const typeResult: any = await API.graphql({
                        query: getAssetType,
                        variables: { id: typeId },
                        authMode: 'AWS_IAM'
                    });
                    if (!typeResult) {
                        throw new Error('Type not found');
                    }
                    setType(typeResult.data.getAssetType);
                    setLoaded(true)
                } catch (e) {
                    console.log(e);
                }
                return;
            }
        }

        //Change this
        fetchType("9f72c051-203b-4712-a2c3-fccd64ec8550");
        //fetchType(match.params.id)
    }, [match.params.id]);


    const handleTypeChange = (index: number, e: any) => {
        let data = [...typeFields];
        data[index].value = e.target.value;
        setTypeFields(data);
    }



    return (
        <IonPage>
            <IonContent>
                {
                    (loaded) ? (
                        (error === '') ? (
                            <>
                                <form onSubmit={(e) => handleMainSubmit(e)} className="m-6">
                                    <h1>This is the id: {type?.id && type.id}</h1>
                                    <label className="mr-3">Type Name:</label>
                                    <IonLabel>{type?.name && type.name}</IonLabel>
                                    <br></br>
                                    <label className="mr-3">Asset Fields:</label>
                                    <br></br>
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
                                                    <label>{field.name}: {field.type}</label>
                                                    {/* <IonButton onClick={() => { removeField(index) }}>Delete</IonButton> */}
                                                </div>
                                            )
                                        }, [])
                                    }
                                    <br></br>
                                    <TypeFieldCreator fields={assetTypeFields} setFields={setAssetTypeFields} />
                                    <br></br>
                                    <label className="mr-3 mt-6">Asset Log Fields:</label>
                                    <br></br>
                                    <TypeFieldCreator fields={assetTypeLogFields} setFields={setAssetTypeLogFields} />
                                    <br></br>
                                    <IonButton type='submit'>Submit</IonButton>
                                </form>
                                <BackButton />
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

export default Type