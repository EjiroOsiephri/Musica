"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/musicSlice";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { GeminiSkeletonLoader } from "../utils/Loader";

export const Section = ({
  title,
  musicData,
}: {
  title: string;
  musicData: any[];
}) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState<boolean[]>([]);

  const handleTrackClick = (track: any) => {
    dispatch(setCurrentTrack(track));
  };

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  useEffect(() => {
    // Reset loaded state when musicData changes
    setLoaded(Array(musicData.length).fill(false));
  }, [musicData]);

  return (
    <div className="mb-4 md:mb-5">
      <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>
      <motion.div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {musicData.map((item, index) => (
          <motion.div
            key={index}
            className="shrink-0 w-[150px] cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              handleTrackClick({
                title: item.title,
                artist: item.artist,
                image: item.image,
                preview: item.preview,
              })
            }
          >
            {!loaded[index] && <GeminiSkeletonLoader />} {/* Skeleton Loader */}
            <Image
              src={item.image}
              alt={`${item.title} cover`}
              blurDataURL={item.image}
              width={150}
              height={150}
              className={`rounded-lg object-cover transition-opacity duration-300 ${
                loaded[index] ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => handleImageLoad(index)}
              loading="lazy"
            />
            {loaded[index] && (
              <>
                <h3 className="text-white text-sm mt-2">{item.title}</h3>
                <p className="text-gray-400 text-xs">{item.artist}</p>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const MusicSection = () => {
  const [afrobeats, setAfrobeats] = useState<any[]>([]);
  const [nigerianTracks, setNigerianTracks] = useState<any[]>([]);
  const [edSheeranTracks, setEdSheeranTracks] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchMusicData = async () => {
      const rapidApiKey = "61685f4572mshf647551fc1d2d6bp1fc1bfjsn046cf7c541d7";

      const headers = {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      };

      try {
        const afrobeatsResponse = await axios.get(
          "https://spotify23.p.rapidapi.com/recommendations/",
          {
            headers,
            params: {
              limit: "100",
              seed_genres: "afrobeat",
              seed_tracks: "0c6xIDDpzE81m2q797ordA",
              seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
            },
          }
        );

        const afrobeatsData = afrobeatsResponse?.data?.tracks || [];
        const afrobeatsTracks = afrobeatsData.map((track: any) => ({
          title: track.name,
          artist: track.artists[0]?.name || "Unknown Artist",
          image: track.album.images[0]?.url || "/placeholder-image.png",
          preview: track.preview_url,
        }));
        setAfrobeats(afrobeatsTracks);

        const nigerianResponse = await axios.get(
          "https://spotify23.p.rapidapi.com/recommendations/",
          {
            headers,
            params: {
              limit: "100",
              seed_genres: "afrobeat",
              seed_tracks: "3FAJ6O0NOHQV8Mc5Ri6ENp",
              seed_artists: "3tVQdUvClmAT7URs9V3rsp",
            },
          }
        );

        const nigerianData = nigerianResponse?.data?.tracks || [];
        const nigerianTracks = nigerianData.map((track: any) => ({
          title: track.name,
          artist: track.artists[0]?.name || "Unknown Artist",
          image: track.album.images[0]?.url || "/placeholder-image.png",
          preview: track.preview_url,
        }));
        setNigerianTracks(nigerianTracks);

        const edSheeranResponse = await axios.get(
          "https://spotify23.p.rapidapi.com/recommendations/",
          {
            headers,
            params: {
              limit: "100",
              seed_genres: "pop, indie pop",
              seed_tracks: "4WNcduiCmDNfmTEz7JvmLv",
              seed_artists: "6eUKZXaKkcviH0Ku9w2n3V",
            },
          }
        );

        const edSheeranData = edSheeranResponse?.data?.tracks || [];
        const edSheeranTracks = edSheeranData.map((track: any) => ({
          title: track.name,
          artist: track.artists[0]?.name || "Unknown Artist",
          image: track.album.images[0]?.url || "/placeholder-image.png",
          preview: track.preview_url,
        }));
        setEdSheeranTracks(edSheeranTracks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMusicData();
  }, []);

  return (
    <div className="px-8 py-6 overflow-y-auto scrollbar-hide h-[calc(100vh-4rem)]">
      <Section title="Reccommended For You" musicData={afrobeats} />
      <Section title="Hits For You" musicData={nigerianTracks} />
      <Section title="Pop Culture" musicData={edSheeranTracks} />

      {!currentTrack && (
        <div className="mt-4 flex justify-center items-center">
          <ClipLoader color="#4F46E5" size={50} />
        </div>
      )}
    </div>
  );
};

export default MusicSection;
