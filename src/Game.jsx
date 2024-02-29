import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from './components/Card';
import GameOver from './components/GameOver';
import imageLoader from './assets/pokeball-min.png';
import logo from './assets/logo.png';

function Game({ level, setLevel, bestScore, setBestScore }) {
	const [data, setData] = useState([]);
	const [gameStatus, setGameStatus] = useState('loading');
	const [score, setScore] = useState(0);
	const [clickedCards, setClickedCards] = useState([]);
	const [isFlipped, setIsFlipped] = useState(true);
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const promises = [];
				const random = [];

				while (random.length < (level === 3 ? 14 : level * 5)) {
					const id = Math.floor(Math.random() * 151) + 1;
					if (!random.includes(id)) random.push(id);
				}
				for (let i = 0; i < random.length; i++)
					promises.push(
						fetch(`https://pokeapi.co/api/v2/pokemon/${random[i]}`)
					);

				setTimeout(async () => {
					const responses = await Promise.all(promises);
					const jsonResponses = await Promise.all(
						responses.map(response => response.json())
					);
					setData(jsonResponses);
					setGameStatus('running');
				}, 3000);
			} catch (error) {
				setGameStatus('error');
			}
		};

		setGameStatus('loading');
		fetchData();
	}, [level]);

	useEffect(() => {
		// If shuffle happens after 1,3s then some cards appear without
		//flipping affect
		const shuffleTimer = setTimeout(() => {
			randomArray();
		}, 800);
		const flipTimer = setTimeout(() => {
			// Reset flipped cards after a delay
			setIsFlipped(!isFlipped);
			setIsClicked(false);
		}, 1300);

		return () => {
			clearTimeout(flipTimer);
			clearTimeout(shuffleTimer);
		};
	}, [clickedCards]); // eslint-disable-line react-hooks/exhaustive-deps

	const randomArray = () => {
		const randomData = [...data];
		for (let i = randomData.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[randomData[i], randomData[j]] = [randomData[j], randomData[i]];
		}
		setData(randomData);
	};

	const handleCardClick = cardId => {
		// Prevents user from multiple clicks while card is flipping
		//after timeout below isClicked is false again and user can click
		//on the card
		setIsClicked(true);
		if (isClicked) return;

		// If the card has already been clicked, reset the current score and the clicked card array
		if (clickedCards.includes(cardId)) {
			setGameStatus('gameOver');
		} else {
			setIsFlipped(!isFlipped);
			const newScore = score + 1;
			setScore(newScore);
			if (newScore > bestScore) setBestScore(newScore);
			setClickedCards([...clickedCards, cardId]);
			if (clickedCards.length === data.length - 1) setGameStatus('win');
		}
	};

	const restartTheGame = () => {
		setIsFlipped(!isFlipped);
		setScore(0);
		setClickedCards([]);
		setGameStatus('running');
	};

	const quit = () => {
		setLevel(null);
	};

	if (gameStatus === 'loading') {
		return (
			<div className='loader'>
				<img src={imageLoader} alt='Imagen de carga' />
				<p>Loading...</p>
			</div>
		);
	}

	if (gameStatus === 'error') {
		return (
			<div className='error'>
				<h1>Something bad happened :c</h1>
				<button onClick={quit}>Retry</button>
			</div>
		);
	}

	return (
		<div className='game'>
			<div className='info'>
				<img src={logo} alt='logo' onClick={quit} />
				<div>
					<p>Score: {score}</p>
					<p>High Score: {bestScore}</p>
				</div>
			</div>

			<div className='cards'>
				{data.map(pokemon => {
					return (
						<Card
							name={pokemon.name}
							img={pokemon.sprites.front_default}
							id={pokemon.id}
							handleCardClick={handleCardClick}
							isFlipped={isFlipped}
							key={pokemon.id}
						/>
					);
				})}
			</div>

			<AnimatePresence>
				{(gameStatus === 'gameOver' || gameStatus === 'win') && (
					<GameOver
						result={gameStatus}
						restartTheGame={restartTheGame}
						quit={quit}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Game;
