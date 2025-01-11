"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHeart, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";

interface Playlist {
  title: string;
  artist: string;
  duration: string;
  cover: string;
  isLiked: boolean;
}

export default function Dashboard() {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: "/Home.png", label: "Home", route: "/" },
    { icon: "/playlist.svg", label: "My collections", route: "/collections" },
    { icon: "/radio.svg", label: "Radio", route: "/radio" },
    { icon: "/videos.svg", label: "Music Videos", route: "/videos" },
  ];

  const bottomItems = [
    { icon: "/profile.svg", label: "Profile", route: "/profile" },
    { icon: "/Logout.png", label: "Logout", route: "/logout" },
  ];

  const [playlists, setPlaylists] = useState<Playlist[]>([
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
  ]);

  const handleLikeClick = (playlistIndex: number) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist, index) =>
        index === playlistIndex
          ? { ...playlist, isLiked: !playlist.isLiked }
          : playlist
      )
    );
  };

  const closeSidebar = () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar && !sidebar.contains(e.target as Node)) {
        closeSidebar();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#16181A] text-white">
      {/* Sidebar */}
      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSidebar}
        ></motion.div>
      )}

      <motion.div
        className={`sidebar fixed left-0 top-0 h-full w-64 lg:w-20 bg-[#1D2123] flex flex-col justify-between z-50 ${
          isSidebarOpen ? "flex" : "hidden lg:flex"
        }`}
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center space-y-10 py-6">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/")}
          >
            <Image src="/Logo.png" alt="Logo" width={32} height={32} />
          </motion.div>

          {/* Menu Items */}
          <div className="flex flex-col items-start lg:items-center space-y-6 w-full px-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 cursor-pointer lg:justify-center lg:space-x-0 lg:flex-col"
                whileHover={{ scale: 1.1 }}
                onClick={() => router.push(item.route)}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <span className="text-sm lg:hidden">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Items */}
        <div className="flex flex-col items-start lg:items-center space-y-6 w-full px-4 py-6">
          {bottomItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 cursor-pointer lg:justify-center lg:space-x-0 lg:flex-col"
              whileHover={{ scale: 1.1 }}
              onClick={() => router.push(item.route)}
            >
              <Image src={item.icon} alt={item.label} width={24} height={24} />
              <span className="text-sm lg:hidden">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hamburger Menu */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#1D2123]">
        <FaBars
          className="text-white text-2xl cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#25292C] text-white rounded-lg px-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow lg:ml-20 p-4 lg:p-8 space-y-8 lg:space-y-0 lg:space-x-8 flex flex-col lg:flex-row">
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
            <h3 className="text-white-400 max-w-64 mb-6 hidden lg:block">
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
                <motion.div
                  className="border-2 border-gray-500 rounded-full p-2 cursor-pointer"
                  whileTap={{ scale: 1.2 }}
                  onClick={() => console.log("Like clicked")}
                >
                  <FaHeart className="text-gray-500" />
                </motion.div>{" "}
                33k Likes
              </span>
            </div>
          </div>

          <div className="absolute inset-0 flex justify-end items-center">
            <Image
              src="/Vector.svg"
              alt="Background Design"
              layout="fill"
              objectFit="contain"
              className="z-0  opacity-50"
            />
            <Image
              src="/Pexels Photo by Eric Esma.png"
              alt="Artist"
              width={600}
              height={900}
              objectFit="contain"
              className="z-10 ml-10 opacity-0 md:opacity-100"
            />
          </div>
        </div>

        {/* Top Charts */}
        <div
          className="w-full lg:w-2/5 p-4 rounded-xl bg-[#1D2123]"
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
                  <div className="lg:block">
                    <h4 className="font-bold">{playlist.title}</h4>
                    <p className="text-sm text-gray-400">{playlist.artist}</p>
                    <p className="text-xs text-gray-400">{playlist.duration}</p>
                  </div>
                </div>
                <motion.div
                  className={`cursor-pointer flex justify-center items-center border-2 ${
                    playlist.isLiked ? "border-pink-500" : "border-gray-500"
                  } rounded-full p-1`}
                  whileTap={{ scale: 1.2 }}
                  onClick={() => handleLikeClick(index)}
                >
                  <FaHeart
                    className={`${
                      playlist.isLiked
                        ? "text-pink-500 scale-110"
                        : "text-gray-400"
                    } transition-all duration-300`}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
