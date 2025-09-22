import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import RootLayout from "../Layout/RootLayout";

// Pages
import Home from "../pages/Home/Home";
import AboutUs from "../pages/OthersPage/AboutUs";
import OurStory from "../pages/OthersPage/OurStory";

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
import CarEarnings from "../pages/CarEarnings";
import CngEarnings from "../pages/CngEarnings";

// Auth
import SignUp from "../Access/SignUp";
import Login from "../Access/Login";
import CarLayout from "../Layout/CarLayout";
import CarStepOne from "../pages/CarStepOne";
import CarStepTwo from "../pages/CarStepTwo";

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

      // Blog
      { path: "/blogs", element: <BlogListPage /> },
      { path: "/blogs/:id", element: <BlogDetailsPage /> },

      // Others
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/our-story", element: <OurStory /> },

      // Earnings / Nested Routes
      {
        path: "/earn/bike",
        element: <BikeLayout />,
        children: [
          { index: true, element: <BikeStepOne /> },
          { path: "details", element: <BikeStepTwo /> },
        ],
      },
      { path: "/earn/car", element: <CarLayout />,
        children: [
          {index: true, element: <CarStepOne/>},
          {path: "details", element: <CarStepTwo/>}
        ],
       },
      { path: "/earn/cng", element: <CngEarnings /> },

      // Auth
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
