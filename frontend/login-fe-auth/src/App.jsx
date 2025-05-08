import AppLayout from "./components/AppLayout";
// import Home from "./components/Home";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Home from "./components/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

// const route = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     // errorElement: <Error />,
//     /*
//     children specifica quali percorsi (o rotte) saranno "figli" del layout definito da AppLayout
//     Questo significa che ogni rotta definita nei children verrà visualizzata dentro l'elemento Outlet di AppLayout
//     */
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/register",
//         element: <RegisterUser />,
//       },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={route} />;
// }

const queryClient = new QueryClient({
  // specifico qui le opzioni predefinite
  defaultOptions: {
    // specifico le opzioni delle nostre query
    queries: {
      /*
      è la quantita di tempo in cui i dati rimangono disponibili nella cache,
      finche non vengono nuovamente recuperati
      */
      // staleTime: 10 * 1000, // 60 secondi *  1000 millesecondi
      staleTime: 0, // questo permette di recuperare ogni modifica dallo stato in remoto istantaneamente
    },
  },
});

const App = () => {
  return (
    // qui rendiamo disponibili i dati che poi saranno forniti all albero dei componenti
    <QueryClientProvider client={queryClient}>
      {/* istallato devTools  */}
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterUser />} />

          <Route element={<AppLayout />}>
            {/* <Route index element={<Navigate replace to={"dashboard"} />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center" // in che posto deve uscire nella pagina
        gutter={12} // il gap che deve avere al suo interno
        containerStyle={{ margin: "8px" }} // il margine che deve avere dal punto di uscita
        toastOptions={{
          // durata msg success
          success: {
            duration: 3000,
          },
          error: {
            // durata msg error
            duration: 5000,
          },
          style: {
            // style msg
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-gray-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
