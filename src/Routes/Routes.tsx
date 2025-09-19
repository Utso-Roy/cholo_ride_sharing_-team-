import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home";
import RootLayout from "../Layout/RootLayout";

import AboutUs from "../pages/OthersPage/AboutUs";
import OurStory from "../pages/OthersPage/OurStory";

import BikeEarnings from "../pages/BikeEarnings";
import CarEarnings from "../pages/CarEarnings";
import CngEarnings from "../pages/CngEarnings";

import BikeLayout from "../Layout/BikeLayout";
import BikeStepOne from "../pages/BikeStepOne";
import BikeStepTwo from "../pages/BikeStepTwo";




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

      // Bike Subtree
      {
        path:"/aboutUs",
        element:<AboutUs/>
      },
      {
        path:"/our-story",
        element:<OurStory/>
        path: "/earn/bike",
        element: <BikeLayout/>,
        children: [
          {index: true, element: <BikeStepOne/>},
          {path: "details", element: <BikeStepTwo/>}
        ]
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
