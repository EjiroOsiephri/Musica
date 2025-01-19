"use client";

import Dashboard from "@/components/MainContent";
import MusicPlayer from "../../components/MusicPlayer";
import React from "react";
import MusicSection from "@/components/NewReleases";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const playlists = useSelector((state: { playlists: any }) => state.playlists);
  console.log("All Playlists:", playlists.allPlaylists);

  return (
    <>
      <section className="lg:flex h-screen overflow-hidden">
        <div className="lg:flex-grow lg:ml-24 overflow-y-auto h-screen pb-24 md:pb-28">
          {/* Add pb-24 to account for the music player's height */}
          <Dashboard />
          <MusicSection />
        </div>
        <MusicPlayer playlist={playlists.allPlaylists} />
        {/* Ensure MusicPlayer remains fixed */}
      </section>
    </>
  );
};

export default DashboardPage;
