import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home";
import RootLayout from "../Layout/RootLayout";
import { BlogListPage } from "../pages/Blog_Page/BlogListPage";
import { BlogDetailsPage } from "../pages/Blog_Page/BlogDetailsPage";
import AboutUs from "../pages/OthersPage/AboutUs";
import OurStory from "../pages/OthersPage/OurStory";
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
        path: "/blogs",
        element: <BlogListPage></BlogListPage>,

      },
      {
        path: "/blogs/:id",
        element: <BlogDetailsPage></BlogDetailsPage>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/our-story",
        element: <OurStory />,
      }
      ,
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
