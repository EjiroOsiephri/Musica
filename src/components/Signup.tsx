"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SignupForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpComponent() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<
    "google" | "facebook" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }
      );

      localStorage.setItem("token", res.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "facebook") => {
    setOauthLoading(provider);

    const clientId =
      provider === "google"
        ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        : process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;

    const authUrl =
      provider === "google"
        ? `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=token&scope=email%20profile`
        : `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=email`;

    window.location.href = authUrl;
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen px-4 py-6 bg-gradient-to-b from-[#A4C7C6] to-[#1D2123]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-lg bg-opacity-70 bg-black p-8 rounded-lg shadow-lg">
        <button
          onClick={() => router.push("/")}
          className="text-gray-300 underline text-sm mb-4 hover:text-[#FACD66]"
        >
          Go Back
        </button>

        <h1 className="text-4xl font-extrabold mb-6 text-center text-[#FACD66]">
          Musica
        </h1>
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create your account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Mobile No."
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mb-6 bg-gradient-to-r from-[#FACD66] to-[#FACD66] text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            {loading ? (
              <motion.div className="flex py-1.5 justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => handleOAuthLogin("google")}
            disabled={oauthLoading === "google"}
            className="flex items-center justify-center w-40 py-2 bg-white text-black rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            {oauthLoading === "google" ? (
              <motion.div className="flex py-1.5 space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-black rounded-full"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <>
                <FaGoogle className="mr-2" /> Google
              </>
            )}
          </button>
          <button
            onClick={() => handleOAuthLogin("facebook")}
            disabled={oauthLoading === "facebook"}
            className="flex items-center justify-center w-40 py-2 bg-[#A4C7C6] text-white rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            {oauthLoading === "facebook" ? (
              <motion.div className="flex py-1.5 space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <>
                <FaFacebook className="mr-2" /> Facebook
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
