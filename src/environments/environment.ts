// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCXE6yKLfTk1NbF8bymWl50ZsWUFQyN8VY",
    authDomain: "owstatstracker.firebaseapp.com",
    databaseURL: "https://owstatstracker.firebaseio.com",
    projectId: "owstatstracker",
    storageBucket: "",
    messagingSenderId: "663286351341"
  }
};
