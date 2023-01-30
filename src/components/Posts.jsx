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
    <div className='flex-1 max-w-full md:max-w-2xl md:mx-10'>
      {isLoading &&
        [...Array(5)].map(i => (
          <div
            key={i}
            className='w-full flex flex-col flex-1 gap-5 p-2 my-3 outline outline-gray-200 sm:rounded-xl sm:my-5'
          >
            <div className='flex flex-1 flex-col gap-3'>
              <div className='bg-gray-200 w-full animate-pulse h-14 rounded-2xl'></div>
              <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
              <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
              <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
              <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
            </div>
            <div className='mt-auto flex gap-3'>
              <div className='bg-gray-200 w-20 h-8 animate-pulse rounded-full'></div>
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
