"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import ImageLead from "../../public/Lead-image (1).png";
import Sidebar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setCurrentTrack } from "../utils/musicSlice";
import { useSelector } from "react-redux";

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
  const playlists = useSelector((state: { playlists: any }) => state.playlists);

  const dispatch = useDispatch();

  const handleTrackClick = (track: any) => {
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
          console.log(data);

          setSongs(data.playlist);
        } else {
          console.error("Failed to fetch playlist");
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="relative min-h-screen text-white pb-32">
        <div className="absolute inset-0">
          <Image
            src={ImageLead}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-40"
          />
        </div>
        <div className="relative pl-20 lg:pl-24 p-8 bg-[#121212]/80 min-h-screen space-y-12">
          <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 max-w-md">
            <FiSearch className="text-gray-400 text-lg mr-2" />
            <input
              type="text"
              placeholder="Search playlists..."
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
            />
          </div>
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
              <p className="text-gray-500 text-sm">{songs.length} songs</p>
              <div className="flex items-center gap-6 mt-4">
                <button className="bg-yellow-500 text-black font-semibold px-5 py-2.5 rounded-lg">
                  Play all
                </button>
                <button className="bg-gray-700 text-white px-5 py-2.5 rounded-lg">
                  Add to collection
                </button>
                <FaHeart className="text-gray-400 text-2xl cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-16 space-y-4">
            <div className="grid grid-cols-4 text-gray-400 text-sm pb-3 border-b border-gray-700 px-4">
              <p>Title</p>
              <p>Album</p>
              <p>Duration</p>
              <p></p>
            </div>
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-4 items-center p-4 bg-[#111827cc] rounded-lg"
                  whileTap={{ scale: 1.02 }}
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
                  <div className="flex items-center gap-4">
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
      <MusicPlayer playlist={songs} />
    </>
  );
};

export default PlaylistComponent;
