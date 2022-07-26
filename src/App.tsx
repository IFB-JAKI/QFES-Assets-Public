import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Authenticator } from '@aws-amplify/ui-react';
import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { isPlatform } from '@ionic/react';
import awsconfig from './aws-exports';

import Home from './pages/Home';
import QrScan from './pages/mobile/QrScan';
import Asset from './pages/Asset';

import '@aws-amplify/ui-react/styles.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

Amplify.configure(awsconfig);

setupIonicReact();

const App = () => (
  <Authenticator>
    {({ signOut, user}) => (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              {
                isPlatform('capacitor') ? (
                  <QrScan />
                ) : (
                  <Home signOut={signOut} user={user} />
                )
              }
            </Route>
            <Redirect exact from="/home" to="/" />
            <Route exact path="/asset/:id" component={Asset} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    )}
  </Authenticator>
);

export default App;
