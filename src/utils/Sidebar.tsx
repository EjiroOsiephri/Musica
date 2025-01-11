"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const router = useRouter();
  const menuItems = [
    { icon: "/home.svg", label: "Home", route: "/" },
    { icon: "/discover.svg", label: "Discover", route: "/discover" },
    { icon: "/gaming.svg", label: "Gaming", route: "/gaming" },
    { icon: "/explore.svg", label: "Explore", route: "/explore" },
  ];

  const bottomItems = [
    { icon: "/profile.svg", label: "Profile", route: "/profile" },
    { icon: "/logout.svg", label: "Logout", route: "/logout" },
  ];

  return (
    <motion.div
      className="fixed left-0 top-0 h-full bg-[#1D2123] w-20 flex flex-col justify-between items-center py-6"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-10">
        {/* Logo */}
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => router.push("/")}
        >
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        </motion.div>

        {/* Menu Items */}
        <div className="flex flex-col items-center space-y-8">
          {menuItems.map((item, index) => (
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
      </div>

      {/* Bottom Section */}
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
  );
}
