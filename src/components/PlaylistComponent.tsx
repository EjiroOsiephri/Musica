"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import ImageLead from "../../public/Lead-image (1).png";
import Sidebar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setCurrentTrack } from "../utils/musicSlice";

const PlaylistComponent = () => {
  interface Song {
    image: string;
    title: string;
    album: string;
    duration: string | number;
    artist: string;
    preview: string;
    track_id: string | number;
    user_id: string | number;
  }

  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleTrackClick = (track: Song) => {
    dispatch(setCurrentTrack(track));
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        if (!API_URL) {
          console.error("API URL is not defined in the environment variables");
          return;
        }

        const response = await fetch(`${API_URL}/playlists/get-playlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Playlist:", data);

          const uniqueSongs: Song[] = Array.from(
            new Map<string | number, Song>(
              data.playlist.map((song: Song) => [song.track_id, song])
            ).values()
          );

          setSongs(uniqueSongs);
          setFilteredSongs(uniqueSongs);
        } else {
          console.error("Failed to fetch playlist");
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredSongs(
        searchTerm.trim()
          ? songs.filter((song) =>
              song.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : songs
      );
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, songs]);

  return (
    <>
      <Sidebar />
      <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden text-white  md:pb-28">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={ImageLead}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-40"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative min-w-[100vw] pl-4 lg:pl-24 p-4 bg-[#121212]/80 min-h-screen space-y-12">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-800  rounded-full px-4 py-2 max-w-md">
            <FiSearch className="text-gray-400 text-lg mr-2" />
            <input
              type="text"
              placeholder="Search playlists..."
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFilteredSongs(
                    songs.filter((song) =>
                      song.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                  );
                }
              }}
            />
          </div>

          {/* Playlist Info */}
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-56 h-56 relative rounded-lg overflow-hidden">
              <Image
                src={ImageLead}
                alt="Album Art"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-4xl font-semibold text-gray-200">
                Tomorrow’s tunes
              </h1>
              <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                A handpicked collection of fresh sounds and timeless classics.
              </p>
              <p className="text-gray-500 text-sm">
                {filteredSongs.length} songs
              </p>
              <div className="flex items-center gap-6 mt-4">
                <motion.button
                  whileTap={{ scale: 1.05 }}
                  className="bg-yellow-500 text-black font-semibold px-5 py-2.5 rounded-lg"
                  onClick={() => {
                    if (filteredSongs.length > 0) {
                      dispatch(setCurrentTrack(filteredSongs[0]));
                    }
                  }}
                >
                  Play all
                </motion.button>
                <FaHeart className="text-pink-500 text-2xl cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Song List */}
          <div className="mt-16 space-y-4 !mb-48 md:!mb-0">
            <div className="grid grid-cols-4 text-gray-400 text-sm pb-3 border-b border-gray-700 px-4">
              <p>Title</p>
              <p>Album</p>
              <p>Duration</p>
              <p></p>
            </div>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-2 gap-6 md:grid-cols-4 items-center p-4  bg-[#111827cc]/80 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleTrackClick({
                      title: song.title,
                      artist: song.artist,
                      image: song.image,
                      preview: song.preview,
                      album: song.album,
                      duration: song.duration,
                      track_id: song.track_id,
                      user_id: song.user_id,
                    })
                  }
                >
                  <div className="flex items-center gap-4 ">
                    <div className="w-12 h-12 relative rounded-md overflow-hidden">
                      <Image
                        src={song?.image || "/dummy-song.jpg"}
                        alt="Song"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="text-gray-300">{song.title}</p>
                  </div>
                  <p className="text-gray-500">{song.album}</p>
                  <p className="text-gray-500">{song.duration}</p>
                  <BsThreeDotsVertical className="text-gray-400 cursor-pointer justify-self-end" />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">
                No songs found in your playlist.
              </p>
            )}
          </div>
        </div>
      </div>
      <MusicPlayer playlist={filteredSongs} />
    </>
  );
};

export default PlaylistComponent;
