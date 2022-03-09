import Header from './Components/Header';
import Posts from './Components/Posts';
import SideMenu from './Components/SideMenu';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main className='flex justify-center mt-20'>
        <Posts />
        <SideMenu />
      </main>
    </>
  );
}

export default App;
