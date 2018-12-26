/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDc2V8PQrz87pCxAZn3OEu9zDh_Abjyda4',
    authDomain: 'dcm-app-eebac.firebaseapp.com',
    databaseURL: 'https://dcm-app-eebac.firebaseio.com',
    projectId: 'dcm-app-eebac',
    storageBucket: 'dcm-app-eebac.appspot.com',
    messagingSenderId: '60357462997',
  },
};
