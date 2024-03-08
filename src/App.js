import logo from './logo.svg';
import './App.css';
import CryptoList from './components/CryptoList';
import TrendingList from './components/TrendingList';

function App() {

  // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en
  return (
    <div className="App">
      <TrendingList />
      <CryptoList />
    </div>
  );
}

export default App;
