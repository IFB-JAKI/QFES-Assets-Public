import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonCheckbox } from "@ionic/react";
import { useRef } from "react";
import SignatureCanvas from 'react-signature-canvas'
import { ButtonGroup } from '@aws-amplify/ui-react';
import React from "react";
const LoanModal = ({
  onDismiss, logFields, handleLogChange
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void; logFields: Array<any>, handleLogChange: any
}) => {
  const BorrowerInputRef = useRef<HTMLIonInputElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);

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
          <IonInput ref={BorrowerInputRef} type="text" placeholder="Borrower Name" />
        </IonItem>
        {
          (logFields && logFields.length > 0) && (
            logFields.map((field, index) => {
              let fieldJsx;
              if(field.type === 'signature') {
                return (
                  <IonItem>
                    <IonLabel position="stacked">Digital Signature</IonLabel>
                    <SignatureCanvas ref={padRef} penColor='black'
                      canvasProps={{width: 550, height: 200, className: 'sigCanvas'}}/>
                    <ButtonGroup>
                      <IonButton color = 'light' onClick={clear}>Clear</IonButton>
                      <IonButton color = 'light' onClick={trim}>Finish</IonButton>
                    </ButtonGroup>

                  </IonItem>
                )
              }
              if (field.type === 'text') {
                fieldJsx = <input type="text" value={field.value} onChange={e => handleLogChange(index, e)}></input>
              } else if (field.type === 'number') {
                fieldJsx = <input type="number" value={field.value} onChange={e => handleLogChange(index, e)}></input>
              } else if (field.type === 'date') {
                fieldJsx = <input type="date" value={field.value} onChange={e => handleLogChange(index, e)}></input>
              } else if (field.type === 'boolean') {
                fieldJsx = <IonCheckbox value={field.value} onChange={e => handleLogChange(index, e)}></IonCheckbox>
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
        <IonButton onClick={() => onDismiss(inputRef.current?.value, 'confirm')}>Confirm</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoanModal;