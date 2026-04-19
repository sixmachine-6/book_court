import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../services/apiBook";

export function useMyBookings() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });

  return {
    bookings: data || [],
    isLoading,
  };
}
