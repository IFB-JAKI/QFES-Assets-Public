import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonCheckbox } from "@ionic/react";
import { useRef } from "react";
import SignatureCanvas from 'react-signature-canvas'
import { ButtonGroup } from '@aws-amplify/ui-react';
import React from "react";
import { Storage } from "aws-amplify";

const LoanModal = ({
  onDismiss, logFields, handleLogChange, setBorrower, setDataURL, assetID
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void; logFields: Array<any>, handleLogChange: any, setBorrower: any, setDataURL: any, assetID: any
}) => {

  //sigPad
  let padRef = React.useRef<SignatureCanvas>(null);

  const clear = () => {
    padRef.current?.clear();
  };
  const inputRef = useRef<HTMLIonInputElement>(null);

  function dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

  const uploadImage = async (file: any) => {
    const fileName = `signature-${Date.now()}-${assetID}`;
    file = dataURLtoFile(file, fileName)
    try {
      const response = await Storage.put(fileName, file, {
        contentType: 'image/png',
        level: "protected",
      })
      setDataURL(response.key);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const trim = () => {
    const file = padRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (file) {
      uploadImage(file);
    }
    
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Loan Asset</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Borrower</IonLabel>
          <IonInput onIonChange={(e: any) => setBorrower(e.target.value)} type="text" placeholder="Borrower Name" />
        </IonItem>
        {
          (logFields && logFields.length > 0) && (
            logFields.map((field, index) => {
              let fieldJsx;
              if (field.type === 'signature') {
                return (
                  <IonItem>
                    <IonLabel position="stacked">Digital Signature</IonLabel>
                    <SignatureCanvas ref={padRef} penColor='black'
                      canvasProps={{ width: 550, height: 200, className: 'sigCanvas' }} />
                    <ButtonGroup>
                      <IonButton color='light' onClick={clear}>Clear</IonButton>
                      <IonButton color='light' onClick={trim}>Finish</IonButton>
                    </ButtonGroup>

                  </IonItem>
                )
              }
              if (field.type === 'text') {
                fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="text" value={field.value} onChange={e => handleLogChange(index, e)}></input>
              } else if (field.type === 'number') {
                fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="number" value={field.value} onChange={e => handleLogChange(index, e)}></input>
              } else if (field.type === 'date') {
                fieldJsx = <input className="bg-neutral-400 text-white pl-2 w-full rounded" type="date" value={field.value} onChange={e => handleLogChange(index, e)}></input>
              } else if (field.type === 'boolean') {
                fieldJsx = <IonCheckbox className="bg-neutral-400 text-white pl-2" value={field.value} onChange={e => handleLogChange(index, e)}></IonCheckbox>
              }
              return (
                <div className="bg-stone rounded-lg shadow md:w-1/2 lg:w-80 m-2" key={index}>
                  <h1 className='text-white pl-2 pt-1 text-l font-bold font-montserrat'><label>{field.name}: </label></h1>
                  <h2 className='font-montserrat text-white rounded p-1 pl-2 pb-2 pr-2 content-end'>{fieldJsx}</h2>
                </div>
              )
            }, [])
          )
        }
        <IonButton onClick={() => onDismiss(inputRef.current?.value, 'confirm')}>Confirm</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoanModal;