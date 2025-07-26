import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Command from "./pages/Command";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import { DarkModeProvider } from "./context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageNotFound from "./pages/PageNotFound";
import NewUsers from "./pages/Users";
import ProtectedRoute from "./ui/ProtectedRoute";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // time to wait until refetch again, time in miliseconds. For example 60secs
        //staleTime: 60 * 1000,
        // If Staletime set to 0, ReactQuery inmediatly refetch data when user change to another tab in browser
        staleTime: 0,
      },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order/:orderId" element={<Order />} />
              <Route path="command" element={<Command />} />
              <Route path="products" element={<Products />} />
              <Route path="users" element={<NewUsers />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
