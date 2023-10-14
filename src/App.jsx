import { useState, useEffect } from "react"

function App() {
  const [data, setData] = useState([]);
  const [level, setLevel] = useState(1);
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

        const responses = await Promise.all(promises);
        const jsonResponses = await Promise.all(responses.map(response => response.json()));
        setData(jsonResponses)
        setGameState('running')
      } catch (error) {
        setGameState('error')
      }
    };

    setGameState('loading')
    fetchData()
  }, [level])

  if(gameState === 'loading'){
    return(
      <h1>Loading...</h1>
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

export default App
