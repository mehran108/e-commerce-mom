// const url = `https://localhost:44326/api`;
const url = `http://bakenbytes-001-site2.gtempurl.com/api`;
const tokenurl = `http://bakenbytes-001-site3.gtempurl.com/api`;
export const environment = {
  production: true,
  AppCategory: `${url}/Category`,
  AppBrand: `${url}/Brand`,
  AppBanner: `${url}/Banner`,
  AppProduct: `${url}/Product`,
  AppOrder: `${url}/Order`,
  AppUser: `${url}/User`,
  AppSlider: `${url}/Slider`,
  AppDocument: `${url}/Document`,
  AppValue: `${url}/Values`,
  AppLogin: `${tokenurl}/token`,
  firebaseConfig: {
    // apiKey: 'AIzaSyAw_2dKlgu1aZK1PrBeC0124L870zmK_xs',
    // authDomain: 'thedairybutchers.firebaseapp.com',
    // databaseURL: 'https://thedairybutchers.firebaseio.com',
    // projectId: 'thedairybutchers',
    // storageBucket: 'thedairybutchers.appspot.com',
    // messagingSenderId: '191517644881',
    // appId: '1:191517644881:web:19ad75e73aebfc77928070',
    // measurementId: 'G-5W7ET4GWJ0'

    apiKey: 'AIzaSyB9JuijGrW7ikudwKDo2VhGRxVwtkWiUUs',
    authDomain: 'angular-systems.firebaseapp.com',
    databaseURL: 'https://angular-systems.firebaseio.com',
    projectId: 'angular-systems',
    storageBucket: 'angular-systems.appspot.com',
    messagingSenderId: '1068394335973',
    appId: '1:1068394335973:web:aa483225eebcec840d8e0c'
  },
};
