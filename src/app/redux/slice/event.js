import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/app/utils/base/api";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await fetch(`${BASE_URL}/event`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return await response.json();
});

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id) => {
    const response = await fetch(`${BASE_URL}/event/${id}`);
    if (!response.ok) throw new Error("Failed to fetch event");
    return await response.json();
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    currentEvent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
        state.error = null;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.currentEvent = null;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;