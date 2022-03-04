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
    <div className='float-right mr-10 my-10'>
      {error && <h3>Error loading subreddits</h3>}
      {isLoading && <h3>Loading subreddits...</h3>}
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
