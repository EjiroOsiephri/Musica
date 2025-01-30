"use client";

import Dashboard from "@/components/MainContent";
import MusicPlayer from "../../components/MusicPlayer";
import React from "react";
import MusicSection from "@/components/NewReleases";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const playlists = useSelector((state: { playlists: any }) => state.playlists);

  return (
    <>
      <section className="lg:flex h-screen overflow-hidden">
        <div className="lg:flex-grow lg:ml-24 h-[80vh] md:h-[85vh] overflow-y-auto pb-[120px]">
          {/* pb-[120px] accounts for the height of the MusicPlayer */}
          <Dashboard />
          <MusicSection />
        </div>
        <MusicPlayer playlist={playlists?.allPlaylists} />
      </section>
    </>
  );
};

export default DashboardPage;
