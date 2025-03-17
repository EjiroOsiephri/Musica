"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import ImageLead from "../../public/Lead-image (1).png";
import Sidebar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import { useSelector } from "react-redux";

const PlaylistComponent = () => {
  const playlists = useSelector((state: { playlists: any }) => state.playlists);

  const songs = [
    { title: "Let me love you - Krisx", album: "Single", duration: "4:17" },
    {
      title: "Watin man go do - Burna",
      album: "African giant",
      duration: "2:30",
    },
    { title: "Stand strong - Davido", album: "Single", duration: "2:02" },
    { title: "Closa - Ybee", album: "Obi datti", duration: "3:23" },
  ];

  return (
    <>
      <Sidebar />
      {/* Parent Div with Background Image */}
      <div className="relative min-h-screen text-white pb-32">
        {" "}
        {/* Increased bottom padding */}
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={ImageLead}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-40"
          />
        </div>
        {/* Content */}
        <div className="relative pl-20 lg:pl-24 p-8 bg-[#121212]/80 min-h-screen space-y-12">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 max-w-md">
            <FiSearch className="text-gray-400 text-lg mr-2" />
            <input
              type="text"
              placeholder="Search playlists..."
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
            />
          </div>

          {/* Album Section */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Album Image */}
            <div className="w-56 h-56 relative rounded-lg overflow-hidden">
              <Image
                src={ImageLead}
                alt="Album Art"
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Album Details */}
            <div className="flex flex-col space-y-4">
              <h1 className="text-4xl font-semibold text-gray-200">
                Tomorrow’s tunes
              </h1>
              <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                A handpicked collection of fresh sounds and timeless classics,
                carefully curated to set the perfect vibe. Whether you're
                unwinding or getting pumped for the day, these tunes will keep
                you in the groove.
              </p>
              <p className="text-gray-500 text-sm">64 songs ~ 16 hrs+</p>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 mt-4">
                <button className="bg-yellow-500 text-black font-semibold px-5 py-2.5 rounded-lg">
                  Play all
                </button>
                <button className="bg-gray-700 text-white px-5 py-2.5 rounded-lg">
                  Add to collection
                </button>
                <FaHeart className="text-gray-400 text-2xl cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Song List */}
          <div className="mt-16 space-y-4">
            {/* Increased margin for better spacing */}
            <div className="grid grid-cols-4 text-gray-400 text-sm pb-3 border-b border-gray-700 px-4">
              <p>Title</p>
              <p>Album</p>
              <p>Duration</p>
              <p></p> {/* Empty for actions */}
            </div>
            {songs.map((song, index) => (
              <div
                key={index}
                className="grid grid-cols-4 items-center p-4 bg-[#111827cc] rounded-lg"
              >
                {/* Song Image & Title */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative rounded-md overflow-hidden">
                    <Image
                      src="/dummy-song.jpg"
                      alt="Song"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className="text-gray-300">{song.title}</p>
                </div>

                {/* Album */}
                <p className="text-gray-500">{song.album}</p>

                {/* Duration */}
                <p className="text-gray-500">{song.duration}</p>

                {/* Action Button */}
                <BsThreeDotsVertical className="text-gray-400 cursor-pointer justify-self-end" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer playlist={playlists?.allPlaylists} />
    </>
  );
};

export default PlaylistComponent;
