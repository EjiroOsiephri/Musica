"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHeart, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import Logo from "../../public/logo.png";

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
  const [isMobileView, setIsMobileView] = useState(false);

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
    if (isSidebarOpen && isMobileView) setIsSidebarOpen(false);
  };

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => {
      window.removeEventListener("resize", updateView);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row bg-[#16181A] text-white">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && isMobileView && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSidebar}
        ></motion.div>
      )}

      {/* Sidebar */}
      <motion.div
        className={`sidebar fixed left-0 top-0 h-full w-64 lg:w-20 bg-[#1D2123] flex flex-col justify-between z-50 ${
          isSidebarOpen || !isMobileView ? "flex" : "hidden"
        }`}
        initial={{ x: -300 }}
        animate={{
          x: isSidebarOpen || !isMobileView ? 0 : -300,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center space-y-10 py-6">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/")}
          >
            <Image src={Logo} alt="Logo" width={32} height={32} />
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
      {isMobileView && (
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
      )}
    </div>
  );
}
