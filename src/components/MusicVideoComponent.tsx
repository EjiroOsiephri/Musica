"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Sidebar from "./SideBar";
import ImageLead from "../../public/4fce4452-1eb2-48a2-980a-12c66f4a50f8.jpg";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export default function MusicVideoComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos("top music videos");
  }, []);

  const fetchVideos = async (query: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=12&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      const fetchedVideos = res.data.items.map((item: any) => ({
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
    }
  };

  return (
    <>
      <Sidebar />
      <div className="relative lg:pl-24 p-3 md:p-8 min-h-screen  text-white">
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
          <input
            type="text"
            placeholder="Search for music videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-80 bg-[#1D2123] text-white rounded-l focus:outline-none"
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
          <p className="text-center">Loading videos...</p>
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
