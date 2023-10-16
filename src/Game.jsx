import { useState, useEffect } from "react"
import Card from "./components/Card";

function Game({ level }) {
  const [data, setData] = useState([]);
  const [gameStatus, setGameStatus] = useState('loading');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(true);

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
            setGameStatus("running");
          }, 3000);
      } catch (error) {
        setGameStatus('error')
      }
    };

    setGameStatus('loading')
    fetchData()
  }, [level])

  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset flipped cards after a delay
      setIsFlipped(!isFlipped);
    }, 1000);

    return () => clearTimeout(timer);
  }, [clickedCards]);// eslint-disable-line react-hooks/exhaustive-deps

  const randomArray = () => {
    const randomData = [...data];
    for (let i = randomData.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomData[i], randomData[j]] = [randomData[j], randomData[i]];
    }
    setData(randomData);
  };

  const handleCardClick = (cardId) => {
    // If the card has already been clicked, reset the current score and the clicked card array
    if (clickedCards.includes(cardId)) {
      setGameStatus('gameOver');
    } 
    else {
      setIsFlipped(!isFlipped)
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, cardId]);
      console.log(clickedCards, data)
      if (newScore > bestScore) setBestScore(newScore);
      if (clickedCards.length === data.length - 1) setGameStatus('win');
    }
    randomArray();
  };

  if(gameStatus === 'loading'){
    return(
        <div className="loader">
            <img src="src\assets\pokeball-min.png" alt="Imagen de carga"/>
            <p>Loading...</p>
        </div>
    )
  }
  if(gameStatus === 'error'){
    return(
      <h1>Error</h1>
    )
  }
  if(gameStatus === 'gameOver'){
    return(
      <h1>Game Over</h1>
    )
  }
  if(gameStatus === 'win'){
    return(
      <h1>Win</h1>
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
                <Card 
                  name={pokemon.name} 
                  img={pokemon.sprites.front_default} 
                  id={pokemon.id} 
                  handleCardClick={handleCardClick} 
                  isFlipped={isFlipped}
                  key={pokemon.id}/>
            )
        })}
        </div>
    </div>
  )
}

export default Game;
