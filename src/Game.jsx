import { useState, useEffect } from "react"

function Game({ level }) {
  const [data, setData] = useState([]);
  const [gameState, setGameState] = useState('loading');

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
    <>
      hello world
    </>
  )
}

export default Game;
