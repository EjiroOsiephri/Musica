"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from "../../public/logo.png";
import { FaBars } from "react-icons/fa";

export default function Sidebar() {
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
    { icon: "/Logout.png", label: "Log out", route: "/logout" },
  ];

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth < 1024); // Mobile if width < 1024px
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => {
      window.removeEventListener("resize", updateView);
    };
  }, []);

  return (
    <div>
      {/* Overlay for Mobile */}
      {isSidebarOpen && isMobileView && (
        <motion.div
          className="fixed inset-0 bg-[#1d2123] bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
        ></motion.div>
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full ${
          isMobileView ? "w-80" : "w-36"
        } bg-[#1D2123] flex flex-col justify-between z-[9999] ${
          isSidebarOpen || !isMobileView ? "flex" : "hidden"
        }`}
        initial={{ x: -300 }}
        animate={{
          x: isSidebarOpen || !isMobileView ? 0 : -300,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="py-6 flex mb-40 justify-center">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/")}
          >
            <Image src={Logo} alt="Logo" width={32} height={32} />
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col justify-start items-start lg:items-center space-y-8 px-4 lg:px-0">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex space-x-4 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => router.push(item.route)}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100"
              />
              {isMobileView && (
                <span className="text-white text-sm">{item.label}</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Items */}
        <div className="mt-10 flex rounded-lg flex-col items-start lg:items-center space-y-8 py-6 px-4 lg:px-0">
          {bottomItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-end space-x-4 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => router.push(item.route)}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100"
              />
              {isMobileView && (
                <span className="text-white text-sm">{item.label}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hamburger for Mobile */}
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
