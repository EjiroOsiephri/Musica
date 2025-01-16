"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GetStartedComponent() {
  const quotes = [
    {
      text: "If music be the food of love, play on.",
      author: "William Shakespeare",
    },
    {
      text: "Where words fail, music speaks.",
      author: "Hans Christian Andersen",
    },
    {
      text: "Music is the universal language of mankind.",
      author: "Henry Wadsworth Longfellow",
    },
    {
      text: "Life seems to go on without effort when I am filled with music.",
      author: "George Eliot",
    },
    {
      text: "Music can change the world because it can change people.",
      author: "Bono",
    },
    {
      text: "Without music, life would be a mistake.",
      author: "Friedrich Nietzsche",
    },
    { text: "Music is the strongest form of magic.", author: "Marilyn Manson" },
    {
      text: "One good thing about music, when it hits you, you feel no pain.",
      author: "Bob Marley",
    },
    {
      text: "Music is what tells us that the human race is greater than we realize.",
      author: "Napoléon Bonaparte",
    },
    {
      text: "Music expresses that which cannot be put into words and that which cannot remain silent.",
      author: "Victor Hugo",
    },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#A4C7C6] to-[#1D2123]">
      <div className="w-full bg-opacity-70 bg-black shadow-lg md:p-8 p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center md:text-left text-[#FACD66]">
          Musica
        </h1>
        <div className="md:flex md:items-center md:space-x-8">
          <div className="md:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1 }}
                className="text-white text-2xl md:text-4xl font-bold text-center md:text-left"
              >
                "{quotes[currentQuoteIndex].text}"
              </motion.div>
            </AnimatePresence>
            <motion.p
              className="text-gray-300 text-center md:text-left mt-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={currentQuoteIndex}
              transition={{ duration: 1 }}
            >
              {quotes[currentQuoteIndex].author}
            </motion.p>
          </div>

          {/* Right Section: Image and Buttons */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {/* Image */}
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/image.png"
                alt="Piano Player"
                width={500}
                height={300}
                className="object-cover h-max"
              />
            </div>

            {/* Buttons */}
            <motion.div
              style={{ marginTop: "2rem" }}
              className="flex mt-20 space-x-4"
            >
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-[#FACD66] to-[#FACD66] text-[#1A1E1F] rounded-lg shadow-lg font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/authform/signin")}
              >
                Sign In
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-white text-[#1A1E1F] rounded-lg shadow-lg font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/authform/signup")}
              >
                Sign Up
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
