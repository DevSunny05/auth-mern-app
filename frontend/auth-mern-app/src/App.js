
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <header>
        <Header/>
      </header>

      <main>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/user' element={<Home/>}/>
        </Routes>
      </main>
      
      
    </div>
  );
}

export default App;
