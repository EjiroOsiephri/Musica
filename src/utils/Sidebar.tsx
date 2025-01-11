"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const menuItems = [
    { icon: "/Home.png", label: "Home", route: "/" },
    { icon: "/playlist.svg", label: "Discover", route: "/discover" },
    { icon: "/radio.svg", label: "Profile", route: "/profile" },
    { icon: "/videos.svg", label: "Gaming", route: "/gaming" },
    { icon: "/profile.svg", label: "Explore", route: "/explore" },
    { icon: "/Logout.png", label: "Settings", route: "/settings" },
  ];

  return (
    <motion.div
      className="fixed left-0 top-0 h-full bg-[#1D2123] w-20 flex flex-col items-center py-8 space-y-6"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div
        className="mb-8 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => router.push("/")}
      >
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
      </motion.div>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center cursor-pointer"
          whileHover={{ scale: 1.2 }}
          onClick={() => router.push(item.route)}
        >
          <img src={item.icon} alt={item.label} className="w-6 h-6 mb-2" />
          <span className="text-gray-400 text-xs">{item.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
