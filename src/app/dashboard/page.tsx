import Dashboard from "@/components/MainContent";
import MusicPlayer from "../../components/MusicPlayer";
import React from "react";
import MusicSection from "@/components/NewReleases";
import Sidebar from "@/utils/Sidebar";

const dashboard = () => {
  return (
    <>
      <section className="lg:flex h-screen overflow-hidden">
        <Sidebar />
        <div className="lg:flex-grow lg:ml-20 overflow-y-auto h-screen pb-36 md:pb-28">
          <Dashboard />
          <MusicSection />
        </div>
        <MusicPlayer />
      </section>
    </>
  );
};

export default dashboard;
