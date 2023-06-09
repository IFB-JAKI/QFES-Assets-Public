import React, { useState, useEffect, useRef } from 'react'
import { IonContent, IonPage, IonButton, useIonRouter, IonLoading, IonItem, IonLabel, useIonAlert, useIonToast } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAssetType } from '../graphql/queries';
import { updateAssetType } from '../graphql/mutations';
import { deleteAssetType } from '../graphql/mutations';
import BackButton from '../components/BackButton';
import TypeFieldCreator from '../components/TypeFieldCreator';
import Header from '../components/Header';
import { FieldInputs } from '../types/FieldInputs';


interface AssetProps
  extends RouteComponentProps<{
    id: string;
  }> { }


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
  // user input
  const [type, setType] = useState({ typeName: '', id: undefined, dataTemplate: '', logTemplate: '' });
  const [assetTypeData, setAssetTypeData] = useState(Array<FieldsInterface>());
  const [name, setName] = useState('');

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
  const [toast] = useIonToast();

  const router = useIonRouter();

  // updates the asset type and page state with the new type if it is a valid status
  const handleMainSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const assetFieldsJSON = JSON.stringify(typeFields);
    const assetLogFieldsJSON = JSON.stringify(logFields);
    if (name === "") {
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
    } else {
      let typeDetails = {
        id: match.params.id,
        typeName: name,
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



    const presentToast = () => {
      toast({
        message: 'Type updated successfully',
        duration: 1500,
        position: 'bottom'
      });
    }

    presentToast();
  }

  const deleteType = async (): Promise<void> => {

    try {
      const result: any = await API.graphql({
        query: deleteAssetType,
        variables: {
          input: {
            id: match.params.id
          }
        },
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
  function changeInName(e: any) {
    setSaved(false);
    setName(e.target.value);
  }
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
                <Header pl-8 title={" Types"} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="h-full bg-white p-2 m-4 rounded-lg shadow col-span-2">
                    {/*<h1 className="text-3xl font-montserrat font-bold text-primary-200 text-blue">{type.typeName}</h1>*/}

                    <form onSubmit={(e) => handleMainSubmit(e)} className="m-6">
                      <div className="bg-white p-4 m-4 rounded-lg shadow">
                        <div className="bg-stone rounded-lg shadow lg:w-3/4 pr-4 mb-2 pb-1  " key={1}>
                          <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Type ID: </label></h1>
                          <h1 className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat' >{type?.id && type.id}</h1>
                        </div>
                        <div className="bg-stone rounded-lg shadow lg:w-1/4 pr-4 mb-2" key={1}>
                          <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>Type Name: </label></h1>
                          <input className='bg-neutral-400 text-white m-2 w-full pl-2 rounded font-montserrat' onChange={(e) => changeInName(e)} placeholder={type.typeName} defaultValue={type.typeName} ></input>
                        </div>
                        <h1 className='text-2xl font-montserrat mt-4 font-bold '>Information Fields for Asset Type:</h1>
                        <div className="w-2/2">
                          <TypeFieldCreator fields={typeFields} setFields={setTypeFields} />
                        </div>
                        <h1 className='text-2xl font-montserrat mt-4 font-bold '>Type Specific Information Required On Asset Loan:</h1>
                        <TypeFieldCreator fields={logFields} setFields={setLogFields} />
                        <IonButton className="mt-4" type='submit'>Save</IonButton>
                      </div>
                    </form>
                    <BackButton text="back" />
                    <IonButton color="danger" onClick={() => {
                      toast({
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



                    {/* <IonItem>
                        <IonLabel>Type ID: {type?.id && type.id}</IonLabel>
                      </IonItem> */}
                    {/* <IonItem>
                        <h1 className="mr-3">Type Name:</h1>
                        <input className="bg-white left" onChange={(e) => changeInName(e)} placeholder={type.typeName} defaultValue={type.typeName}></input>

                      </IonItem> */}
                    {/* <IonItem>
                        <IonLabel className="mr-3"><h2>Asset Information:</h2></IonLabel>
                      </IonItem> */}
                    {/* <TypeFieldCreator fields={typeFields} setFields={setTypeFields} />
                      <IonItem>
                        <IonLabel className="mr-3">Information Required on Loan:</IonLabel>
                      </IonItem>
                      <br></br>
                      <TypeFieldCreator fields={logFields} setFields={setLogFields} />
                      <br></br>
                      <IonButton type='submit'>Submit</IonButton> */}
                    {/* </form> */}
                    {/* <BackButton />
                    <IonButton color="danger" onClick={() => {
                      toast({
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
                    }}>Delete</IonButton> */}
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