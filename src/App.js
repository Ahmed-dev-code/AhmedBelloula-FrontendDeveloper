import './App.css';
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Gallery from './components/DataExplore'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Banner></Banner>
      <Gallery></Gallery>
    </div>
  );
}

export default App;
