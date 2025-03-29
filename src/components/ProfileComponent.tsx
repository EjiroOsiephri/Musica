"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Sidebar from "../components/SideBar";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const profileVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export default function Profile() {
  interface User {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    profile_picture?: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [topTracks, setTopTracks] = useState<any[]>([]);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 200], [0, 100]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        console.log(res);

        setUser(res.data);
        setFormData({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          phone: res.data.phone,
          password: "",
        });

        localStorage.setItem("profile_picture", res.data.profile_picture || "");
      } catch (err) {
        toast.error("Failed to load profile");
      }
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/profile/update`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Profile updated successfully");
      setUser((prev) => (prev ? { ...prev, ...formData } : null));
      setEditMode(false);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${API_URL}/profile/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              profile_picture: res.data.profile_picture,
            }
          : null
      );
      toast.success("Profile picture updated");
      setFile(null);

      const { profile_picture } = res.data;

      setImagePreview(profile_picture);

      localStorage.setItem("profile_picture", res.data.profile_picture);
    } catch (err) {
      toast.error("Failed to upload image");
    }
  };

  const fetchArtistImage = async (artistName: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${API_URL}/api/artist-image?artist=${encodeURIComponent(artistName)}`
      );

      const data = await response.json();

      return data?.image || "/images/default-artist.jpg";
    } catch (error) {
      console.error(`Error fetching image for ${artistName}:`, error);
      return "/images/default-artist.jpg"; // Fallback image
    }
  };

  const trackHistory = useSelector(
    (state: { music: { trackHistory: any[] } }) => state.music.trackHistory
  );

  const [topArtists, setTopArtists] = useState<
    { name: string; image: string }[]
  >([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const uniqueArtists = [
        ...new Set(trackHistory.map((track) => track.artist)),
      ];

      const artistsWithImages = await Promise.all(
        uniqueArtists.map(async (artist) => {
          const imageUrl = await fetchArtistImage(artist);
          return { name: artist, image: imageUrl };
        })
      );

      setTopArtists(artistsWithImages);
      setTopTracks(trackHistory.slice(0, 3));
    };

    if (trackHistory?.length > 0) {
      fetchArtists();
    }
  }, [trackHistory]);

  return (
    <>
      <Sidebar />
      <motion.div
        className="min-h-screen md:pl-4 lg:pl-24 p-4-screen bg-spotify-black text-white overflow-y-scroll"
        variants={profileVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="h-64 bg-gradient-to-b from-[#609EAF] to-spotify-black/50">
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-end gap-6 h-full">
            <motion.div
              className="relative w-32 h-32 md:w-44 md:h-44 md:m-[initial] md:mb-[initial]  m-auto mb-6 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {preview || user?.profile_picture ? (
                <img
                  src={imagePreview || ""}
                  alt="Profile"
                  className="rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-spotify-gray flex items-center justify-center text-4xl md:text-5xl font-bold rounded-full">
                  {user?.firstname?.[0] || "U"}
                </div>
              )}
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                className="text-2xl text-center md:text-[white] md:text-4xl font-bold"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
              >
                {user?.firstname} {user?.lastname}
              </motion.h1>
              <div className="flex flex-col md:flex-row gap-4 text-spotify-gray">
                <p className="text-center md:text-[white]"> {user?.email}</p>
                <p className="text-center md:text-[white]">{user?.phone}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="bg-spotify-dark-gray p-6 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col md:flex-row gap-4 mt-8 md:mt-[initial] mb-6">
              <div className="m-6 md:m-[initial]">
                <motion.input
                  type="file"
                  onChange={handleFileChange}
                  id="avatar-upload"
                  className="w-[12rem] md:w-[initial] mb-5 md:mb-[initial]"
                  whileTap={{ scale: 0.95 }}
                />
                <motion.button
                  className="px-6 py-2 bg-[#609EAF] text-white rounded-full cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={uploadProfilePicture}
                >
                  Upload Photo
                </motion.button>
              </div>
              <motion.button
                onClick={() => setEditMode(!editMode)}
                className="px-6 py-2 border-2 border-white rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </motion.button>
            </div>
            <AnimatePresence mode="wait">
              {editMode ? (
                <motion.form
                  key="edit-form"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full p-3 bg-transparent border border-[#609EAF] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#609EAF]"
                  />
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full p-3 bg-transparent border border-[#609EAF] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#609EAF]"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-3 bg-transparent border border-[#609EAF] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#609EAF]"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password (Optional)"
                    className="w-full p-3 bg-transparent border border-[#609EAF] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#609EAF]"
                  />
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#609EAF] text-white rounded-full font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? (
                      <div className="flex justify-center">
                        <ClipLoader color="#FFF" />
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="profile-info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4  bg-spotify-black rounded-lg hover:bg-spotify-gray transition-colors">
                      <h3 className="text-[#609EAF] mb-2">Email</h3>
                      <p className="truncate">{user?.email}</p>
                    </div>
                    <div className="p-4 bg-spotify-black rounded-lg hover:bg-spotify-gray transition-colors">
                      <h3 className="text-[#609EAF] mb-2">Phone</h3>
                      <p>{user?.phone}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Top Artists Section */}
        <div className="container mx-auto px-4 py-4 md:py-8">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
            Top Artists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {topArtists.map((track) => (
              <motion.div
                key={track.name}
                className="p-4 bg-spotify-black m-auto md:m-0 rounded-lg hover:bg-spotify-gray transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={track.image}
                  alt={track.name}
                  width={150}
                  height={150}
                  className="object-cover w-[100vw] md:w-[15rem] mb-2 rounded-3xl"
                />
                <h3 className="text-[#609EAF] text-center md:text-left">
                  {track.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Tracks Section */}
        <div className="container mx-auto px-4 py-4 md:py-8">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
            Top Tracks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {topTracks.map((track) => (
              <motion.div
                key={track.title}
                className="p-4 m-auto md:m-0 bg-spotify-black rounded-lg hover:bg-spotify-gray transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={track.image}
                  alt={track.title}
                  width={150}
                  height={150}
                  className="object-cover mb-2 w-[100vw] md:w-[14rem] rounded-3xl"
                />
                <h3 className="text-[#609EAF] text-center md:text-left">
                  {track.title}
                </h3>
                <p className="text-spotify-gray text-center md:text-left">
                  By {track.artist}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
