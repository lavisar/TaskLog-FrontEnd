import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserSignUp from "./pages/user/UserSignUp";
import ErrorPage from "./pages/shared/ErrorPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMain from "./pages/admin/AdminMain";
import RequireAdminAuth from "./store/apis/features/RequireAdminAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <UserSignUp />,
    errorElement: <ErrorPage />,
  },

  // Links for ADMIN
  {
    path: "/admin",
    element: <AdminLogin />,
    children: [{}],
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/main",
    element: (
      <RequireAdminAuth>
        <AdminMain />
      </RequireAdminAuth>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
