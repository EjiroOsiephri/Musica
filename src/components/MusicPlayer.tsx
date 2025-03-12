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
} from "react-icons/fa";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/musicSlice";

const MusicPlayer = ({ playlist }: { playlist: any[] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [isRepeat, setIsRepeat] = useState(false);

  const currentTrack = useSelector(
    (state: {
      music: {
        currentTrack: {
          preview: string;
          image?: string;
          title?: string;
          artist?: string;
        };
      };
    }) => state.music.currentTrack
  );

  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentTrack?.preview && audioRef.current) {
      audioRef.current.src = currentTrack.preview;
      audioRef.current.play();
      setIsPlaying(true);
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
    if (playlist && currentTrack) {
      const currentIndex = playlist.findIndex(
        (track) => track.preview === currentTrack.preview
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      dispatch(setCurrentTrack(playlist[nextIndex]));
    }
  };

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
        const duration = audioRef.current.duration || 1; // Prevent division by zero
        setProgress((currentTime / duration) * 100);

        // Handle repeat functionality
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

  return (
    <>
      {currentTrack && (
        <div className="fixed z-10 bottom-0 right-0 w-full bg-[#1D2123]/80 text-white px-8 py-4 flex flex-col items-center backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between max-w-7xl w-full">
            {/* Album Info */}
            <div className="flex items-center space-x-4 -ml-4">
              <Image
                src={currentTrack.image || "/placeholder-image.png"}
                alt="Album Cover"
                width={70}
                height={60}
                className="rounded-md"
              />
              <div>
                <h3 className="text-lg font-bold">
                  {currentTrack.title || "No Track Selected"}
                </h3>
                <p className="text-sm text-gray-400">
                  {currentTrack.artist || "Unknown Artist"}
                </p>
              </div>
              <FaPlus className="hidden border-2 border-white rounded-full text-xl p-1 cursor-pointer " />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-6">
              <FaRandom
                className="hidden md:block cursor-pointer text-xl"
                onClick={handleShuffle}
              />
              <FaBackward
                className="cursor-pointer hidden md:block  text-xl"
                onClick={handlePrevious}
              />
              {isPlaying ? (
                <FaPause
                  className="cursor-pointer text-3xl text-[#FACD66]"
                  onClick={handlePlayPause}
                />
              ) : (
                <FaPlay
                  className="cursor-pointer text-3xl text-[#FACD66]"
                  onClick={handlePlayPause}
                />
              )}
              <FaForward
                className="cursor-pointer text-xl"
                onClick={handleNext}
              />
              <FaPlus className="md:block border-2 border-white rounded-full text-xl p-1 cursor-pointer " />
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
      )}
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
