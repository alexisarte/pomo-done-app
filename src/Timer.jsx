import { useContext, useState, useEffect, useRef } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import SettingsContext from './SettingsContext';

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  secondsLeftRef.current = secondsLeft;
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function initTimer() {
    setSecondsLeft(settingsInfo.workMinutes * 60);
  }

  function switchMode() {
    const nextMode = mode === 'work' ? 'break' : 'work';
    setMode(nextMode);
    const nextSecondsLeft = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
    setSecondsLeft(nextSecondsLeft);
  }

  useEffect(() => {
    initTimer();
    setInterval(() => {
      if (isPaused.current) {
        return;
      }
      if (secondsLeft.current === 0) {
        switchMode();
      }
      tick();
    }, 1000);
  }, [settingsInfo]);

  return (
    <div>
      <CircularProgressbar
        value={60}
        text={`${60}%`}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',

          // Text size
          textSize: '16px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: `rgba(62, 152, 199, ${60 / 100})`,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
      <div style={{ marginTop: '20px' }}>{isPaused ? <PlayButton /> : <PauseButton />}</div>
      <div style={{ marginTop: '20px' }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
