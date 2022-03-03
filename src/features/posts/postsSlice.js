import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { redditAPI } from '../../data/reddit_api';

// Thunks
export const getPostsBySubreddit = createAsyncThunk(
  'posts/getPostsBySubreddit',
  async subreddit => {
    const posts = await redditAPI.getPostsBySubreddit(subreddit);
    return posts;
  }
);

export const getPostComments = createAsyncThunk(
  'posts/getPostComments',
  async ({ index, postURL }) => {
    const comments = await redditAPI.getPostComments(postURL);
    return { index, comments };
  }
);

// Slice
const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: 'r/AskReddit'
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleShowComments: (state, action) => {
      state.posts[action.payload].showComments =
        !state.posts[action.payload].showComments;
    },
    selectSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsBySubreddit.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getPostsBySubreddit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.posts = action.payload;
      })
      .addCase(getPostsBySubreddit.rejected, state => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(getPostComments.pending, (state, action) => {
        const { index } = action.payload;
        state.posts[index].loadingComments = true;
        state.posts[index].errorComments = false;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        const { index, comments } = action.payload;
        state.posts[index].loadingComments = false;
        state.posts[index].errorComments = false;
        state.posts[index].comments = comments;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        const { index } = action.payload;
        state.posts[index].loadingComments = true;
        state.posts[index].errorComments = false;
      });
  }
});

export default postsSlice.reducer;

// Selectors
const selectSearchTerm = state => state.searchTerm;
const selectPosts = state => state.posts;

export const selectFilteredPosts = createSelector(
  [selectSearchTerm, selectPosts],
  (searchTerm, posts) => {
    if (searchTerm !== '') {
      return posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);

export const selectSelectedSubreddit = state => state.selectedSubreddit;

// Action creators
export const { setSearchTerm, toggleShowComments, selectSubreddit } =
  postsSlice;
