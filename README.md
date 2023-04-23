# QFES Asset register

This is a stripped version of the QFES asset registration app made for a QUT capstone project. All aws resources would need to be recreated to run this app.

## Development

### Project Structure

This is a multiplatform app developed using AWS Amplify. The project is divided into the following sections:

#### Frontend (Web)

The frontend of the application uses a modified version of react-scripts to serve the app. 
The web app is developed with ionic, amplify and custom react components to deliver a standard Node-based app.

#### Frontend (App)

Mobile applications are built out from the web app using capacitor. 
The mobile app will look similar to the web app, but will have platform specific styling to feel like a native app.

#### Backend (Amplify Framework)

The amplify framework streamlines communication between the frontend and backend of the application.
Not to be confused with the amplify hosting service, which will be where the frontend is hosted.

#### Backend (API)

The backend of this app will be a graphql api hosted by amplify, that will communicate with a dynamodb service configured from amplify.

#### Backend (Auth)

Auth is setup using AWS cognito.