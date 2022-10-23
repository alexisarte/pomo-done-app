import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function decreaseSeconds() {
    setSeconds(seconds => seconds + 1);
  }

  function resetSeconds() {
    setSeconds(seconds => seconds - 59);
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            let action;
            if (seconds < 59) {
              action = decreaseSeconds;
            } else if (seconds === 59) {
              action = resetSeconds;
            }
            console.log(seconds)
            setInterval(action, 1000);
          }}
        >
          seconds is {seconds}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
