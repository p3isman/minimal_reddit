import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubreddits,
  selectSubredditsSlice
} from '../features/subreddits/subredditsSlice';
import Subreddit from './Subreddit';
import './MobileMenu.css';
import SearchInput from './SearchInput';

const MobileMenu = ({ isVisible }) => {
  const subredditsSlice = useSelector(selectSubredditsSlice);
  const { error, isLoading, subreddits } = subredditsSlice;

  // Fetch subreddits
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSubreddits()), [dispatch]);

  return (
    <div
      className={`mobile-menu fixed overflow-y-auto h-1/3 bg-white mt-3 mx-0 px-10 z-10 shadow-lg md:hidden ${
        !isVisible ? 'hidden' : ''
      }`}
    >
      {error && <h3>Error loading subreddits</h3>}
      {isLoading && (
        <div className='w-400 border-2 rounded-md p-9 mt-20'>
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
      {!error && !isLoading && (
        <>
          <div className='fixed left-0 flex justify-center w-full pb-4 bg-white'>
            <SearchInput />
          </div>
          <div className='flex flex-wrap justify-evenly mt-20'>
            {subreddits.map(subreddit => (
              <Subreddit
                key={subreddit.id}
                title={subreddit.display_name_prefixed}
                imageURL={subreddit.icon_img}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
