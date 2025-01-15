"use client";

import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SignUpComponent() {
  const router = useRouter();

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen px-2 py-1 md:px-6 md:py-12 bg-gradient-to-b from-[#A4C7C6] to-[#1D2123]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-lg md:max-w-xl bg-opacity-70 bg-black p-8 rounded-lg shadow-lg">
        {/* Go Back Button */}
        <button
          onClick={() => router.push("/") /* Go back to home page */}
          className="text-gray-300 underline text-sm mb-4 hover:text-pink-500"
        >
          Go Back
        </button>

        {/* Title */}
        <h1
          className="text-4xl font-extrabold mb-6 text-center text-pink-500 cursor-pointer"
          onClick={() => router.back()}
        >
          Musica
        </h1>
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create your account
        </h2>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Mobile No."
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
          <button
            type="submit"
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 mb-6 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>

        {/* Social Buttons */}
        <div className="mt-6 flex justify-center items-center gap-4">
          <button className="flex items-center justify-center w-40 py-2 bg-white text-black rounded-lg shadow-md hover:scale-105 transition-transform">
            <FaGoogle className="mr-2" />
            Google
          </button>
          <button className="flex items-center justify-center w-40 py-2 bg-[#A4C7C6] text-white rounded-lg shadow-md hover:scale-105 transition-transform">
            <FaFacebook className="mr-2" />
            Facebook
          </button>
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <a
            href="/authform/signin"
            className="text-pink-500 underline hover:text-white"
          >
            Sign In Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}
