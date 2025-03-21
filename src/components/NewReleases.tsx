"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "../utils/musicSlice";
import { GeminiSkeletonLoader } from "../utils/Loader";
import {
  setLocalAfrobeats,
  setLocalEdSheeranTracks,
  setLocalNigerianTracks,
} from "@/utils/playlistSlice";

function formatMilliseconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const TrackCard = React.memo(
  ({
    item,
    index,
    handleTrackClick,
  }: {
    item: any;
    index: number;
    handleTrackClick: (track: any) => void;
  }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <motion.div
        key={index}
        className="shrink-0 w-[150px] h-[250px] cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleTrackClick(item)}
      >
        {!loaded && <GeminiSkeletonLoader />}
        <Image
          src={item.image}
          alt={`${item.title} cover`}
          width={150}
          height={150}
          className={`rounded-lg object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        {loaded && (
          <h3 className="text-white text-sm mt-2 truncate">{item.title}</h3>
        )}
      </motion.div>
    );
  }
);

export const Section = React.memo(
  ({ title, musicData }: { title: string; musicData: any[] }) => {
    const dispatch = useDispatch();

    const handleTrackClick = useCallback(
      (track: any) => {
        dispatch(setCurrentTrack(track));
      },
      [dispatch]
    );

    return (
      <div className="mb-2">
        <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>
        <motion.div
          className="flex space-x-4 overflow-x-scroll overflow-y-hidden scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {musicData?.map((item, index) => (
            <TrackCard
              key={index}
              item={item}
              index={index}
              handleTrackClick={handleTrackClick}
            />
          ))}
        </motion.div>
      </div>
    );
  }
);

export const SearchSection = React.memo(({ title }: { title: string }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state: any) => state.music.searchResults);

  const handleTrackClick = useCallback(
    (track: any) => {
      dispatch(setCurrentTrack(track));
    },
    [dispatch]
  );

  const dataToRender = useMemo(
    () => searchResults?.length > 0 && searchResults,
    [searchResults]
  );

  return (
    <div className="mb-2">
      <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>
      <motion.div
        className="flex space-x-4 overflow-x-scroll overflow-y-hidden scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {dataToRender ? (
          dataToRender.map((item: any, index: any) => (
            <TrackCard
              key={index}
              item={item}
              index={index}
              handleTrackClick={handleTrackClick}
            />
          ))
        ) : (
          <p className="text-white">No search results found</p>
        )}
      </motion.div>
    </div>
  );
});

const fetchMusicData = async () => {
  const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
  const headers = {
    "x-rapidapi-key": rapidApiKey,
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  };

  const genres = [
    {
      name: "afrobeats",
      seed_tracks: "0c6xIDDpzE81m2q797ordA",
      seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
    },
    {
      name: "nigerian",
      seed_tracks: "3FAJ6O0NOHQV8Mc5Ri6ENp",
      seed_artists: "3tVQdUvClmAT7URs9V3rsp",
    },
    {
      name: "ed_sheeran",
      seed_tracks: "4WNcduiCmDNfmTEz7JvmLv",
      seed_artists: "6eUKZXaKkcviH0Ku9w2n3V",
    },
  ];

  try {
    const responses = await Promise.all(
      genres.map(({ seed_tracks, seed_artists }) =>
        axios.get("https://spotify23.p.rapidapi.com/recommendations/", {
          headers,
          params: {
            limit: "50",
            seed_genres: "pop, indie pop",
            seed_tracks,
            seed_artists,
          },
        })
      )
    );

    return responses.map((response) =>
      response?.data?.tracks?.map((track: any) => ({
        title: track.name,
        artist: track.artists[0]?.name || "Unknown Artist",
        image: track.album.images[0]?.url || "/placeholder-image.png",
        preview: track.preview_url,
        album: track?.album?.name,
        duration: formatMilliseconds(track?.duration_ms),
        track_id: track?.id,
        user_id: track?.track_number,
      }))
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return [[], [], []];
  }
};

const MusicSection = () => {
  const dispatch = useDispatch();
  const [afrobeats, setAfrobeats] = useState<any[]>([]);
  const [nigerianTracks, setNigerianTracks] = useState<any[]>([]);
  const [edSheeranTracks, setEdSheeranTracks] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [afrobeatsData, nigerianData, edSheeranData] =
        await fetchMusicData();

      setAfrobeats(afrobeatsData);
      setNigerianTracks(nigerianData);
      setEdSheeranTracks(edSheeranData);

      dispatch(setLocalAfrobeats(afrobeatsData));
      dispatch(setLocalNigerianTracks(nigerianData));
      dispatch(setLocalEdSheeranTracks(edSheeranData));
    })();
  }, [dispatch]);

  return (
    <div className="px-8 py-6 scrollbar-hide h-[calc(100vh-4rem)]">
      <Section title="Recommended For You" musicData={afrobeats} />
      <Section title="Hits For You" musicData={nigerianTracks} />
      <Section title="Pop Culture" musicData={edSheeranTracks} />
      <SearchSection title="Search Results" />
    </div>
  );
};

export default MusicSection;
