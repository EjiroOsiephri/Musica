import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  searchResults: [],
  trackHistory: [] as any[], // Ensure trackHistory is an array
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      if (!Array.isArray(state.trackHistory)) {
        state.trackHistory = []; // Ensure it's always an array
      }

      if (state.currentTrack) {
        state.trackHistory = [state.currentTrack, ...state.trackHistory].slice(
          0,
          3
        );
      }

      state.currentTrack = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setCurrentTrack, setSearchResults } = musicSlice.actions;
export default musicSlice.reducer;
