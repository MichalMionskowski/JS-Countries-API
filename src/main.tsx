import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CountriesScreen from "./App.tsx";
import { CountryDetailsPage } from "./components/CountryDetailsPage.tsx";
import { ErrorScreen } from "./components/ErrorScreen.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CountriesScreen />,
    errorElement: <ErrorScreen />,
    children: [{ path: "/country/:name", element: <CountryDetailsPage /> }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
