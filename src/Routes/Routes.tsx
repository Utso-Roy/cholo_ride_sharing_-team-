import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home/Home";
import RootLayout from "../Layout/RootLayout";
import AboutUs from "../pages/OthersPage/AboutUs";
import OurStory from "../pages/OthersPage/OurStory";
import Career from "../pages/CareerPage/Career";

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
import SignUp from "../Access/SignUp";
import Login from "../Access/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },

      { path: "/faq", element: <FAQ /> },
      { path: "/customercare", element: <CustomerCare /> },
      { path: "/userguide", element: <UserGuide /> },
      { path: "/driverguide", element: <DriverGuide /> },

      { path: "/blogs", element: <BlogListPage /> },
      { path: "/blogs/:id", element: <BlogDetailsPage /> },

      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/our-story", element: <OurStory /> },

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

        path: "/earn/bike",
        element: <BikeLayout />,
        children: [
          { index: true, element: <BikeStepOne /> },
          { path: "details", element: <BikeStepTwo /> },
        ],
      },
      { path: "/earn/car", element: <CarEarnings /> },
      { path: "/earn/cng", element: <CngEarnings /> },

      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
