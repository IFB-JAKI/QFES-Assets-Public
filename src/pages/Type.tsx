import React, { useState, useEffect, useRef } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox, useIonLoading, IonLoading, IonButtons, IonInput, IonItem, IonLabel, IonModal, useIonAlert, useIonModal, IonToast } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset, getAssetGroup, getAssetStatus, getAssetLocation, getAssetType } from '../graphql/queries';
import { listAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { updateAssetStatus, updateAsset, createAssetLog, updateAssetType, createAssetType } from '../graphql/mutations';
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

const Type: React.FC<AssetProps> = ({ match }) => {
    const [presentAlert] = useIonAlert();
    // user input
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState({ typeName: '', id: undefined, dataTemplate: '', logTemplate: '' });
    const [status, setStatus] = useState({ name: '', id: undefined });
    const [location, setLocation] = useState({ name: '', id: undefined });
    const [group, setGroup] = useState(null);
    const [assetTypeData, setAssetTypeData] = useState(Array<FieldsInterface>());

    // dynamic field states
    const [typeFields, setTypeFields] = React.useState(Array<FieldInputs>());
    const [logFields, setLogFields] = React.useState(Array<FieldInputs>());

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

    const router = useIonRouter();

    // updates the asset type and page state with the new type if it is a valid status
    const handleMainSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const assetFieldsJSON = JSON.stringify(typeFields);
        const assetLogFieldsJSON = JSON.stringify(logFields);

        console.log(type.typeName + "Hello world");

        let typeDetails = {
            id: "9f72c051-203b-4712-a2c3-fccd64ec8550",
            typeName: type.typeName, //change this to type name (i think its using asset name)
            dataTemplate: assetFieldsJSON,
            logTemplate: assetLogFieldsJSON
        }

        // const createType = async (): Promise<void> => {
        //     try {
        //         const result: any = await API.graphql({
        //             query: createAssetType,
        //             variables: { input: typeDetails },
        //             authMode: 'AWS_IAM'
        //         });
        //         // @TODO Success or error toast here
        //         console.log(result);
        //         console.log("test work");
        //         router.goBack();
        //     } catch (e) {
        //         console.log(e);
        //     }
        //     return;
        // };

        // createType();

        const updateType = async (): Promise<void> => {
            try {
                const result: any = await API.graphql({
                    query: updateAssetType,
                    variables: { input: typeDetails },
                    authMode: 'AWS_IAM'
                });
                // @TODO Success or error toast here
                console.log(result);
                console.log("test work");
                router.goBack();
            } catch (e) {
                console.log(e);
            }
            return;
        };

        updateType();
    }

    const removeField = (index: number) => {
        let newFields = [...typeFields];
        newFields.splice(index, 1);
        setTypeFields(newFields);
    }

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
                    setError("Could not parse data template for type " + type.typeName);
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
                    setError("Could not parse log template for type " + type.typeName);
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
                    setType(typeResult.data.getAssetType);
                    console.log(typeResult);
                    setLoaded(true);
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
        data[index].type = e.target.value;
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
                                    <IonLabel>{type?.typeName && type.typeName}</IonLabel>
                                    <br></br>
                                    <label className="mr-3">Asset Fields:</label>
                                    <br></br>
                                    <TypeFieldCreator fields={typeFields} setFields={setTypeFields} />
                                    <br></br>
                                    <label className="mr-3 mt-6">Asset Log Fields:</label>
                                    <br></br>
                                    <TypeFieldCreator fields={logFields} setFields={setLogFields} />
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