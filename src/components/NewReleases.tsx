"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";

const Section = ({ title, musicData }: { title: string; musicData: any[] }) => {
  return (
    <div className="mb-8 md:mb-12">
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
          >
            <Image
              src={item.image}
              alt={`${item.title} cover`}
              width={150}
              height={150}
              className="rounded-lg object-cover"
              loading="lazy"
            />
            <h3 className="text-white text-sm mt-2">{item.title}</h3>
            <p className="text-gray-400 text-xs">{item.artist}</p>
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

  useEffect(() => {
    const fetchMusicData = async () => {
      const rapidApiKey = "61685f4572mshf647551fc1d2d6bp1fc1bfjsn046cf7c541d7";

      const headers = {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      };

      try {
        // Fetch Afrobeats recommendations
        const afrobeatsResponse = await axios.get(
          "https://spotify23.p.rapidapi.com/recommendations/",
          {
            headers,
            params: {
              limit: "100",
              seed_genres: "afrobeat",
              seed_tracks: "0c6xIDDpzE81m2q797ordA", // Example track
              seed_artists: "4NHQUGzhtTLFvgF5SZesLK", // Example artist
            },
          }
        );

        const afrobeatsData = afrobeatsResponse?.data?.tracks || [];
        const afrobeatsTracks = afrobeatsData.map((track: any) => ({
          title: track.name,
          artist: track.artists[0]?.name || "Unknown Artist",
          image: track.album.images[0]?.url || "/placeholder-image.png",
        }));
        setAfrobeats(afrobeatsTracks);

        // Fetch Nigerian tracks (e.g., Asake)
        const nigerianResponse = await axios.get(
          "https://spotify23.p.rapidapi.com/recommendations/",
          {
            headers,
            params: {
              limit: "100",
              seed_genres: "afrobeat",
              seed_tracks: "3FAJ6O0NOHQV8Mc5Ri6ENp", // Example track by Asake
              seed_artists: "3tVQdUvClmAT7URs9V3rsp", // Example artist: Asake
            },
          }
        );

        const nigerianData = nigerianResponse?.data?.tracks || [];
        const nigerianTracks = nigerianData.map((track: any) => ({
          title: track.name,
          artist: track.artists[0]?.name || "Unknown Artist",
          image: track.album.images[0]?.url || "/placeholder-image.png",
        }));
        setNigerianTracks(nigerianTracks);

        // Fetch Ed Sheeran tracks
        const edSheeranResponse = await axios.get(
          "https://spotify23.p.rapidapi.com/recommendations/",
          {
            headers,
            params: {
              limit: "100",
              seed_genres: "pop, indie pop",
              seed_tracks: "4WNcduiCmDNfmTEz7JvmLv", // Example track by Ed Sheeran
              seed_artists: "6eUKZXaKkcviH0Ku9w2n3V", // Ed Sheeran's Spotify ID
            },
          }
        );

        const edSheeranData = edSheeranResponse?.data?.tracks || [];
        const edSheeranTracks = edSheeranData.map((track: any) => ({
          title: track.name,
          artist: track.artists[0]?.name || "Unknown Artist",
          image: track.album.images[0]?.url || "/placeholder-image.png",
        }));
        setEdSheeranTracks(edSheeranTracks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMusicData();
  }, []);

  return (
    <div className="px-8 py-6 overflow-y-auto h-[calc(100vh-4rem)]">
      <Section title="Reccommended For You" musicData={afrobeats} />
      <Section title="Hits For You" musicData={nigerianTracks} />
      <Section title="Pop Culture" musicData={edSheeranTracks} />
    </div>
  );
};

export default MusicSection;
