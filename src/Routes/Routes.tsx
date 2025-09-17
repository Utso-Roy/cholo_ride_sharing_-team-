import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home";
import RootLayout from "../Layout/RootLayout";
import BikeEarnings from "../pages/BikeEarnings";
import CarEarnings from "../pages/CarEarnings";
import CngEarnings from "../pages/CngEarnings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        path: "/",
      },
      {
        path: "/earn/bike",
        Component: BikeEarnings
      },
      {
        path: "/earn/car",
        Component: CarEarnings
      },
      {
        path: "/earn/cng",
        Component: CngEarnings
      }
    ],
  },
]);

export default router;
