import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonMenu, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Authenticator, useTheme, View, Image, Heading } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { isPlatform } from '@ionic/react';
import awsconfig from './aws-exports';

import Home from './pages/Home';
import QrScan from './pages/mobile/QrScan';
import Asset from './pages/Asset';
import NewAsset from './pages/NewAsset';
import Reports from './pages/Reports';
import Search from './pages/Search';
import Type from './pages/Type';
import TypeSearch from './pages/TypeSearch'

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
import NewType from './pages/NewType';

/* Top level css imports */
import './theme/index.css';
import NewStatus from './pages/NewStatus';
import NewLocation from './pages/NewLocation';
import SideBar from './components/SideBar/SideBar';

import qfesLarge from './assets/img/qfes-large-no-background.png';
import Groups from './pages/Groups';
import NewGroup from './pages/NewGroup';
import EditGroup from './pages/EditGroup';

Amplify.configure(awsconfig);

setupIonicReact();

const components = {
  Header() {
    const { tokens } = useTheme();
    let iconSize;
    isPlatform('capacitor') ? (iconSize = "50%") : (iconSize = "100%");
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <div className='max-w-[200px] mx-auto'>
          <Image
            alt="QFES Logo"
            src={qfesLarge}
            maxWidth={iconSize}
            height='auto'
          />
        </div>
      </View>
    );
  },
  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 0`} margin={`0 ${tokens.space.medium} 0 ${tokens.space.medium}`} level={3} textAlign="center">
          Asset Management Portal
        </Heading>
      );
    },
  },
}


const App = () => (

  <Authenticator hideSignUp={true} components={components}>
    {({ signOut, user }) => (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <IonMenu menuId='primary' contentId='main'>
              <SideBar signOut={signOut} />
            </IonMenu>
            <IonRouterOutlet id="main">
              <Route exact path="/Home">
                {
                  isPlatform('capacitor') ? (
                    <QrScan />
                  ) : (
                    <Home user={user} />
                  )
                }
              </Route>
              <Redirect exact from="/" to="/Home" />
              <Route exact path="/asset/:id" component={Asset} />
              <Route exact path="/NewAsset" component={NewAsset} />
              <Route exact path="/NewType" component={NewType} />
              <Route exact path="/Search" render={() => <Search user={user} />} />
              <Route exact path="/Groups" render={() => <Groups user={user} />} />
              <Route exact path="/groups/new" render={() => <NewGroup user={user} />} />
              <Route exact path="/group/:id" component={EditGroup} />
              <Route exact path="/NewStatus" component={NewStatus} />
              <Route exact path="/NewLocation" component={NewLocation} />
              <Route exact path="/Type/:id" component={Type} />
              <Route exact path="/Types" render={() => <TypeSearch user={user} />} />
              <Route exact path="/Reports" render={() => <Reports user={user} />} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    )}
  </Authenticator>
);

export default App;
