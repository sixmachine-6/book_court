import { useMutation } from "@tanstack/react-query";
import { login } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      toast.success("Logged in successfully 🚀");

      navigate("/courts");
    },

    onError: (err) => {
      console.error(err);
      toast.error("Login failed ❌");
    },
  });

  return { loginUser, isPending };
}
