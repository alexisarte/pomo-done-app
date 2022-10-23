import { useState, useEffect } from 'react';
import './App.css'
import Settings from './Settings';
import Timer from './Timer';


function App() {

  const [showSettings, setShowSettings] = useState(true);

  return (
    <main>
      {showSettings ? <Settings /> : <Timer />}
      

    </main>
  );
}

export default App;
