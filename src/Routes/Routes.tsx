import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home";
import RootLayout from "../Layout/RootLayout";
import { BlogListPage } from "../pages/Blog_Page/BlogListPage";

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
         path: "/blog",
        element: <BlogListPage></BlogListPage>,

      },
    ],
  },
]);

export default router;
