import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔥 Strict check (important)
    if (token && token !== "undefined") {
      navigate("/courts", { replace: true });
    }
  }, [navigate]);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");

  const { loginUser, isPending: isLoggingIn } = useLogin();
  const { signupUser, isPending: isSigningUp } = useSignup();

  function handleSubmit() {
    if (!email) return;

    if (isLogin) {
      loginUser(email);
    } else {
      signupUser(email);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0b0f14]">
      <div className="w-full max-w-md bg-[#111827] border border-[#1f2937] rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            {" "}
            <img
              src="./../favicon.svg"
              /* replace with your image */ alt="logo"
              className="w-8 h-8 object-contain"
            />{" "}
            <h1 className="text-2xl font-semibold text-white tracking-wide">
              {" "}
              BOOK MY COURT{" "}
            </h1>{" "}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {isLogin ? "Access your bookings" : "Create your account"}
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your college email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0b0f14] border border-[#1f2937] text-white"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoggingIn || isSigningUp}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white"
          >
            {isLogin
              ? isLoggingIn
                ? "Logging in..."
                : "Login"
              : isSigningUp
                ? "Signing up..."
                : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          {isLogin ? "New here?" : "Already registered?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-400"
          >
            {isLogin ? "Create account" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
