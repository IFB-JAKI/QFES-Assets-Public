import React, { useState, useEffect, useRef } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonCheckbox, useIonLoading, IonLoading, IonButtons, IonInput, IonItem, IonLabel, IonModal, useIonAlert, useIonModal, IonToast, IonItemDivider, useIonToast } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset, getSimpleAssetGroup, getAssetStatus, getAssetLocation, getAssetType } from '../graphql/queries';
import { listSimpleAssetGroups, listAssetLocations, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { updateAssetStatus, updateAsset, createAssetLog, updateAssetType, createAssetType } from '../graphql/mutations';
import { deleteAssetType } from '../graphql/mutations';
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
    const [type, setType] = useState({ typeName: '', id: undefined, dataTemplate: '', logTemplate: '' });
    const [assetTypeData, setAssetTypeData] = useState(Array<FieldsInterface>());

    // dynamic field states
    const [typeFields, setTypeFields] = React.useState(Array<FieldInputs>());
    const [logFields, setLogFields] = React.useState(Array<FieldInputs>());

    // utility vars
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(true); // @TODO set false and show user that changes are not saved.

    // modal logic
    const BorrowerInput = useRef<HTMLIonInputElement>(null);

    //present toast
    const [presentToast] = useIonToast();

    const router = useIonRouter();

    // updates the asset type and page state with the new type if it is a valid status
    const handleMainSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const assetFieldsJSON = JSON.stringify(typeFields);
        const assetLogFieldsJSON = JSON.stringify(logFields);

        let typeDetails = {
            id: match.params.id,
            typeName: type.typeName,
            dataTemplate: assetFieldsJSON,
            logTemplate: assetLogFieldsJSON
        }

        const updateType = async (): Promise<void> => {
            try {
                const result: any = await API.graphql({
                    query: updateAssetType,
                    variables: { input: typeDetails },
                    authMode: 'AWS_IAM'
                });
                // @TODO Success or error toast here
                console.log(result);
                router.goBack();
            } catch (e) {
                console.log(e);
            }
            return;
        };

        updateType();
    }

    const deleteType = async (): Promise<void> => {
        const assetFieldsJSON = JSON.stringify(typeFields);
        const assetLogFieldsJSON = JSON.stringify(logFields);

        let typeDetails = {
            id: match.params.id,
            // typeName: type.typeName,
            // dataTemplate: assetFieldsJSON,
            // logTemplate: assetLogFieldsJSON
        }

        try {
            const result: any = await API.graphql({
                query: deleteAssetType,
                variables: { input: typeDetails },
                authMode: 'AWS_IAM'
            })
            console.log(result);
            router.goBack();
        } catch (e) {
            console.log(e);
        }
        return;
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
        // fetch type and construct form with existing data
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

        fetchType(match.params.id);
    }, [match.params.id]);


    return (
        <IonPage>
            <IonContent>
                {
                    (loaded) ? (
                        (error === '') ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="h-full bg-white p-2 m-4 rounded-lg shadow col-span-2">
                                        <h1 className="text-3xl font-montserrat font-bold text-primary-200 text-blue">{type.typeName}</h1>

                                        <form onSubmit={(e) => handleMainSubmit(e)} className="m-6">
                                            <IonItem>
                                                <IonLabel>Type ID: {type?.id && type.id}</IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel className="mr-3">Type Name:</IonLabel>
                                                <IonInput value={type.typeName} placeholder={type.typeName} clearInput required></IonInput>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel className="mr-3"><h2>Asset Fields:</h2></IonLabel>
                                            </IonItem>
                                            <TypeFieldCreator fields={typeFields} setFields={setTypeFields} />
                                            <IonItem>
                                                <IonLabel className="mr-3">Asset Log Fields:</IonLabel>
                                            </IonItem>
                                            <br></br>
                                            <TypeFieldCreator fields={logFields} setFields={setLogFields} />
                                            <br></br>
                                            <IonButton type='submit'>Submit</IonButton>
                                        </form>
                                        <BackButton />
                                        <IonButton color="danger" onClick={() => {
                                            presentToast({
                                                message: 'Are you sure you want to delete this Type?',
                                                duration: 10000,
                                                buttons: [
                                                    {
                                                        text: 'Yes',
                                                        role: 'confirm',
                                                        handler: () => deleteType()
                                                    },
                                                    {
                                                        text: 'No',
                                                        role: 'cancel'
                                                    }
                                                ]
                                            })
                                        }}>Delete</IonButton>
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

export default Type