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
      {/* Main Content */}
      <div className="flex-grow p-4 lg:p-8 space-y-8 lg:space-y-0 lg:space-x-8 flex flex-col lg:flex-row">
        {/* Featured Playlist */}

        <section className="flex flex-col md:flex-1">
          {!isMobileView && (
            <div className="flex items-center space-x-4 -mt-5 mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#25292C] w-full text-white rounded-lg px-4 py-2 text-sm"
              />
            </div>
          )}

          <div
            className="flex bg-[#609EAF] rounded-xl overflow-hidden relative"
            style={{ height: "450px" }}
          >
            <div className="flex flex-col justify-center p-8 z-10">
              <span className="absolute  top-6 text-lg text-white-400  mb-2">
                Curated Playlist
              </span>
              <h2 className="text-3xl font-bold mt-6 md:mt-0 mb-4">
                R & B Hits
              </h2>
              <h3 className="text-white-400 max-w-64 mb-6 lg:block">
                All mine, Lie again, Petty call me everyday, Out of time, No
                love, Bad habit, and so much more
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <Image
                    src="/Ellipse 3.png"
                    alt="User"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="/Ellipse 5.png"
                    alt="User"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="/Ellipse 6.png"
                    alt="User"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-lg text-white flex items-center">
                  <motion.div
                    className="rounded-full p-2 cursor-pointer"
                    whileTap={{ scale: 1.2 }}
                    onClick={() => console.log("Like clicked")}
                  >
                    <FaHeart className="text-white" />
                  </motion.div>
                  33k Likes
                </span>
              </div>
            </div>
            <div className="absolute inset-0 flex justify-end items-center">
              <Image
                src="/Vector.svg"
                alt="Background Design"
                layout="fill"
                objectFit="cover"
                className="z-0  opacity-50"
              />
              <Image
                src="/Pexels Photo by Eric Esma.png"
                alt="Artist"
                width={600}
                height={900}
                objectFit="contain"
                className="z-10 ml-[2500px] -mt-[60px] hidden xl:block opacity-0 md:opacity-100"
              />
            </div>
          </div>
        </section>

        {/* Top Charts */}
        <div className="w-full lg:w-2/5 p-4 overflow-x-auto lg:overflow-visible">
          <h3 className="text-xl font-bold md:mt-6 mb-6">Top charts</h3>
          <div className="flex lg:flex-col mb-6 space-x-4 lg:space-x-0 lg:space-y-4">
            {playlists.map((playlist, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#1A1E1F] p-4 rounded-lg min-w-[300px] lg:min-w-0"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={playlist.cover}
                    alt={playlist.title}
                    width={80}
                    height={80}
                    className="rounded-lg"
                    loading="lazy"
                  />
                  <div className="lg:block">
                    <h4 className="font-bold">{playlist.title}</h4>
                    <p className="text-sm text-gray-400 mt-1 mb-1">
                      {playlist.artist}
                    </p>
                    <p className="text-xs text-white">{playlist.duration}</p>
                  </div>
                </div>
                <motion.div
                  className={`cursor-pointer flex justify-center items-center border-2 ${
                    playlist.isLiked ? "border-pink-500" : "border-white"
                  } rounded-full p-1`}
                  whileTap={{ scale: 1.2 }}
                  onClick={() => handleLikeClick(index)}
                >
                  <FaHeart
                    className={`${
                      playlist.isLiked
                        ? "text-pink-500 scale-110"
                        : "text-white"
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
