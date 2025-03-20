import React from "react";
import PlaylistComponent from "@/components/PlaylistComponent";
import useAuth from "@/hooks/useAuth";

const view = () => {
  useAuth();

  return (
    <>
      <PlaylistComponent />
    </>
  );
};

export default view;
