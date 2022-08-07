import { IonButton, useIonRouter } from '@ionic/react';
import React from 'react'

interface BackProps {
  text: string;
  color?: string;
}

const BackButton = ({ text, color = "medium" }:BackProps) => {

  const router = useIonRouter();

  return (
    <IonButton color={color} onClick={(event: React.MouseEvent<HTMLElement>) => { router.goBack(); }}>{text}</IonButton>
  )
}

export default BackButton