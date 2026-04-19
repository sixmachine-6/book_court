import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Court from "./pages/Court";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import MyBookings from "./pages/MyBooking";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      {/* Toasts */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #1f2937",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />

          {/* Protected */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            import MyBookings from "./pages/MyBookings";
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/courts" element={<Court />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
