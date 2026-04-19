import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBook";

export function useBookings({ game, courtId, date }) {
  const { data, isLoading } = useQuery({
    queryKey: ["bookings", game, courtId, date],
    queryFn: () => getBookings({ game, courtId, date }),
    enabled: !!game && !!courtId && !!date,
  });

  return {
    bookings: data || [],
    isLoading,
  };
}
