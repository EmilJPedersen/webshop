// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyALQGpzDHH9bLk2twr2Fj2CQ_Kj5mdlbBY",
    authDomain: "webshopdb.firebaseapp.com",
    databaseURL: "https://webshopdb.firebaseio.com",
    projectId: "webshopdb",
    storageBucket: "webshopdb.appspot.com",
    messagingSenderId: "316798528554",
    //appId: "1:316798528554:web:710ddcd98c393ca7"
  },
  social: {
    fblink: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
