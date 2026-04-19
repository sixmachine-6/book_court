import { useQuery } from "@tanstack/react-query";
import { getCourts } from "../services/apiBook";

export function useCourtDetails() {
  const {
    data: courts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: getCourts,
  });

  return { courts, isLoading, error };
}
