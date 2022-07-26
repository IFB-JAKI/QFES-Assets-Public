import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';

/*
  * BarcodeScanner is a plugin for Capacitor used here to scan QR Codes
  * Note that this page is mobile only, browser should never redirect here as it is not supported 
*/
const QrScan = () => {

  const router = useIonRouter();

  const startScan = async () => {
    
    const result = await BarcodeScanner.scan();
    if (result.text) {
      router.push('/asset/' + result.text);
    }
  };

  return (
    <IonPage>
      <IonButton onClick={startScan}>Scan</IonButton>
    </IonPage>
  );
};

export default QrScan;
