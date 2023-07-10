import {Routes, Route } from 'react-router-dom';
import './App.css';
import TestSelectMenu from './TestSelectMenu';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<TestSelectMenu />} />
      </Routes>
    </div>
  );
}

export default App;
