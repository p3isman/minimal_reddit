import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostsBySubreddit,
  selectFilteredPosts,
  selectPostsSlice
} from '../features/posts/postsSlice';
import { selectSelectedSubreddit } from '../features/subreddits/subredditsSlice';
import Post from './Post';

const Posts = () => {
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const posts = useSelector(selectFilteredPosts);
  const postsSlice = useSelector(selectPostsSlice);
  const { isLoading, error } = postsSlice;

  const dispatch = useDispatch();

  useEffect(
    () => dispatch(getPostsBySubreddit(selectedSubreddit)),
    [dispatch, selectedSubreddit]
  );

  return (
    <div className='max-w-2xl mx-20'>
      {isLoading &&
        [...Array(5)].map(i => (
          <div class='w-full flex flex-col flex-1 gap-5 sm:p-2 outline outline-gray-200 rounded-xl my-5'>
            <div class='flex flex-1 flex-col gap-3'>
              <div class='bg-gray-200 w-full animate-pulse h-14 rounded-2xl'></div>
              <div class='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
              <div class='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
              <div class='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
              <div class='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
            </div>
            <div class='mt-auto flex gap-3'>
              <div class='bg-gray-200 w-20 h-8 animate-pulse rounded-full'></div>
              <div class='bg-gray-200 w-20 h-8 animate-pulse rounded-full'></div>
              <div class='bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto'></div>
            </div>
          </div>
        ))}
      {error && <h3>An error has ocurred while loading posts...</h3>}
      {!isLoading &&
        posts.map((post, index) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;
