"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Rectangle1 from "../../public/Rectangle 14.png";
import Rectangle2 from "../../public/Rectangle 15.png";
import Rectangle3 from "../../public/Rectangle 16.png";
import Rectangle4 from "../../public/Rectangle 18.png";
import Rectangle5 from "../../public/Rectangle 20.png";
import Rectangle6 from "../../public/Rectangle 19.png";

const musicData = [
  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle1,
  },
  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle2,
  },
  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle3,
  },
  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle1,
  },
  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle4,
  },
  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle5,
  },

  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle3,
  },
  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle6,
  },
  {
    title: "Life in a bubble",
    artist: "The van",
    image: Rectangle1,
  },
];

const Section = ({ title }: { title: string }) => {
  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>
      <motion.div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {musicData.map((item, index) => (
          <motion.div
            key={index}
            className="shrink-0 w-[150px] cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={item.image}
              alt={`${item.title} cover`}
              width={150}
              height={150}
              className="rounded-lg object-cover"
              loading="lazy"
            />
            <h3 className="text-white text-sm mt-2">{item.title}</h3>
            <p className="text-gray-400 text-xs">{item.artist}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const MusicSection = () => {
  return (
    <div className="px-8 py-6 overflow-y-auto h-[calc(100vh-4rem)]">
      {/* Adjust height for proper scrolling */}
      <Section title="New releases." />
      <Section title="Popular in your area" />
    </div>
  );
};

export default MusicSection;
