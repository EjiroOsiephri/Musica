"use client";

import MusicVideoComponent from "@/components/MusicVideoComponent";
import useAuth from "@/hooks/useAuth";

export default function Video() {
  useAuth();

  // useAuth is called to ensure that the user is authenticated before rendering the component
  return (
    <>
      <MusicVideoComponent />
    </>
  );
}
