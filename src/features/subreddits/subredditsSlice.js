import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { redditAPI } from '../../data/reddit_api';

// Thunk
export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async () => {
    const response = await redditAPI.getSubreddits();
    return response;
  }
);

// Slice
const initialState = {
  subreddits: [],
  error: false,
  isLoading: false,
  selectedSubreddit: 'r/AskReddit'
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    selectSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSubreddits.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.error = false;
        state.isLoading = false;
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, state => {
        state.error = true;
        state.isLoading = false;
      });
  }
});

export default subredditsSlice.reducer;

// Action creators
export const { selectSubreddit } = subredditsSlice.actions;

// Selectors
export const selectSubredditsSlice = state => state.subreddits;
export const selectSelectedSubreddit = state =>
  state.subreddits.selectedSubreddit;
