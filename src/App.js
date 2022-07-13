import Header from './components/Header';
import Posts from './components/Posts';
import SideMenu from './components/SideMenu';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main className="flex justify-around mt-14 max-w-screen-xl">
        <Posts />
        <SideMenu />
      </main>
    </>
  );
}

export default App;
