"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Sidebar from "./SideBar";
import ImageLead from "../../public/4fce4452-1eb2-48a2-980a-12c66f4a50f8.jpg";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion"; // Import Framer Motion

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export default function MusicVideoComponent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  if (!initialSearch) {
    useEffect(() => {
      fetchVideos("top trending music videos");
    }, []);
  } else {
    useEffect(() => {
      if (initialSearch) {
        fetchVideos(initialSearch);
      }
    }, [initialSearch]);
  }

  const fetchVideos = async (query: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=15&key=${
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        }`
      );

      const fetchedVideos = res.data.items
        .filter((item: any) => item.id.videoId)
        .map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchVideos(searchTerm);
      startClearingSearch(); // Start animated text removal
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // Reset timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Start countdown to clear search
    setTypingTimeout(
      setTimeout(() => {
        startClearingSearch();
      }, 3000)
    );
  };

  // Function to remove characters one by one
  const startClearingSearch = () => {
    let length = searchTerm.length;
    if (length === 0) return;

    const interval = setInterval(() => {
      length--;
      setSearchTerm((prev) => prev.slice(0, -1));
      if (length === 0) {
        clearInterval(interval);
      }
    }, 100); // Remove one character every 100ms
  };

  return (
    <>
      <Sidebar />
      <div className="relative lg:pl-24 p-3 md:p-8 min-h-screen text-white">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={ImageLead}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-4">Music Videos</h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center mb-6"
        >
          <motion.input
            type="text"
            placeholder="Search for music videos..."
            value={searchTerm}
            onChange={handleInputChange}
            className="p-2 w-80 bg-[#1D2123] text-white rounded-l focus:outline-none"
            animate={{ opacity: [0.8, 1] }}
            transition={{ duration: 0.5 }}
          />
          <button
            type="submit"
            className="p-2 bg-[#FACD66] text-black rounded-r hover:bg-[#e6b455] transition"
          >
            <FaSearch />
          </button>
        </form>

        {/* Video Grid */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <ClipLoader color="#FACD66" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1D2123] p-4 rounded-lg hover:scale-105 transition-transform"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="mt-2 text-sm font-semibold">{video.title}</h3>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
