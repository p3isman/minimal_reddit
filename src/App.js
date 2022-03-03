import Header from './Components/Header';
import SideMenu from './Components/SideMenu';
import './index.css';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className='bg-zinc-100 w-screen h-screen'>
        <SideMenu />
      </main>
    </>
  );
}

export default App;
