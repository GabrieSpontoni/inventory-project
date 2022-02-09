import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";

if (`serviceWorker` in navigator && process.env.NODE_ENV === `production`) {
  window.addEventListener(`load`, function () {
    navigator.serviceWorker.register(`serviceWorker.js`).then(
      function (registration) {
        // Registration was successful
        console.log(
          `ServiceWorker registration successful with scope: `,
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log(`ServiceWorker registration failed: `, err);
      }
    );
  });
}

ReactDOM.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
