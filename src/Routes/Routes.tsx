import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home";
import RootLayout from "../Layout/RootLayout";
import { BlogListPage } from "../pages/Blog_Page/BlogListPage";
import { BlogDetailsPage } from "../pages/Blog_Page/BlogDetailsPage";

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
        path:"/blogs/:id",
        element: <BlogDetailsPage></BlogDetailsPage>
      }
    ],
  },
]);

export default router;
