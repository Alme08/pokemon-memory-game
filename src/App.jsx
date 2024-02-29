import { useState } from 'react'
import Game from './Game';
import MusicPlayer from './components/MusicPlayer';

function App(){
  const [level, setLevel] = useState(null);
  const [bestScore, setBestScore] = useState(0);

  return(
    <>{ level === null ? 
      <div className='startScreen'>
        <div className='image-container'>
          <img className='logo' src='.\assets\logo.png' alt='pokemon logo' />
        </div>
        <h1>Memory Game</h1>
        <div className='groupButton'>
          <button onClick={() => setLevel(1)}>Easy</button>
          <button onClick={() => setLevel(2)}>Medium</button>
          <button onClick={() => setLevel(3)}>Hard</button>
        </div>
      </div> :
      <Game level={level} setLevel={setLevel} bestScore={bestScore} setBestScore={setBestScore}/>}
      <MusicPlayer/>
    </>
  )
}
export default App
