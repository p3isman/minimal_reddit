import Hamburger from 'hamburger-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/posts/postsSlice';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const [navbarOpen, setNavbarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = event => {
    setSearchText(event.target.value);
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <>
      <header className='flex justify-around items-center fixed bg-white w-full top-0 p-2.5 border-b shadow-md z-10'>
        <div className='flex'>
          <a href='/'>
            <svg
              className='pr-1'
              stroke='green'
              fill='green'
              strokeWidth='0'
              viewBox='0 0 512 512'
              height='2rem'
              width='2rem'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z'></path>
            </svg>
          </a>
          <h1 className='text-lg pt-0.5'>
            <a className='hidden sm:block' href='/'>
              Minimal<span className=' text-green-700'>Reddit</span>
            </a>
          </h1>
        </div>
        <div className='flex items-center'>
          <svg
            className='inline ml-2 relative left-7'
            stroke='green'
            fill='none'
            strokeWidth='0'
            viewBox='0 0 24 24'
            height='1.1em'
            width='1.1em'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
          <input
            className='bg-gray-50 border-2 focus:outline-green-700 rounded-md py-1 pl-9 sm:pr-3'
            type='text'
            value={searchText}
            onChange={handleChange}
            placeholder='Search Posts'
          />
        </div>
        <div className='md:hidden'>
          <Hamburger size={20} toggled={navbarOpen} toggle={setNavbarOpen} />
        </div>
      </header>
      <MobileMenu isVisible={navbarOpen} />
    </>
  );
};

export default Header;
