import Rating from './components/Rating/Rating';
import './App.css';

function App() {
  return (
   <div className = 'spliter'>  
    <Rating breed='corgi' />
    <Rating breed='labrador' />
   </div>
  );
}

export default App;
