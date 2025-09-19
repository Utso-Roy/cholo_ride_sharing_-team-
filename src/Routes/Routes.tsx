import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home";
import RootLayout from "../Layout/RootLayout";
import FAQ from "../Utils/Help/FAQ/FAQ";
import CustomerCare from "../Utils/Help/CustomerCare/CustomerCare";
import UserGuide from "../Utils/Help/UserGuide/UserGuide";
import DriverGuide from "../Utils/Help/DriverGuide/DriverGuide";

import { BlogListPage } from "../pages/Blog_Page/BlogListPage";
import { BlogDetailsPage } from "../pages/Blog_Page/BlogDetailsPage";
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
      {
        path:'/faq',
        Component:FAQ
      },
      {
        path:'/customercare',
        Component:CustomerCare
      },
      {
        path:'/userguide',
        Component:UserGuide
      },
      {
        path:'/driverguide',
        Component:DriverGuide
      },


      // Bike Subtree
      {
         path: "/blogs",
        element: <BlogListPage></BlogListPage>,

      },
      {
        path:"/blogs/:id",
        element: <BlogDetailsPage></BlogDetailsPage>
      },
      {path:"/aboutUs",
        element:<AboutUs/>
      },  
      {
        path:"/our-story",
        element:<OurStory/>
      },
      {  
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
