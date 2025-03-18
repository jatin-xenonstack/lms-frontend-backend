
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookCard from './components/bookCard';



function App() {
  return (
 
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path = "/signup" element = {<Login/>} />
        </Routes>
      </div>
    </Router>
    


  );
}

export default App;
