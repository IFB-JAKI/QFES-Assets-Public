import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { useHistory } from 'react-router-dom';

/*
  * BarcodeScanner is a plugin for Capacitor used here to scan QR Codes
  * Note that this page is mobile only, browser should never redirect here as it is not supported 
*/
const QrScan = () => {

  const [data, setData] = useState<string>();

  const startScan = async () => {
    BarcodeScanner.hideBackground(); 
  
    const result = await BarcodeScanner.startScan();
  
    if (result.hasContent) {
      
      setData(result.content);
    }
  };

  return (
    <IonPage>
      <IonButton onClick={startScan}>Scan Asset</IonButton>
    </IonPage>
  );
};

export default QrScan;
