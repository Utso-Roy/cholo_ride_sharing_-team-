import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import RootLayout from "../Layout/RootLayout";

// Pages
import Home from "../pages/Home/Home";
// otherpage
import AboutUs from "../pages/OthersPage/AboutUs";
import OurStory from "../pages/OthersPage/OurStory";
import Career from "../pages/OthersPage/Career";
import Partnership from "../pages/OthersPage/PartherShip";
import Privacy from "../pages/OthersPage/Privacy";

// Help Pages
import FAQ from "../Utils/Help/FAQ/FAQ";
import CustomerCare from "../Utils/Help/CustomerCare/CustomerCare";
import UserGuide from "../Utils/Help/UserGuide/UserGuide";
import DriverGuide from "../Utils/Help/DriverGuide/DriverGuide";

// Blog Pages
import { BlogListPage } from "../pages/Blog_Page/BlogListPage";
import { BlogDetailsPage } from "../pages/Blog_Page/BlogDetailsPage";

// Earnings Pages
import BikeLayout from "../Layout/BikeLayout";
import BikeStepOne from "../pages/BikeStepOne";
import BikeStepTwo from "../pages/BikeStepTwo";
import CarLayout from "../Layout/CarLayout";
import CarStepOne from "../pages/CarStepOne";
import CarStepTwo from "../pages/CarStepTwo";
import CNGLayout from "../Layout/CNGLayout";

// Auth
import SignUp from "../Access/SignUp";
import Login from "../Access/Login";

import CngStepOne from "../pages/CngStepOne";
import CngStepTwo from "../pages/CngStepTwo";


import PrivacyPolicy from "../Utils/Help/PrivacyPolicy/PrivacyPolicy";
import FeedbackForm from "../Utils/Help/FeedbackForm/FeedbackForm";
import SocialActivitiesPage from "../pages/OthersPage/SocialActivitiesPage";
import SocialActivitiesDetails from "../pages/OthersPage/SocialActivitiesDetails";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      // Home
      { index: true, element: <Home /> },

      // Help
      { path: "/faq", element: <FAQ /> },
      { path: "/customercare", element: <CustomerCare /> },
      { path: "/userguide", element: <UserGuide /> },
      { path: "/driverguide", element: <DriverGuide /> },
      { path: "/privacypolicy", element: <PrivacyPolicy /> },
      { path: "/feedbackform", element: <FeedbackForm /> },

      // Blog
      { path: "/blogs", element: <BlogListPage /> },
      { path: "/blogs/:id", element: <BlogDetailsPage /> },

      // Others
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/our-story", element: <OurStory /> },
      { path: "/career", element: <Career/>},
      { path: "/policy", element: <Privacy/>},
      { path: "/partnership", element: <Partnership/>},
      { path: "/social", element: <SocialActivitiesPage/>},
      { path: "/activities/:id", element: <SocialActivitiesDetails/>},

      // Earnings / Nested Routes
      {
        path: "/earn/bike",
        element: <BikeLayout />,
        children: [
          { index: true, element: <BikeStepOne /> },
          { path: "details", element: <BikeStepTwo /> },
        ],
      },
      { path: "/earn/car",
        element: <CarLayout />,
        children: [
          {index: true, element: <CarStepOne/>},
          {path: "details", element: <CarStepTwo/>}
        ],
       },
      { path: "/earn/cng",
        element: <CNGLayout />,
        children: [
          {index: true, element: <CngStepOne/>},
          {path: "details", element: <CngStepTwo/>}
        ]
       },
        

      // Auth
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
