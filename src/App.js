import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserSignUp from "./pages/user/UserSignUp";
import ErrorPage from "./pages/shared/ErrorPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMain from "./pages/admin/AdminMain";
import RequireAuth from "./store/apis/features/RequireAuth";

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
      <RequireAuth>
        <AdminMain />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
