import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/posts/postsSlice';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    setSearchText(event.target.value);
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div className='relative flex items-center bg-gray-50 border-2 focus:outline-green-700 rounded-md py-1 pl-9 sm:pr-3'>
      <svg
        className='absolute left-2 inline'
        stroke='green'
        fill='none'
        strokeWidth='0'
        viewBox='0 0 24 24'
        height='1.1em'
        width='1.1em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        ></path>
      </svg>
      <input
        className='outline-none bg-gray-50'
        type='text'
        value={searchText}
        onChange={handleChange}
        placeholder='Search Posts'
      />
    </div>
  );
};
export default SearchInput;
