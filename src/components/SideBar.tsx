"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  FaBars,
  FaHome,
  FaMusic,
  FaVideo,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRadio } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import Logo from "../../public/logo.png";

export default function Sidebar() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentRoute = usePathname();

  useEffect(() => {
    const updateView = () => setIsMobileView(window.innerWidth < 1024);
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Logout response:", res);

      if (res.ok) {
        router.push("/authform/signin");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This action cannot be undone!")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/profile/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Delete account response:", res);
      if (res.ok) {
        router.push("/signup");
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error("Delete account error:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { icon: <FaHome size={30} />, label: "Home", route: "/dashboard" },
    { icon: <FaMusic size={25} />, label: "My Playlists", route: "/album" },
    { icon: <FaRadio size={23} />, label: "Radio", route: "/radio" },
    { icon: <FaVideo size={23} />, label: "Music Videos", route: "/videos" },
  ];

  const bottomItems = [
    { icon: <FaUser size={25} />, label: "Profile", route: "/profile" },
    {
      icon: <FaSignOutAlt size={25} />,
      label: "Logout",
      route: "/logout",
      action: () => setShowLogoutModal(true),
    },
  ];

  return (
    <>
      {isSidebarOpen && isMobileView && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <motion.div
        className={`fixed left-0 top-0 h-full w-64 lg:w-20 bg-[#1D2123] text-white flex flex-col justify-between z-50 ${
          isSidebarOpen || !isMobileView ? "flex" : "hidden"
        }`}
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen || !isMobileView ? 0 : -300 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center space-y-10 py-6">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/")}
          >
            <Image src={Logo} alt="Logo" width={32} height={32} />
          </motion.div>
          <div className="flex flex-col items-start lg:items-center space-y-6 w-full px-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-4 cursor-pointer w-52 lg:justify-center lg:space-x-0 lg:flex-col ${
                  currentRoute === item.route ? "text-yellow-500" : "text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                onClick={() => router.push(item.route)}
              >
                {item.icon}
                <span className="text-sm lg:hidden">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-center space-y-6 w-full px-4 py-6">
          {bottomItems.map((item, index) => (
            <motion.div
              key={index}
              className={`flex items-center space-x-4 cursor-pointer lg:justify-center lg:space-x-0 lg:flex-col ${
                currentRoute === item.route ? "text-yellow-500" : "text-white"
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={item.action || (() => router.push(item.route))}
            >
              {item.icon}
              <span className="text-sm lg:hidden">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {isMobileView && (
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#1D2123]">
          <FaBars
            className="text-white text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      )}

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              className="bg-[#2C2F33] p-6 m-4 rounded-2xl shadow-lg text-center max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-white">
                Are you sure?
              </h2>
              <p className="text-gray-400 mt-2">
                Do you want to logout or permanently delete your account?
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <motion.button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? (
                    <ImSpinner8 className="animate-spin mr-2" />
                  ) : null}
                  Delete Account
                </motion.button>
                <motion.button
                  className="bg-[#609EAF] text-white px-4 py-2 rounded-lg hover:bg-[#609EAF] flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? (
                    <ImSpinner8 className="animate-spin mr-2" />
                  ) : null}
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
