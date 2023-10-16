import { useState, useEffect } from "react"
import Card from "./components/Card";

function Game({ level }) {
  const [data, setData] = useState([]);
  const [gameState, setGameState] = useState('loading');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [];
        const random = [];

        while (random.length <  (level * 5)) {
          const id = Math.floor(Math.random() * 151) + 1
          if(!random.includes(id))random.push(id);
        }
        for (let i = 0; i < random.length; i++) promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${random[i]}`));

        setTimeout(async () => {
            const responses = await Promise.all(promises);
            const jsonResponses = await Promise.all(responses.map((response) => response.json()));
            setData(jsonResponses);
            setGameState("running");
          }, 3000);
      } catch (error) {
        setGameState('error')
      }
    };

    setGameState('loading')
    fetchData()
  }, [level])

  if(gameState === 'loading'){
    return(
        <div className="loader">
            <img src="src\assets\pokeball-min.png" alt="Imagen de carga"/>
            <p>Loading...</p>
        </div>
    )
  }
  if(gameState === 'error'){
    return(
      <h1>Error</h1>
    )
  }
  if(gameState === 'gameOver'){
    return(
      <h1>Game Over</h1>
    )
  }
  return (
    <div className="game">
        <div className="info">
            <img src="src\assets\logo.png" alt="logo" />
            <div>
                <p>Score: {score}</p>
                <p>High Score: {bestScore}</p>
            </div>
        </div>
    
        <div className="cards">
        {data.map((pokemon) => {
            return (
                <Card name={pokemon.name} img={pokemon.sprites.front_default} key={pokemon.id}/>
            )
        })}
        </div>
    </div>
  )
}

export default Game;
