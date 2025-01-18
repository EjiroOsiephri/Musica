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
  FaStepForward,
} from "react-icons/fa";
import Image from "next/image";
import albumCover from "../../public/Rectangle 26.png";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Play/Pause
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

  // Update Progress Bar
  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const newProgress = Number(e.target.value);
      setProgress(newProgress);
      audioRef.current.currentTime =
        (audioRef.current.duration * newProgress) / 100;
    }
  };

  // Update Volume
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Track Progress
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 0;
        setProgress((currentTime / duration) * 100);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  return (
    <div
      className="fixed z-10 bottom-0 right-0 w-full bg-[#1D2123]/80 text-white px-8 py-4 flex flex-col items-center backdrop-blur-md shadow-lg"
      style={{
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Controls */}
      <div
        className="flex items-center justify-between max-w-7xl"
        style={{
          width: "90%",
        }}
      >
        {/* Album Cover and Song Info */}
        <div className="flex items-center space-x-4 -ml-4">
          <Image
            src={albumCover}
            alt="Album Cover"
            width={70}
            height={60}
            className="rounded-md"
          />
          <div>
            <h3 className="text-lg font-bold">Seasons in</h3>
            <p className="text-sm text-gray-400">James</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-6">
          <FaRandom className="hidden sm:block cursor-pointer text-xl" />
          <FaBackward className="hidden sm:block cursor-pointer text-xl" />
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
          <FaForward className="hidden sm:block cursor-pointer text-xl" />
          <FaRedo className="hidden sm:block cursor-pointer text-xl" />
          <FaStepForward className="block md:hidden cursor-pointer text-xl" />
        </div>

        {/* Volume Control */}
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

      {/* Progress Bar */}
      <div className="w-full hidden sm:block max-w-5xl mt-4">
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

      {/* Audio Element */}
      <audio ref={audioRef} src="/sample-audio.mp3"></audio>

      {/* Consolidated Styles */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          appearance: none;
        }

        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
