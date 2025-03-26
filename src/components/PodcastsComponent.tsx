"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaSearch, FaPlay, FaPause } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import Sidebar from "./SideBar";
import { FaChevronDown } from "react-icons/fa";
import { DOMParser } from "xmldom";
import ImageLead from "../../public/DALL·E 2025-03-26 09.24.50 - A modern, dark-themed podcast studio background featuring a professional microphone, headphones, and subtle sound waves in the air. The lighting is mo.webp";

interface Podcast {
  id: string;
  title: string;
  publisher: string;
  thumbnail: string;
  audio_url: string;
  description: string;
}

const categories = [
  "Technology",
  "News",
  "Business",
  "Comedy",
  "Sports",
  "Health",
  "Education",
];

export default function PodcastComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPodcasts(selectedCategory);
  }, [selectedCategory]);

  const parseRssFeed = async (feedUrl: string) => {
    try {
      const res = await axios.get(feedUrl);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(res.data, "text/xml");

      const items = xmlDoc.getElementsByTagName("item");
      const parsedPodcasts = Array.from(items).map((item: any) => ({
        id: item.getElementsByTagName("guid")[0]?.textContent || "",
        title:
          item.getElementsByTagName("title")[0]?.textContent ||
          "Untitled Episode",
        publisher:
          xmlDoc.getElementsByTagName("title")[0]?.textContent ||
          "Unknown Publisher",
        thumbnail:
          xmlDoc
            .getElementsByTagName("image")[0]
            ?.getElementsByTagName("url")[0]?.textContent ||
          "/default-thumbnail.jpg", // Fallback thumbnail
        audio_url:
          item.getElementsByTagName("enclosure")[0]?.getAttribute("url") || "",
        description:
          item.getElementsByTagName("description")[0]?.textContent ||
          "No description available.",
      }));

      return parsedPodcasts;
    } catch (error) {
      console.error("Error parsing RSS feed:", error);
      return [];
    }
  };

  const fetchPodcasts = async (query: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://itunes.apple.com/search?media=podcast&term=${encodeURIComponent(
          query
        )}&limit=15`
      );

      const results = res.data.results.map((item: any) => ({
        id: item.collectionId,
        title: item.collectionName,
        publisher: item.artistName,
        thumbnail: item.artworkUrl100,
        audio_url: item.feedUrl,
        description: item.description || "No description available.",
      }));

      setPodcasts(results);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    if (searchTerm.startsWith("http")) {
      const parsedPodcasts = await parseRssFeed(searchTerm);
      setPodcasts(parsedPodcasts);
    } else {
      await fetchPodcasts(searchTerm);
    }
  };

  const handlePlayPause = async (url: string, id: string) => {
    if (!url) {
      setErrorMessage("Audio URL is not available.");
      return;
    }

    console.log("Playing audio:", url);
    const parsedFeed = await parseRssFeed(url);

    const supportedFormats = [".mp3", ".ogg", ".wav", ".aac"];
    const isSupportedFormat = supportedFormats.some((format) =>
      url.toLowerCase().endsWith(format)
    );

    if (currentPlaying === id) {
      if (audioRef.current) {
        audioRef.current.pause();
        setCurrentPlaying(null);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    try {
      const newAudio = new Audio(parsedFeed[0].audio_url);
      audioRef.current = newAudio;

      newAudio.addEventListener("error", (error) => {
        console.error("Error loading audio:", error);
        setErrorMessage(
          "Failed to load audio. The format may not be supported or the URL may be incorrect."
        );
        setCurrentPlaying(null);
      });

      newAudio.play().catch((error) => {
        console.error("Playback failed:", error);
        setErrorMessage(
          "Failed to play audio. Autoplay might be disabled in your browser."
        );
        setCurrentPlaying(null);
      });

      setCurrentPlaying(id);

      newAudio.ontimeupdate = () => {
        setProgress((newAudio.currentTime / newAudio.duration) * 100);
      };

      newAudio.onended = () => {
        setCurrentPlaying(null);
        setProgress(0);
      };
    } catch (error: any) {
      console.error("Error creating audio object:", error);
      setErrorMessage(`Failed to play audio: ${error.message}`);
      setCurrentPlaying(null);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar />
      <div className="lg:pl-24 p-3 md:p-8 min-h-screen  text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={ImageLead}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">
          Popular Podcasts
        </h1>

        {/* Search Bar */}
        <section className="flex flex-col md:flex-row justify-center md:gap-10 items-center mb-6">
          <motion.form
            onSubmit={handleSearch}
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="text"
              placeholder="Search podcasts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-64 bg-[#1D2123] text-white rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="p-3 bg-[#FACD66] text-black rounded-r hover:bg-[#e6b455] transition"
            >
              <FaSearch />
            </button>
          </motion.form>

          <div className="relative flex justify-center md:-mt-6">
            {/* Dropdown Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between px-4 py-2 w-64 bg-[#1D2123] text-white rounded-md focus:outline-none cursor-pointer hover:bg-[#252A2C] transition"
            >
              {selectedCategory}
              <FaChevronDown
                className={`transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-64 mt-2 bg-[#1D2123] rounded-md shadow-lg overflow-hidden z-50"
                >
                  {categories.map((category) => (
                    <li
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 text-white cursor-pointer hover:bg-[#252A2C] transition"
                    >
                      {category}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Podcast Grid */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <ClipLoader color="#FACD66" size={50} />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {podcasts.map((podcast) => (
              <motion.div
                key={podcast.id}
                className="bg-[#1D2123] p-4 rounded-lg hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <Image
                    src={podcast.thumbnail}
                    alt={podcast.title}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <button
                    onClick={() =>
                      handlePlayPause(podcast.audio_url, podcast.id)
                    }
                    className="absolute bottom-2 right-2 p-3 bg-[#FACD66] rounded-full hover:bg-[#e6b455]"
                  >
                    {currentPlaying === podcast.id ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-bold">{podcast.title}</h3>
                <p className="text-sm text-gray-400">{podcast.publisher}</p>
                <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                  {podcast.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
        {/* {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )} */}

        {/* Audio Progress Bar */}

        {currentPlaying && (
          <motion.div
            className="fixed bottom-0 left-0 md:left-16 right-0 bg-[#1D2123] p-4 z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm">
                Now Playing:{" "}
                {podcasts.find((p) => p.id === currentPlaying)?.title}
              </span>
              <div className="w-full bg-gray-600 h-2 rounded mt-2">
                <div
                  className="bg-[#FACD66] h-2 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
