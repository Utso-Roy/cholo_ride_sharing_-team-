import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home";
import RootLayout from "../Layout/RootLayout";
import AboutUs from "../pages/OthersPage/AboutUs";
import OurStory from "../pages/OthersPage/OurStory";
import Career from "../pages/CareerPage/Career";


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
        path:"/aboutUs",
        element:<AboutUs/>
      },
      {
        path:"/our-story",
        element:<OurStory/>
      },

    ],
  },
]);

export default router;
