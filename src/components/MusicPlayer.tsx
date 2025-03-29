"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaRandom,
  FaRedo,
  FaPlus,
  FaCheck,
  FaVideo,
} from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/musicSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MusicPlayer = ({ playlist }: { playlist: any[] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const router = useRouter();

  const currentTrack = useSelector(
    (state: {
      music: {
        currentTrack: {
          preview: string;
          image?: string;
          title?: string;
          artist?: string;
          album: string;
          duration: string | number;
          track_id: string | number;
          user_id: string | number;
        };
        trackHistory: any[];
      };
    }) => state.music.currentTrack
  );

  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentTrack?.preview && audioRef.current) {
      audioRef.current.src = currentTrack.preview;
      setIsPlaying(false);
    }
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (track) => track.preview === currentTrack?.preview
    );

    const nextIndex = (currentIndex + 1) % playlist.length;
    dispatch(setCurrentTrack(playlist[nextIndex]));
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleNext);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleNext);
      }
    };
  }, [currentTrack, playlist]);

  const handlePrevious = () => {
    if (playlist && currentTrack) {
      const currentIndex = playlist.findIndex(
        (track) => track.preview === currentTrack.preview
      );
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      dispatch(setCurrentTrack(playlist[prevIndex]));
    }
  };

  const handleShuffle = () => {
    if (playlist) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      dispatch(setCurrentTrack(playlist[randomIndex]));
    }
  };

  const handleRepeatToggle = () => {
    setIsRepeat(!isRepeat);
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const newProgress = Number(e.target.value);
      setProgress(newProgress);
      audioRef.current.currentTime =
        (audioRef.current.duration * newProgress) / 100;
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      audioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 1;
        setProgress((currentTime / duration) * 100);

        if (isRepeat && currentTime >= duration) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }
    };

    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [isRepeat]);

  const handleAddToPlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/playlists/add-to-playlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.trim()}`,
          },
          body: JSON.stringify({
            user_id: currentTrack?.user_id,
            track_id: currentTrack?.track_id,
            album: currentTrack?.album,
            duration: currentTrack?.duration,
            title: currentTrack?.title,
            artist: currentTrack?.artist,
            image: currentTrack?.image,
            preview: currentTrack?.preview,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server Response:", data);

      setIsAdded(true);
      toast.success("Song added to playlist!");
      setTimeout(() => setIsAdded(false), 3000);
    } catch (error: any) {
      console.error("Error adding to playlist:", error);
      toast.error(
        error.message || "An error occurred while adding to playlist."
      );
    }
  };

  const handleVideoRedirect = () => {
    if (currentTrack?.title) {
      const searchQuery = encodeURIComponent(
        currentTrack.title + " " + currentTrack.artist
      );
      router.push(`/videos?search=${searchQuery}`);
    } else {
      toast.error("No track selected for video search.");
    }
  };

  return (
    <>
      {
        <div className="fixed z-10 bottom-0 right-0 w-full bg-[#1D2123]/80 text-white px-8 py-4 flex flex-col items-center backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between max-w-7xl w-full">
            {/* Album Info */}
            <div className="flex items-center space-x-4 -ml-4">
              <Image
                src={currentTrack?.image || "/placeholder-image.png"}
                alt="Album Cover"
                width={70}
                height={60}
                className="rounded-md"
              />
              <div>
                <h3 className="text-lg truncate w-36 md:[w-initial] font-bold">
                  {currentTrack?.title || "No Track Selected"}
                </h3>
                <p className="text-sm text-gray-400">
                  {currentTrack?.artist || "Unknown Artist"}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-6">
              <motion.div whileTap={{ scale: 1.1 }}>
                <FaRandom
                  className="hidden md:block cursor-pointer text-xl"
                  onClick={handleShuffle}
                />
              </motion.div>
              <motion.div whileTap={{ scale: 1.1 }}>
                <FaBackward
                  className="cursor-pointer hidden md:block  text-xl"
                  onClick={handlePrevious}
                />
              </motion.div>

              {isPlaying ? (
                <motion.div whileTap={{ scale: 1.1 }}>
                  <FaPause
                    className="cursor-pointer text-3xl text-[#FACD66]"
                    onClick={handlePlayPause}
                  />
                </motion.div>
              ) : (
                <motion.div whileTap={{ scale: 1.1 }}>
                  <FaPlay
                    className="cursor-pointer text-3xl text-[#FACD66]"
                    onClick={handlePlayPause}
                  />
                </motion.div>
              )}
              <motion.div whileTap={{ scale: 1.1 }}>
                <FaForward
                  className="cursor-pointer text-xl"
                  onClick={handleNext}
                />
              </motion.div>

              <motion.div
                whileTap={{ scale: 1.1 }}
                className={`md:block border-2 border-white rounded-full text-xl p-1 cursor-pointer ${
                  isAdded ? "bg-green-500 border-green-500" : ""
                }`}
                onClick={handleAddToPlaylist}
              >
                {isAdded ? <FaCheck /> : <FaPlus />}
              </motion.div>
              <motion.div
                onClick={handleVideoRedirect}
                whileTap={{ scale: 1.2 }}
                className="cursor-pointer hidden md:block text-xl"
              >
                <FaVideo />
              </motion.div>
              <FaRedo
                className={`cursor-pointer hidden md:block  text-xl ${
                  isRepeat ? "text-[#FACD66]" : ""
                }`}
                onClick={handleRepeatToggle}
              />
            </div>

            {/* Volume */}
            <div className="hidden sm:flex items-center space-x-2">
              <FaVolumeUp className="text-xl" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-2 bg-[#EFEFE0] rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FACD66 ${volume}%, #4A4B4D ${volume}%)`,
                }}
              />
            </div>
          </div>

          {/* Progress */}
          <div className="w-full max-w-5xl mt-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-2 bg-[#EFEFE0] rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #FACD66 ${progress}%, #4A4B4D ${progress}%)`,
              }}
            />
          </div>

          <audio ref={audioRef} controls={false}></audio>
        </div>
      }
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          appearance: none;
          border: 2px solid #facd66; /* Optional: Add a border for better visibility */
        }

        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #facd66;
        }

        input[type="range"]::-ms-thumb {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #facd66;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;
