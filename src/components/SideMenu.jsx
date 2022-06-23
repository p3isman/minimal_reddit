import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubreddits,
  selectSubredditsSlice
} from '../features/subreddits/subredditsSlice';
import Subreddit from './Subreddit';

const SideMenu = () => {
  const subredditsSlice = useSelector(selectSubredditsSlice);
  const { error, isLoading, subreddits } = subredditsSlice;

  // Fetch subreddits
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSubreddits()), [dispatch]);

  return (
    <div className='relative mr-8 mt-5 hidden md:block'>
      <h3 className='text-xl'>Subreddits</h3>
      {error && <h3>Error loading subreddits</h3>}
      {isLoading && (
        <div className='w-400 border-2 rounded-md p-9 mt-5'>
          <div className='flex animate-pulse flex-col space-y-3'>
            <div className='w-38 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-38 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-38 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-40 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-20 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-38 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-20 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-38 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-20 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-38 bg-gray-300 h-6 rounded-md'></div>
            <div className='w-20 bg-gray-300 h-6 rounded-md'></div>
          </div>
        </div>
      )}
      {!error &&
        !isLoading &&
        subreddits.map(subreddit => (
          <Subreddit
            key={subreddit.id}
            title={subreddit.display_name_prefixed}
            imageURL={subreddit.icon_img}
          />
        ))}
    </div>
  );
};

export default SideMenu;
