import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookCourt } from "../services/apiBook";
import toast from "react-hot-toast";

export function useBookCourt() {
  const queryClient = useQueryClient();

  const { mutate: book, isPending } = useMutation({
    mutationFn: bookCourt,

    onSuccess: () => {
      toast.success("Court booked successfully 🎉");

      // 🔥 Refetch courts to update slots
      queryClient.invalidateQueries(["courts"]);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { book, isPending };
}
