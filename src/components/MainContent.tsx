"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaBars,
  FaHome,
  FaMusic,
  FaVideo,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { FaRadio } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "@/utils/musicSlice";

interface Playlist {
  title: string;
  artist: string;
  duration: string;
  image: string;
  isLiked: boolean;
  preview: string;
}

function msToTime(duration: number): string {
  const milliseconds: number = parseInt(((duration % 1000) / 100).toString());
  const seconds: number = Math.floor((duration / 1000) % 60);
  const minutes: number = Math.floor((duration / (1000 * 60)) % 60);
  const hours: number = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const formattedHours: string = hours > 0 ? `${hours}:` : "";
  const formattedMinutes: string =
    minutes < 10 ? `0${minutes}` : minutes.toString();
  const formattedSeconds: string =
    seconds < 10 ? `0${seconds}` : seconds.toString();

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const dispatch = useDispatch();

  const handleTrackClick = (track: any) => {
    dispatch(setCurrentTrack(track));
  };

  const menuItems = [
    { icon: <FaHome size={30} />, label: "Home", route: "/" },
    {
      icon: <FaMusic size={25} />,
      label: "My collections",
      route: "/collections",
    },
    { icon: <FaRadio size={23} />, label: "Radio", route: "/radio" },
    { icon: <FaVideo size={23} />, label: "Music Videos", route: "/videos" },
  ];

  const bottomItems = [
    { icon: <FaUser size={25} />, label: "Profile", route: "/profile" },
    { icon: <FaSignOutAlt size={25} />, label: "Logout", route: "/logout" },
  ];

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

  const fetchPlaylists = async () => {
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/recommendations/",
      params: {
        limit: "20",
        seed_tracks: "2Fxmhks0bxGSBdJ92vM42m",
        seed_artists: "6eUKZXaKkcviH0Ku9w2n3V",
        seed_genres: "pop,indie pop",
      },
      headers: {
        "x-rapidapi-key": "61685f4572mshf647551fc1d2d6bp1fc1bfjsn046cf7c541d7",
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const trackData = response.data;

      const playlistData = trackData.tracks || [];

      const playlistDataTracks = playlistData.slice(0, 3).map((track: any) => ({
        title: track.name,
        artist: track.artists[0]?.name || "Unknown Artist",
        image: track.album.images[0]?.url || "/placeholder-image.png",
        duration: msToTime(track?.duration_ms),
        preview: track.preview_url,
        isLiked: false,
      }));

      setPlaylists(playlistDataTracks);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row text-white">
      {isSidebarOpen && isMobileView && (
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
          isSidebarOpen || !isMobileView ? "flex" : "hidden"
        }`}
        initial={{ x: -300 }}
        animate={{
          x: isSidebarOpen || !isMobileView ? 0 : -300,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center space-y-10 py-6">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/")}
          >
            <img src={Logo.src} alt="Logo" width={32} height={32} />
          </motion.div>

          <div className="flex flex-col items-start lg:items-center space-y-6 w-full px-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 cursor-pointer w-52 lg:justify-center lg:space-x-0 lg:flex-col"
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
              className="flex items-center space-x-4 cursor-pointer lg:justify-center lg:space-x-0 lg:flex-col"
              whileHover={{ scale: 1.1 }}
              onClick={() => router.push(item.route)}
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
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#25292C] text-white rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>
      )}

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
          <h3 className="text-xl font-bold md:mt-6 mb-4">Top charts</h3>
          <div className="flex lg:flex-col mb-4 space-x-4 lg:space-x-0 lg:space-y-4">
            {playlists.map((playlist, index) => (
              <div
                key={index}
                onClick={() =>
                  handleTrackClick({
                    title: playlist.title,
                    artist: playlist.artist,
                    image: playlist.image,
                    preview: playlist.preview,
                  })
                }
                className="flex items-center  justify-between bg-[#1A1E1F] p-4 rounded-lg min-w-[300px] lg:min-w-0"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={playlist.image}
                    alt={playlist.title}
                    width={80}
                    blurDataURL={playlist.image}
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
