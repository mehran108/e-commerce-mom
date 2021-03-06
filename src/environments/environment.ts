// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const url = `https://localhost:44326/api`;
export const environment = {
  production: false,
  AppCategory: `${url}/Category`,
  AppBrand: `${url}/Brand`,
  AppBanner: `${url}/Banner`,
  AppProduct: `${url}/Product`,
  AppOrder: `${url}/Order`,
  AppUser: `${url}/User`,
  AppSlider: `${url}/Slider`,
  AppDocument: `${url}/Document`,
  firebaseConfig: {
    apiKey: 'AIzaSyB9JuijGrW7ikudwKDo2VhGRxVwtkWiUUs',
    authDomain: 'angular-systems.firebaseapp.com',
    databaseURL: 'https://angular-systems.firebaseio.com',
    projectId: 'angular-systems',
    storageBucket: 'angular-systems.appspot.com',
    messagingSenderId: '1068394335973',
    appId: '1:1068394335973:web:aa483225eebcec840d8e0c'
  },
};
