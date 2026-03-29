import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faHome, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faHome, faUser);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
  ],
  {
    basename: "/book-finder-website",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
