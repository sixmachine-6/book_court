import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signupUser, isPending } = useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Account created🎉");
      navigate("/courts");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signupUser, isPending };
}
