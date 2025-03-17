import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ImageLead from "../../public/Lead-image (1).png";
import Sidebar from "./SideBar";

const PlaylistComponent = () => {
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
      <div className="pl-20 lg:pl-24 p-6 bg-[#121212] text-white min-h-screen">
        {/* Album Section */}
        <div className="flex gap-6">
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
          <div className="flex flex-col justify-between">
            <h1 className="text-4xl font-semibold text-gray-200">
              Tomorrow’s tunes
            </h1>
            <p className="text-gray-400 max-w-md text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis.
            </p>
            <p className="text-gray-500 text-sm">64 songs ~ 16 hrs+</p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg">
                Play all
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                Add to collection
              </button>
              <FaHeart className="text-gray-400 text-2xl cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Song List */}
        <div className="mt-8">
          <div className="grid grid-cols-4 text-gray-400 text-sm pb-2 border-b border-gray-700 px-4">
            <p>Title</p>
            <p>Album</p>
            <p>Duration</p>
            <p></p> {/* For actions */}
          </div>
          {songs.map((song, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center p-4 bg-gray-900 rounded-lg mb-2"
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
              <BsThreeDotsVertical className="text-gray-400 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlaylistComponent;
