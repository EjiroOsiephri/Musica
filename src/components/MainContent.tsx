"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MainContent() {
  const topCharts = [
    { title: "Golden age of 80s", artist: "Sean Swadder", duration: "2:34:45" },
    { title: "Reggae 'n' Blues", artist: "Dj YK Mule", duration: "1:02:42" },
    { title: "Tomorrow's Tunes", artist: "Obi Datti", duration: "2:01:25" },
  ];

  return (
    <div className="ml-20 p-8 bg-[#171A1B] min-h-screen text-white">
      {/* Curated Playlist */}
      <motion.div
        className="bg-[#2D3748] rounded-lg p-8 flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div>
          <p className="text-pink-500 text-sm mb-2">Curated Playlist</p>
          <h2 className="text-4xl font-bold mb-4">R & B Hits</h2>
          <p className="text-gray-400">
            All mine, Lie again, Petty call me everyday, Out of time, No love,
            Bad habit, and so much more
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex -space-x-2">
              <img
                src="/icons/avatar1.png"
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-700"
              />
              <img
                src="/icons/avatar2.png"
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-700"
              />
            </div>
            <p className="text-gray-400">33k Likes</p>
          </div>
        </div>
        <Image
          src="/images/playlist-placeholder.png"
          alt="Playlist"
          width={200}
          height={200}
          className="rounded-lg"
        />
      </motion.div>

      {/* Top Charts */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Top Charts</h3>
        <div className="space-y-4">
          {topCharts.map((chart, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-[#2D3748] rounded-lg p-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={`/images/track-placeholder-${index + 1}.png`}
                  alt={chart.title}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-bold">{chart.title}</h4>
                  <p className="text-gray-400 text-sm">{chart.artist}</p>
                </div>
              </div>
              <p className="text-gray-400">{chart.duration}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
