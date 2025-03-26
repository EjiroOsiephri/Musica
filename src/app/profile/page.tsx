"use client";

import React from "react";
import ProfileComponent from "@/components/ProfileComponent";
import useAuth from "@/hooks/useAuth";

const profile = () => {
  useAuth();

  return (
    <>
      <ProfileComponent />
    </>
  );
};

export default profile;
