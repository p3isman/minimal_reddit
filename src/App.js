import Header from './components/Header';
import Posts from './components/Posts';
import SideMenu from './components/SideMenu';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main className='flex justify-center lg:gap-20 mt-14'>
        <Posts />
        <SideMenu />
      </main>
    </>
  );
}

export default App;
