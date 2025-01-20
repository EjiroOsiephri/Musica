import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  searchResults: [],
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setCurrentTrack, setSearchResults } = musicSlice.actions;
export default musicSlice.reducer;
