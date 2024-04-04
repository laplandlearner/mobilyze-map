import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CustomLocation } from "../utils/type";

interface LocationsState {
  data: CustomLocation[];
}

const initialState: LocationsState = {
  data: [],
}

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
    addLocation: (state, action: PayloadAction<CustomLocation>) => {
      state.data = [...state.data, action.payload];
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((location: CustomLocation) => location.id !== action.payload)
    }
  }
});

export const { setLocation, addLocation, removeLocation } = locationSlice.actions;
export default locationSlice.reducer;
