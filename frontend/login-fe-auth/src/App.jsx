import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const route = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement: <Error />,
    /*
    children specifica quali percorsi (o rotte) saranno "figli" del layout definito da AppLayout
    Questo significa che ogni rotta definita nei children verrà visualizzata dentro l'elemento Outlet di AppLayout
    */
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterUser />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={route} />;
}
export default App;
