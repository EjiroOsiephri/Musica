import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    afrobeats: [],
    nigerianTracks: [],
    edSheeranTracks: [],
    allPlaylists: [],
  },
  reducers: {
    setLocalAfrobeats: (state, action) => {
      state.afrobeats = action.payload;
      state.allPlaylists = [
        ...state.afrobeats,
        ...state.nigerianTracks,
        ...state.edSheeranTracks,
      ];
    },
    setLocalNigerianTracks: (state, action) => {
      state.nigerianTracks = action.payload;
      state.allPlaylists = [
        ...state.afrobeats,
        ...state.nigerianTracks,
        ...state.edSheeranTracks,
      ];
    },
    setLocalEdSheeranTracks: (state, action) => {
      state.edSheeranTracks = action.payload;
      state.allPlaylists = [
        ...state.afrobeats,
        ...state.nigerianTracks,
        ...state.edSheeranTracks,
      ];
    },
  },
});

export const {
  setLocalAfrobeats,
  setLocalNigerianTracks,
  setLocalEdSheeranTracks,
} = playlistSlice.actions;

export default playlistSlice.reducer;
