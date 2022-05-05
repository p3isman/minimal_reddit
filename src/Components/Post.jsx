import { useState } from 'react';
import { redditAPI } from '../data/reddit_api';
import { formatNumber } from '../utils/utils';
import Comment from './Comment';

const Post = ({ post }) => {
  const initialVotes = post.ups - post.downs;

  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(null);

  const handleToggleComments = async () => {
    if (comments.length === 0) {
      try {
        setIsLoading(true);
        setComments(await redditAPI.getPostComments(post.permalink));
        setIsLoading(false);
        setError(false);
      } catch {
        setIsLoading(false);
        setError(true);
      }
    }
    setVisibleComments(prev => !prev);
  };

  const handleVote = vote => {
    if (hasVoted === vote) {
      setVotes(initialVotes);
      setHasVoted(null);
      return;
    }
    setVotes(vote === 'up' ? initialVotes + 1 : initialVotes - 1);
    setHasVoted(vote);
  };

  return (
    <div className='flex my-10 rounded-lg outline outline-2 outline-neutral-300 hover:outline-neutral-400 shadow-lg'>
      <div className='flex flex-col align-center bg-gray-50 px-0.5 pt-3 border-r-2 w-12'>
        <button
          className='flex justify-center select-none'
          onClick={() => handleVote('up')}>
          <svg
            className={`hover:fill-green-500 ${
              hasVoted === 'up' && 'fill-green-500'
            }`}
            fill='gray'
            strokeWidth='0'
            version='1.2'
            baseProfile='tiny'
            viewBox='0 0 24 24'
            height='1.5em'
            width='1.5em'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z'></path>
          </svg>
        </button>
        <p className='text-xs text-center font-bold'>{formatNumber(votes)}</p>
        <button
          className='flex justify-center select-none'
          onClick={() => handleVote('down')}>
          <svg
            className={`hover:fill-red-500 ${
              hasVoted === 'down' && 'fill-red-500'
            }`}
            fill='gray'
            strokeWidth='0'
            version='1.2'
            baseProfile='tiny'
            viewBox='0 0 24 24'
            height='1.5em'
            width='1.5em'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 21.312l-7.121-7.121c-1.17-1.17-1.17-3.073 0-4.242 1.094-1.094 2.978-1.138 4.121-.115v-4.834c0-1.654 1.346-3 3-3s3 1.346 3 3v4.834c1.143-1.023 3.027-.979 4.121.115 1.17 1.169 1.17 3.072 0 4.242l-7.121 7.121zm-5-10.242c-.268 0-.518.104-.707.293-.391.39-.391 1.023 0 1.414l5.707 5.707 5.707-5.707c.391-.391.391-1.024 0-1.414-.379-.379-1.035-.379-1.414 0l-3.293 3.293v-9.656c0-.551-.448-1-1-1s-1 .449-1 1v9.656l-3.293-3.293c-.189-.189-.439-.293-.707-.293z'></path>
          </svg>
        </button>
      </div>
      <div className='w-full'>
        <div className='pt-3 px-3'>
          <p className='text-sm'>{`Posted by u/${post.author}`}</p>
          <h3 className='text-md py-2'>{post.title}</h3>
        </div>
        <div className='flex justify-center'>
          {post.is_video && (
            <video src={post.media.reddit_video.fallback_url} controls>
              Can't reproduce video
            </video>
          )}
          {!post.is_self && !post.is_video && (
            <img src={post.url} alt={post.title}></img>
          )}
        </div>
        <button
          className='p-1.5 hover:bg-gray-200'
          onClick={handleToggleComments}>
          <svg
            className='inline mr-1'
            fill='gray'
            strokeWidth='0'
            version='1.2'
            baseProfile='tiny'
            viewBox='0 0 24 24'
            height='1.3em'
            width='1.3em'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M18 7c.542 0 1 .458 1 1v7c0 .542-.458 1-1 1h-8.829l-.171.171v-.171h-3c-.542 0-1-.458-1-1v-7c0-.542.458-1 1-1h12m0-2h-12c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3v-7c0-1.65-1.35-3-3-3z'></path>
          </svg>
          {post.num_comments === 1 ? (
            <span className='text-gray-500 font-bold text-sm'>
              {post.num_comments} Comment
            </span>
          ) : (
            <span className='text-gray-500 font-bold text-sm'>
              {formatNumber(post.num_comments)} Comments
            </span>
          )}
        </button>
        {visibleComments &&
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        {isLoading && (
          <div className='m-3 flex flex-col gap-3'>
            <div className='bg-gray-200 w-80 h-8 animate-pulse duration-200 rounded-full'></div>
            <div className='bg-gray-200 w-80 h-8 animate-pulse duration-200 rounded-full'></div>
            <div className='bg-gray-200 w-80 h-8 animate-pulse duration-200 rounded-full'></div>
          </div>
        )}
        {error && <p className='m-2'>Error loading comments...</p>}
      </div>
    </div>
  );
};

export default Post;
