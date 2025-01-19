import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { setCurrentTrack } = musicSlice.actions;
export default musicSlice.reducer;
