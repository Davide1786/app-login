// import { useQuery } from "@tanstack/react-query";
// import { getUserProfile } from "./api/api";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const { isLoading, isError } = useQuery({
//     queryKey: ["userProfile"],
//     queryFn: getUserProfile,
//     retry: false,
//   });

//   if (isLoading) {
//     return <div>Caricamento...</div>;
//   }

//   if (isError) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "./api/api";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
  });

  if (isLoading) return <div>Caricamento...</div>;
  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
