"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();

  const menuItems = [
    { icon: "/Home.png", label: "Home", route: "/" },
    { icon: "/playlist.svg", label: "Discover", route: "/discover" },
    { icon: "/radio.svg", label: "Gaming", route: "/gaming" },
    { icon: "/videos.svg", label: "Explore", route: "/explore" },
  ];

  const bottomItems = [
    { icon: "/profile.svg", label: "Profile", route: "/profile" },
    { icon: "/Logout.png", label: "Logout", route: "/logout" },
  ];

  const playlists = [
    {
      title: "Golden age of 80s",
      artist: "Sean Swadder",
      duration: "2:34:45",
      cover: "/Rectangle 17.png",
      isLiked: false,
    },
    {
      title: "Reggae 'n' blues",
      artist: "DJ YK Mule",
      duration: "1:02:42",
      cover: "/Rectangle 17 (1).png",
      isLiked: false,
    },
    {
      title: "Tomorrow's tunes",
      artist: "Obi Datti",
      duration: "2:01:25",
      cover: "/Rectangle 17 (2).png",
      isLiked: false,
    },
  ];

  const [likedPlaylists, setLikedPlaylists] = useState<number[]>([]);

  const handleLikeClick = (playlistIndex: number) => {
    const updatedPlaylists = [...playlists];
    updatedPlaylists[playlistIndex].isLiked =
      !updatedPlaylists[playlistIndex].isLiked;

    setLikedPlaylists(
      updatedPlaylists[playlistIndex].isLiked
        ? [...likedPlaylists, playlistIndex]
        : likedPlaylists.filter((index) => index !== playlistIndex)
    );
  };

  return (
    <div className="flex h-screen bg-[#16181A] text-white">
      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full bg-[#1D2123] w-20 flex flex-col justify-between items-center py-6"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center space-y-10">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/")}
          >
            <Image src="/Logo.png" alt="Logo" width={32} height={32} />
          </motion.div>

          <div className="flex flex-col items-center space-y-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={() => router.push(item.route)}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8">
          {bottomItems.map((item, index) => (
            <motion.div
              key={index}
              className="cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onClick={() => router.push(item.route)}
            >
              <Image src={item.icon} alt={item.label} width={24} height={24} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="ml-20 flex-grow p-8 flex space-x-8">
        {/* Featured Playlist */}
        <div
          className="flex flex-1 bg-[#609EAF] rounded-xl overflow-hidden relative"
          style={{ height: "450px" }}
        >
          <div className="flex flex-col justify-center p-8 z-10">
            <span className="text-sm text-white-400 mb-2">
              Curated Playlist
            </span>
            <h2 className="text-3xl font-bold mb-4">R & B Hits</h2>
            <h3 className=" text-white-400 max-w-64 mb-6">
              All mine, Lie again, Petty call me everyday, Out of time, No love,
              Bad habit, and so much more
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <Image src="/Ellipse 3.png" alt="User" width={32} height={32} />
                <Image src="/Ellipse 5.png" alt="User" width={32} height={32} />
                <Image src="/Ellipse 6.png" alt="User" width={32} height={32} />
              </div>
              <span className="text-sm text-gray-400 flex items-center">
                <FaHeart className="text-pink-500 mr-2" /> 33k Likes
              </span>
            </div>
          </div>
          <div className="absolute inset-0 flex justify-end items-center">
            <Image
              src="/Vector.svg"
              alt="Background Design"
              layout="fill"
              objectFit="contain"
              className="z-0 opacity-50"
            />
            <Image
              src="/Pexels Photo by Eric Esma.png"
              alt="Artist"
              width={600}
              height={900}
              objectFit="contain"
              className="z-10 ml-10"
            />
          </div>
        </div>

        {/* Top Charts */}
        <div
          className="w-2/5 p-4 rounded-xl bg-[#1D2123]"
          style={{ height: "450px" }}
        >
          <h3 className="text-xl font-bold mb-4">Top charts</h3>
          <div className="flex flex-col space-y-4">
            {playlists.map((playlist, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#25292C] p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={playlist.cover}
                    alt={playlist.title}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-bold">{playlist.title}</h4>
                    <p className="text-sm text-gray-400">{playlist.artist}</p>
                    <p className="text-xs text-gray-400">{playlist.duration}</p>
                  </div>
                </div>
                <FaHeart
                  className={`cursor-pointer ${
                    playlist.isLiked ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={() => handleLikeClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
